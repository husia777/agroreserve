// Zustand store авторизации
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { UserRole, UserStatus } from "@/types";
import { setTokens, clearTokens } from "@/api/client";

interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isAdmin: boolean;
	isApproved: boolean;

	// Actions
	login: (user: User, accessToken: string, refreshToken: string) => void;
	logout: () => void;
	setUser: (user: User) => void;
	updateTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,
			isAdmin: false,
			isApproved: false,

			// Вход в систему
			login: (user, accessToken, refreshToken) => {
				// Сохраняем токены в localStorage через API клиент
				setTokens(accessToken, refreshToken);

				set({
					user,
					accessToken,
					refreshToken,
					isAuthenticated: true,
					isAdmin: user.role === UserRole.ADMIN,
					isApproved:
						user.status === UserStatus.APPROVED || user.role === UserRole.ADMIN,
				});
			},

			// Выход из системы
			logout: () => {
				clearTokens();
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
					isAdmin: false,
					isApproved: false,
				});
			},

			// Обновление данных пользователя
			setUser: (user) => {
				const currentState = get();
				set({
					...currentState,
					user,
					isAdmin: user.role === UserRole.ADMIN,
					isApproved:
						user.status === UserStatus.APPROVED || user.role === UserRole.ADMIN,
				});
			},

			// Обновление токенов
			updateTokens: (accessToken, refreshToken) => {
				setTokens(accessToken, refreshToken);
				set({ accessToken, refreshToken });
			},
		}),
		{
			name: "agroreserve-auth",
			// Не сохраняем токены в store (они в localStorage через setTokens)
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
				isAuthenticated: state.isAuthenticated,
				isAdmin: state.isAdmin,
				isApproved: state.isApproved,
			}),
			onRehydrateStorage: () => (state) => {
				// Пересчитываем isAdmin/isApproved из user после восстановления из localStorage
				if (state && state.user) {
					state.isAdmin = state.user.role === UserRole.ADMIN;
					state.isApproved =
						state.user.status === UserStatus.APPROVED ||
						state.user.role === UserRole.ADMIN;
				}
			},
		},
	),
);
