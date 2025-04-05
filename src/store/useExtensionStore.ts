import { create } from "zustand";
import { ExtensionProps } from "../types.ts";
import { devtools } from "zustand/middleware";

interface ExtensionStore {
    extensions: ExtensionProps[];
    filter: "all" | "active" | "inactive";
    theme: string;
    setExtensions: (extensions: ExtensionProps[]) => void;
    setFilter: (filter: "all" | "active" | "inactive") => void;
    toggleTheme: () => void;
    getFilteredExtensions: () => ExtensionProps[];
    handleRemoveExtension: (id: string) => void;
    toggleExtension: (id: string, isActive: boolean) => void;
}

export const useExtensionStore = create<ExtensionStore>()(
    devtools((set, get) => ({
        extensions: [],
        filter: "all",
        theme: window.localStorage.getItem("theme") || "dark",

        // Set full extensions list
        setExtensions: (extensions) => set({ extensions }),

        // Change current filter
        setFilter: (filter) => set({ filter }),

        // Toggle between light and dark theme
        toggleTheme: () => {
            const currentTheme = get().theme;
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            window.localStorage.setItem("theme", newTheme);
            set({ theme: newTheme });
        },

        // Return filtered list based on current filter
        getFilteredExtensions: () => {
            const { extensions, filter } = get();
            if (filter === "active") {
                return extensions.filter((ext) => ext.isActive);
            } else if (filter === "inactive") {
                return extensions.filter((ext) => !ext.isActive);
            }
            return extensions;
        },

        // Remove an extension by ID
        handleRemoveExtension: (id) => {
            set((state) => ({
                extensions: state.extensions.filter((ext) => ext.id !== id),
            }));
        },

        // Toggle extension active status with error handling
        toggleExtension: async (id, isActive) => {
            try {
                const response = await fetch(`http://localhost:3001/extensions/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isActive: !isActive }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update extension status");
                }

                set((state) => ({
                    extensions: state.extensions.map((ext) =>
                        ext.id === id ? { ...ext, isActive: !ext.isActive } : ext
                    ),
                }));
            } catch (error) {
                console.error("Error toggling extension:", error);
                // You can add a toast or alert here for better UX
            }
        },
    }))
);
