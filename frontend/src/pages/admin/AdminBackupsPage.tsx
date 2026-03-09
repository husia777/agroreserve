// Страница управления резервными копиями (UC-51)
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Database,
	Download,
	Trash2,
	RotateCcw,
	PlusCircle,
	HardDrive,
	Clock,
	AlertTriangle,
	CheckCircle,
	Loader2,
	Shield,
} from "lucide-react";
import { apiClient } from "@/api/client";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import { PageSpinner } from "@/components/ui/Spinner";
import toast from "react-hot-toast";

// --- Типы ---

interface BackupInfo {
	name: string;
	created_at: string;
	size_bytes: number;
	size_human: string;
	type: string;
}

interface BackupListResponse {
	items: BackupInfo[];
	total: number;
	backup_dir: string;
}

interface BackupCreateResponse {
	status: string;
	backup_name: string;
	size_bytes: number;
	size_human: string;
	message: string;
}

// --- API ---

const getBackups = async (): Promise<BackupListResponse> => {
	const response = await apiClient.get<BackupListResponse>("/admin/backups");
	return response.data;
};

const createBackup = async (): Promise<BackupCreateResponse> => {
	const response = await apiClient.post<BackupCreateResponse>("/admin/backups");
	return response.data;
};

const deleteBackup = async (name: string): Promise<void> => {
	await apiClient.delete(`/admin/backups/${name}`);
};

const restoreBackup = async (
	name: string,
): Promise<{ status: string; message: string }> => {
	const response = await apiClient.post<{ status: string; message: string }>(
		`/admin/backups/${name}/restore`,
	);
	return response.data;
};

// --- Компонент ---

const AdminBackupsPage: React.FC = () => {
	const queryClient = useQueryClient();
	const [confirmRestore, setConfirmRestore] = useState<string | null>(null);
	const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

	const { data, isLoading } = useQuery({
		queryKey: ["admin", "backups"],
		queryFn: getBackups,
		refetchInterval: 30000, // Обновлять каждые 30 сек
	});

	const createMutation = useMutation({
		mutationFn: createBackup,
		onSuccess: (res) => {
			toast.success(res.message);
			queryClient.invalidateQueries({ queryKey: ["admin", "backups"] });
		},
		onError: (err: { response?: { data?: { detail?: string } } }) => {
			toast.error(err?.response?.data?.detail || "Ошибка создания бэкапа");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteBackup,
		onSuccess: () => {
			toast.success("Бэкап удалён");
			setConfirmDelete(null);
			queryClient.invalidateQueries({ queryKey: ["admin", "backups"] });
		},
		onError: (err: { response?: { data?: { detail?: string } } }) => {
			toast.error(err?.response?.data?.detail || "Ошибка удаления");
		},
	});

	const restoreMutation = useMutation({
		mutationFn: restoreBackup,
		onSuccess: (res) => {
			toast.success(res.message);
			setConfirmRestore(null);
		},
		onError: (err: { response?: { data?: { detail?: string } } }) => {
			toast.error(err?.response?.data?.detail || "Ошибка восстановления");
		},
	});

	const handleDownload = (name: string) => {
		// Открываем прямую ссылку на скачивание
		const token = localStorage.getItem("access_token");
		const baseUrl = apiClient.defaults.baseURL || "";
		window.open(
			`${baseUrl}/admin/backups/${name}/download?token=${token}`,
			"_blank",
		);
	};

	const formatDate = (iso: string): string => {
		try {
			const d = new Date(iso);
			return d.toLocaleString("ru-RU", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
		} catch {
			return iso;
		}
	};

	if (isLoading) return <PageSpinner />;

	const backups = data?.items || [];
	const totalSize = backups.reduce((sum, b) => sum + b.size_bytes, 0);

	return (
		<div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
			{/* Заголовок */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
						<Database className="w-6 h-6 text-primary-600" />
						Резервные копии
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Управление бэкапами базы данных MongoDB
					</p>
				</div>
				<Button
					onClick={() => createMutation.mutate()}
					disabled={createMutation.isPending}
					className="flex items-center gap-2"
				>
					{createMutation.isPending ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<PlusCircle className="w-4 h-4" />
					)}
					{createMutation.isPending ? "Создание..." : "Создать бэкап"}
				</Button>
			</div>

			{/* Статистика */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-white rounded-xl border border-gray-200 p-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
							<HardDrive className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">
								{backups.length}
							</p>
							<p className="text-xs text-gray-500">Всего бэкапов</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl border border-gray-200 p-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
							<Shield className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">
								{backups.length > 0 ? formatDate(backups[0].created_at) : "—"}
							</p>
							<p className="text-xs text-gray-500">Последний бэкап</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl border border-gray-200 p-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
							<Database className="w-5 h-5 text-purple-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">
								{totalSize < 1024 * 1024
									? `${(totalSize / 1024).toFixed(1)} КБ`
									: `${(totalSize / (1024 * 1024)).toFixed(1)} МБ`}
							</p>
							<p className="text-xs text-gray-500">Общий размер</p>
						</div>
					</div>
				</div>
			</div>

			{/* Информация о расписании */}
			<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
				<Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
				<div className="text-sm text-blue-800">
					<p className="font-medium">Автоматическое резервное копирование</p>
					<p className="mt-0.5 text-blue-600">
						Бэкап создаётся ежедневно в 03:00 (МСК). Хранятся последние 7 копий.
					</p>
				</div>
			</div>

			{/* Список бэкапов */}
			{backups.length === 0 ? (
				<div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
					<Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
					<p className="text-gray-500 font-medium">Бэкапов пока нет</p>
					<p className="text-sm text-gray-400 mt-1">
						Нажмите «Создать бэкап» для первой резервной копии
					</p>
				</div>
			) : (
				<div className="space-y-3">
					{backups.map((backup) => (
						<div
							key={backup.name}
							className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
						>
							<div className="flex items-center justify-between gap-4">
								{/* Информация */}
								<div className="flex items-center gap-3 min-w-0">
									<div
										className={cn(
											"w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
											backup.type === "auto" ? "bg-green-50" : "bg-blue-50",
										)}
									>
										<Database
											className={cn(
												"w-5 h-5",
												backup.type === "auto"
													? "text-green-600"
													: "text-blue-600",
											)}
										/>
									</div>
									<div className="min-w-0">
										<p className="text-sm font-semibold text-gray-900 truncate">
											{backup.name}
										</p>
										<div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
											<span className="flex items-center gap-1">
												<Clock className="w-3 h-3" />
												{formatDate(backup.created_at)}
											</span>
											<span className="flex items-center gap-1">
												<HardDrive className="w-3 h-3" />
												{backup.size_human}
											</span>
										</div>
									</div>
								</div>

								{/* Действия */}
								<div className="flex items-center gap-1.5 flex-shrink-0">
									<button
										onClick={() => handleDownload(backup.name)}
										className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
										title="Скачать"
									>
										<Download className="w-4.5 h-4.5" />
									</button>
									<button
										onClick={() => setConfirmRestore(backup.name)}
										className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
										title="Восстановить"
									>
										<RotateCcw className="w-4.5 h-4.5" />
									</button>
									<button
										onClick={() => setConfirmDelete(backup.name)}
										className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
										title="Удалить"
									>
										<Trash2 className="w-4.5 h-4.5" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Модал подтверждения восстановления */}
			{confirmRestore && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
								<AlertTriangle className="w-5 h-5 text-amber-600" />
							</div>
							<h3 className="text-lg font-bold text-gray-900">
								Восстановить базу?
							</h3>
						</div>
						<p className="text-sm text-gray-600 mb-2">
							Текущие данные будут{" "}
							<span className="font-semibold text-red-600">перезаписаны</span>{" "}
							данными из бэкапа:
						</p>
						<p className="text-sm font-mono bg-gray-50 rounded-lg px-3 py-2 mb-4 text-gray-700 break-all">
							{confirmRestore}
						</p>
						<p className="text-xs text-gray-500 mb-5">
							Рекомендуем создать свежий бэкап перед восстановлением.
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => setConfirmRestore(null)}
								className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
							>
								Отмена
							</button>
							<button
								onClick={() => restoreMutation.mutate(confirmRestore)}
								disabled={restoreMutation.isPending}
								className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
							>
								{restoreMutation.isPending ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<RotateCcw className="w-4 h-4" />
								)}
								Восстановить
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Модал подтверждения удаления */}
			{confirmDelete && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
								<Trash2 className="w-5 h-5 text-red-600" />
							</div>
							<h3 className="text-lg font-bold text-gray-900">
								Удалить бэкап?
							</h3>
						</div>
						<p className="text-sm text-gray-600 mb-2">
							Бэкап будет удалён безвозвратно:
						</p>
						<p className="text-sm font-mono bg-gray-50 rounded-lg px-3 py-2 mb-5 text-gray-700 break-all">
							{confirmDelete}
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => setConfirmDelete(null)}
								className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
							>
								Отмена
							</button>
							<button
								onClick={() => deleteMutation.mutate(confirmDelete)}
								disabled={deleteMutation.isPending}
								className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
							>
								{deleteMutation.isPending ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Trash2 className="w-4 h-4" />
								)}
								Удалить
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminBackupsPage;
