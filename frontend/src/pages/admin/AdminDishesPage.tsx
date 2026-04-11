// Справочник блюд — для меню школьного питания
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UtensilsCrossed, Plus, Pencil, Trash2, X, CheckCircle, XCircle, Minus } from 'lucide-react'
import { getDishes, createDish, updateDish, deleteDish } from '@/api/admin'
import type { Dish, DishIngredient } from '@/types'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import SearchInput from '@/components/ui/SearchInput'

// Категории блюд
const CATEGORIES = [
  'Первое блюдо',
  'Второе блюдо',
  'Гарнир',
  'Салат',
  'Выпечка',
  'Десерт',
  'Напиток',
  'Завтрак',
  'Прочее',
]

const AGE_GROUPS = ['1-3 года', '3-7 лет', '7-11 лет', '11-14 лет', '14-18 лет']

// Чип КБЖУ
const KBZHUChip: React.FC<{ label: string; value: number; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
    <span className="opacity-70">{label}</span>
    <span>{value.toFixed(1)}</span>
  </div>
)

// Форма блюда
type DishFormData = {
  name: string
  category: string
  description: string
  ingredients: DishIngredient[]
  portion_weight_g: number
  calories: number
  protein: number
  fat: number
  carbs: number
  sanpin_compliant: boolean
  age_groups: string[]
  is_active: boolean
}

const EMPTY_DISH: DishFormData = {
  name: '',
  category: CATEGORIES[0],
  description: '',
  ingredients: [],
  portion_weight_g: 200,
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
  sanpin_compliant: true,
  age_groups: ['7-11 лет'],
  is_active: true,
}

const DishModal: React.FC<{ dish?: Dish; onClose: () => void }> = ({ dish, onClose }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState<DishFormData>(
    dish
      ? {
          name: dish.name,
          category: dish.category,
          description: dish.description || '',
          ingredients: dish.ingredients,
          portion_weight_g: dish.portion_weight_g,
          calories: dish.calories,
          protein: dish.protein,
          fat: dish.fat,
          carbs: dish.carbs,
          sanpin_compliant: dish.sanpin_compliant,
          age_groups: dish.age_groups,
          is_active: dish.is_active,
        }
      : { ...EMPTY_DISH },
  )

  const createMut = useMutation({
    mutationFn: () => createDish(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dishes'] })
      onClose()
    },
  })

  const updateMut = useMutation({
    mutationFn: () => updateDish(dish!._id, form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dishes'] })
      onClose()
    },
  })

  const isPending = createMut.isPending || updateMut.isPending

  // Добавить ингредиент
  const addIngredient = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, { name: '', qty_per_portion_g: 50, unit: 'г' }],
    })
  }

  // Обновить ингредиент
  const updateIngredient = (index: number, field: keyof DishIngredient, value: string | number) => {
    const updated = form.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing,
    )
    setForm({ ...form, ingredients: updated })
  }

  // Удалить ингредиент
  const removeIngredient = (index: number) => {
    setForm({ ...form, ingredients: form.ingredients.filter((_, i) => i !== index) })
  }

  // Управление возрастными группами
  const toggleAgeGroup = (group: string) => {
    const has = form.age_groups.includes(group)
    setForm({
      ...form,
      age_groups: has ? form.age_groups.filter((g) => g !== group) : [...form.age_groups, group],
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Заголовок */}
        <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-100 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {dish ? 'Редактировать блюдо' : 'Новое блюдо'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          {/* Основная информация */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Название блюда <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Борщ со сметаной"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Категория</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Вес порции, г</label>
              <input
                type="number"
                min={0}
                value={form.portion_weight_g}
                onChange={(e) => setForm({ ...form, portion_weight_g: +e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Описание */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Описание</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* КБЖУ */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">КБЖУ (на порцию)</label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { key: 'calories' as const, label: 'Ккал' },
                { key: 'protein' as const, label: 'Белки, г' },
                { key: 'fat' as const, label: 'Жиры, г' },
                { key: 'carbs' as const, label: 'Углеводы, г' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="mb-1 block text-xs text-gray-500">{label}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: +e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ингредиенты */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Ингредиенты</label>
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Добавить
              </button>
            </div>
            <div className="space-y-2">
              {form.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={ing.name}
                    onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                    placeholder="Название"
                    className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    min={0}
                    value={ing.qty_per_portion_g}
                    onChange={(e) => updateIngredient(i, 'qty_per_portion_g', +e.target.value)}
                    className="w-20 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={ing.unit}
                    onChange={(e) => updateIngredient(i, 'unit', e.target.value)}
                    className="w-16 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {['г', 'мл', 'шт', 'л', 'кг'].map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeIngredient(i)}
                    className="rounded-lg p-1.5 text-red-400 hover:bg-red-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {form.ingredients.length === 0 && (
                <p className="py-2 text-xs text-gray-400">Ингредиенты не добавлены</p>
              )}
            </div>
          </div>

          {/* Возрастные группы */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Возрастные группы
            </label>
            <div className="flex flex-wrap gap-2">
              {AGE_GROUPS.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => toggleAgeGroup(group)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    form.age_groups.includes(group)
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* СанПиН и Активен */}
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.sanpin_compliant}
                onChange={(e) => setForm({ ...form, sanpin_compliant: e.target.checked })}
                className="rounded border-gray-300 text-primary-600"
              />
              <span className="text-sm text-gray-700">Соответствует СанПиН</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="rounded border-gray-300 text-primary-600"
              />
              <span className="text-sm text-gray-700">Активно</span>
            </label>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={() => (dish ? updateMut.mutate() : createMut.mutate())}
              disabled={isPending}
              className="flex-1 rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {isPending ? 'Сохраняем...' : dish ? 'Сохранить' : 'Добавить блюдо'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Главная страница
// ============================================================
export const AdminDishesPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editDish, setEditDish] = useState<Dish | undefined>()
  const qc = useQueryClient()

  const { data: dishes, isLoading } = useQuery({
    queryKey: ['dishes', { search, category: categoryFilter }],
    queryFn: () =>
      getDishes({ search: search || undefined, category: categoryFilter || undefined }),
  })

  const deleteMut = useMutation({
    mutationFn: deleteDish,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dishes'] }),
  })

  const handleEdit = (d: Dish) => {
    setEditDish(d)
    setModalOpen(true)
  }
  const handleAdd = () => {
    setEditDish(undefined)
    setModalOpen(true)
  }
  const handleDelete = (d: Dish) => {
    if (confirm(`Удалить блюдо «${d.name}»?`)) deleteMut.mutate(d._id)
  }

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Справочник блюд</h1>
          {dishes && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {dishes.length}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Добавить блюдо
        </button>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] max-w-xs flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Поиск блюда..." />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Все категории</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : !dishes?.length ? (
        <EmptyState
          title="Блюд нет"
          description="Добавьте первое блюдо в справочник"
          action={{ label: 'Добавить блюдо', onClick: handleAdd }}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Блюдо
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                  Категория
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">
                  КБЖУ
                </th>
                <th className="hidden px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                  Вес, г
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  СанПиН
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dishes.map((d: Dish) => (
                <tr key={d._id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-5 py-3">
                    <div className="font-semibold text-gray-900">{d.name}</div>
                    {d.description && (
                      <div className="max-w-[200px] truncate text-xs text-gray-400">
                        {d.description}
                      </div>
                    )}
                  </td>
                  <td className="hidden px-5 py-3 text-gray-600 md:table-cell">{d.category}</td>
                  <td className="hidden px-5 py-3 lg:table-cell">
                    <div className="flex flex-wrap items-center gap-1">
                      <KBZHUChip
                        label="ккал"
                        value={d.calories}
                        color="bg-orange-100 text-orange-700"
                      />
                      <KBZHUChip label="Б" value={d.protein} color="bg-blue-100 text-blue-700" />
                      <KBZHUChip label="Ж" value={d.fat} color="bg-amber-100 text-amber-700" />
                      <KBZHUChip label="У" value={d.carbs} color="bg-green-100 text-green-700" />
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-right text-gray-600 sm:table-cell">
                    {d.portion_weight_g}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {d.sanpin_compliant ? (
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-red-400" />
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(d)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(d)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <DishModal
          dish={editDish}
          onClose={() => {
            setModalOpen(false)
            setEditDish(undefined)
          }}
        />
      )}
    </div>
  )
}

export default AdminDishesPage
