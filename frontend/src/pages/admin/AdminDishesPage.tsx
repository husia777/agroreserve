// Справочник блюд — для меню школьного питания
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  UtensilsCrossed,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle,
  XCircle,
  Minus,
} from 'lucide-react'
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
  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
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
      : { ...EMPTY_DISH }
  )

  const createMut = useMutation({
    mutationFn: () => createDish(form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['dishes'] }); onClose() },
  })

  const updateMut = useMutation({
    mutationFn: () => updateDish(dish!._id, form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['dishes'] }); onClose() },
  })

  const isPending = createMut.isPending || updateMut.isPending

  // Добавить ингредиент
  const addIngredient = () => {
    setForm({
      ...form,
      ingredients: [
        ...form.ingredients,
        { name: '', qty_per_portion_g: 50, unit: 'г' },
      ],
    })
  }

  // Обновить ингредиент
  const updateIngredient = (index: number, field: keyof DishIngredient, value: string | number) => {
    const updated = form.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
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
      age_groups: has
        ? form.age_groups.filter((g) => g !== group)
        : [...form.age_groups, group],
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
        {/* Заголовок */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">
            {dish ? 'Редактировать блюдо' : 'Новое блюдо'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Основная информация */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название блюда <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Борщ со сметаной"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Вес порции, г
              </label>
              <input
                type="number"
                min={0}
                value={form.portion_weight_g}
                onChange={(e) => setForm({ ...form, portion_weight_g: +e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Описание */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          {/* КБЖУ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              КБЖУ (на порцию)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { key: 'calories' as const, label: 'Ккал' },
                { key: 'protein' as const, label: 'Белки, г' },
                { key: 'fat' as const, label: 'Жиры, г' },
                { key: 'carbs' as const, label: 'Углеводы, г' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs text-gray-500 mb-1">{label}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: +e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ингредиенты */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Ингредиенты</label>
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
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
                    className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    min={0}
                    value={ing.qty_per_portion_g}
                    onChange={(e) => updateIngredient(i, 'qty_per_portion_g', +e.target.value)}
                    className="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={ing.unit}
                    onChange={(e) => updateIngredient(i, 'unit', e.target.value)}
                    className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {['г', 'мл', 'шт', 'л', 'кг'].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeIngredient(i)}
                    className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {form.ingredients.length === 0 && (
                <p className="text-xs text-gray-400 py-2">Ингредиенты не добавлены</p>
              )}
            </div>
          </div>

          {/* Возрастные группы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Возрастные группы
            </label>
            <div className="flex flex-wrap gap-2">
              {AGE_GROUPS.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => toggleAgeGroup(group)}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                    form.age_groups.includes(group)
                      ? 'bg-primary-600 border-primary-600 text-white'
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.sanpin_compliant}
                onChange={(e) => setForm({ ...form, sanpin_compliant: e.target.checked })}
                className="rounded border-gray-300 text-primary-600"
              />
              <span className="text-sm text-gray-700">Соответствует СанПиН</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
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
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={() => dish ? updateMut.mutate() : createMut.mutate()}
              disabled={isPending}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2 text-sm font-semibold transition-colors disabled:opacity-60"
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

  const handleEdit = (d: Dish) => { setEditDish(d); setModalOpen(true) }
  const handleAdd = () => { setEditDish(undefined); setModalOpen(true) }
  const handleDelete = (d: Dish) => {
    if (confirm(`Удалить блюдо «${d.name}»?`)) deleteMut.mutate(d._id)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Справочник блюд</h1>
          {dishes && (
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {dishes.length}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить блюдо
        </button>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] max-w-xs">
          <SearchInput value={search} onChange={setSearch} placeholder="Поиск блюда..." />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Все категории</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
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
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Блюдо</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Категория</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">КБЖУ</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Вес, г</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">СанПиН</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dishes.map((d: Dish) => (
                <tr key={d._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-semibold text-gray-900">{d.name}</div>
                    {d.description && (
                      <div className="text-xs text-gray-400 truncate max-w-[200px]">
                        {d.description}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{d.category}</td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1 flex-wrap">
                      <KBZHUChip label="ккал" value={d.calories} color="bg-orange-100 text-orange-700" />
                      <KBZHUChip label="Б" value={d.protein} color="bg-blue-100 text-blue-700" />
                      <KBZHUChip label="Ж" value={d.fat} color="bg-amber-100 text-amber-700" />
                      <KBZHUChip label="У" value={d.carbs} color="bg-green-100 text-green-700" />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-gray-600 hidden sm:table-cell">
                    {d.portion_weight_g}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {d.sanpin_compliant ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(d)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(d)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && <DishModal dish={editDish} onClose={() => { setModalOpen(false); setEditDish(undefined) }} />}
    </div>
  )
}

export default AdminDishesPage
