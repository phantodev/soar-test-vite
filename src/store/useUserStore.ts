import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the user store state interface
interface UserState {
	// Profile information
	name: string;
	userName: string;
	email: string;
	password: string;
	dateOfBirth: string;
	presentAddress: string;
	permanentAddress: string;
	city: string;
	postalCode: string;
	country: string;
	profilePicture: string;

	// Preferences (can be expanded later)
	preferences: {
		notifications: boolean;
		darkMode: boolean;
		language: string;
	};

	// Security settings (can be expanded later)
	security: {
		twoFactorEnabled: boolean;
		lastPasswordChange: string;
	};

	// Actions
	updateProfile: (
		userData: Partial<
			Omit<UserState, "updateProfile" | "updatePreferences" | "updateSecurity">
		>,
	) => void;
	updatePreferences: (preferences: Partial<UserState["preferences"]>) => void;
	updateSecurity: (security: Partial<UserState["security"]>) => void;
}

// Create the user store with persistence
export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			// Default values
			name: "Charlene Reed",
			userName: "Charlene Reed",
			email: "charlenereed@gmail.com",
			password: "**********", // In a real app, never store plain text passwords
			dateOfBirth: "2000-01-01", // Valor fixo para data de nascimento padrão
			presentAddress: "San Jose, California, USA",
			permanentAddress: "San Jose, California, USA",
			city: "San Jose",
			postalCode: "45962",
			country: "USA",
			profilePicture: "/assets/avatar-big.png",

			preferences: {
				notifications: true,
				darkMode: false,
				language: "en",
			},

			security: {
				twoFactorEnabled: false,
				lastPasswordChange: new Date().toISOString(),
			},

			// Actions to update the store
			updateProfile: (userData) =>
				set((state) => ({
					...state,
					...userData,
				})),

			updatePreferences: (newPreferences) =>
				set((state) => ({
					...state,
					preferences: {
						...state.preferences,
						...newPreferences,
					},
				})),

			updateSecurity: (newSecurity) =>
				set((state) => ({
					...state,
					security: {
						...state.security,
						...newSecurity,
					},
				})),
		}),
		{
			name: "user-storage",
		},
	),
);
