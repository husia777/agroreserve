// Управление каталогом товаров в adminке (UC-83: экспорт)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Eye, EyeOff, Download } from "lucide-react";
import { getAdminProducts, deleteProduct, updateProduct } from "@/api/admin";
import apiClient from "@/api/client";
import { formatPrice, formatQuantity } from "@/utils/format";
import SearchInput from "@/components/ui/SearchInput";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import StockBadge from "@/components/shared/StockBadge";
import EmptyState from "@/components/ui/EmptyState";
import { PageSpinner } from "@/components/ui/Spinner";
import Modal from "@/components/ui/Modal";
import { showToast } from "@/components/ui/Toast";

const ACTIVE_OPTIONS = [
	{ value: "", label: "Все товары" },
	{ value: "true", label: "Активные" },
	{ value: "false", label: "Неактивные" },
];

export const AdminCatalogPage: React.FC = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [isActive, setIsActive] = useState("");
	const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
	const [exporting, setExporting] = useState(false);
	const queryClient = useQueryClient();

	// UC-83: Экспорт в Excel
	const handleExportExcel = async () => {
		try {
			setExporting(true);
			const response = await apiClient.get("/admin/export/products/excel", {
				params: {
					include_purchase_price: true,
					only_active: isActive === "true" ? true : undefined,
				},
				responseType: "blob",
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
			link.setAttribute("download", `agroreserve_products_${date}.xlsx`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
			showToast.success("Файл скачан");
		} catch {
			showToast.error("Ошибка при экспорте");
		} finally {
			setExporting(false);
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["adminProducts", { page, search, isActive }],
		queryFn: () =>
			getAdminProducts({
				page,
				per_page: 25,
				search: search || undefined,
				is_active: isActive === "" ? undefined : isActive === "true",
			}),
	});

	const toggleActiveMutation = useMutation({
		mutationFn: ({ id, active }: { id: string; active: boolean }) =>
			updateProduct(id, { is_active: active }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
			setDeleteConfirm(null);
			showToast.success("Товар удалён");
		},
		onError: () => showToast.error("Ошибка при удалении"),
	});

	return (
		<div className="p-6 space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">Каталог</h1>
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						icon={<Download className="w-4 h-4" />}
						onClick={handleExportExcel}
						loading={exporting}
					>
						<span className="hidden sm:inline">Excel</span>
					</Button>
					<Link to="/admin/catalog/new">
						<Button variant="primary" icon={<Plus className="w-4 h-4" />}>
							Добавить товар
						</Button>
					</Link>
				</div>
			</div>

			{/* Фильтры */}
			<div className="flex flex-wrap gap-3">
				<div className="flex-1 min-w-[200px] max-w-sm">
					<SearchInput
						value={search}
						onChange={(v) => {
							setSearch(v);
							setPage(1);
						}}
						placeholder="Поиск товаров..."
					/>
				</div>
				<div className="w-40">
					<Select
						options={ACTIVE_OPTIONS}
						value={isActive}
						onChange={(e) => {
							setIsActive(e.target.value);
							setPage(1);
						}}
					/>
				</div>
			</div>

			{isLoading ? (
				<PageSpinner />
			) : data?.items.length === 0 ? (
				<EmptyState
					title="Товаров нет"
					action={{
						label: "Добавить товар",
						onClick: () => (window.location.href = "/admin/catalog/new"),
					}}
				/>
			) : (
				<>
					<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
						<table className="w-full text-sm">
							<thead className="bg-gray-50 border-b border-gray-100">
								<tr>
									<th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Товар
									</th>
									<th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
										Опт
									</th>
									<th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
										Розница
									</th>
									<th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Остаток
									</th>
									<th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Статус
									</th>
									<th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Действия
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{data?.items.map((product, i) => (
									<tr
										key={product.id}
										className={i % 2 === 1 ? "bg-gray-50/50" : ""}
									>
										<td className="px-5 py-3">
											<div className="font-medium text-gray-900">
												{product.name}
											</div>
											<div className="text-xs text-gray-400">
												{product.category?.name || "—"}
											</div>
										</td>
										<td className="px-5 py-3 text-right text-gray-700 hidden md:table-cell">
											{formatPrice(product.price_wholesale)}
										</td>
										<td className="px-5 py-3 text-right text-gray-700 hidden md:table-cell">
											{formatPrice(product.price_retail)}
										</td>
										<td className="px-5 py-3">
											<div className="flex justify-center">
												<StockBadge
													quantity={product.stock_quantity}
													minQuantity={product.min_stock_quantity}
													unit={product.unit}
												/>
											</div>
										</td>
										<td className="px-5 py-3">
											<div className="flex justify-center">
												<button
													onClick={() =>
														toggleActiveMutation.mutate({
															id: product.id,
															active: !product.is_active,
														})
													}
													className="text-gray-400 hover:text-gray-700"
													title={
														product.is_active
															? "Деактивировать"
															: "Активировать"
													}
												>
													{product.is_active ? (
														<Eye className="w-4 h-4 text-green-600" />
													) : (
														<EyeOff className="w-4 h-4 text-gray-400" />
													)}
												</button>
											</div>
										</td>
										<td className="px-5 py-3">
											<div className="flex items-center justify-end gap-2">
												<Link
													to={`/admin/catalog/${product.id}/edit`}
													className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
												>
													<Edit className="w-4 h-4" />
												</Link>
												<button
													onClick={() => setDeleteConfirm(product.id)}
													className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
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

					<Pagination
						page={page}
						totalPages={data?.pages || 1}
						onPageChange={setPage}
					/>
				</>
			)}

			{/* Подтверждение удаления */}
			<Modal
				isOpen={!!deleteConfirm}
				onClose={() => setDeleteConfirm(null)}
				title="Удалить товар?"
				size="sm"
			>
				<p className="text-sm text-gray-600 mb-5">
					Это действие нельзя отменить. Товар будет удалён из каталога.
				</p>
				<div className="flex gap-3">
					<Button
						variant="danger"
						loading={deleteMutation.isPending}
						onClick={() =>
							deleteConfirm && deleteMutation.mutate(deleteConfirm)
						}
						fullWidth
					>
						Удалить
					</Button>
					<Button
						variant="secondary"
						onClick={() => setDeleteConfirm(null)}
						fullWidth
					>
						Отмена
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default AdminCatalogPage;
