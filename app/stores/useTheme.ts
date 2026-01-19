import { defineStore } from "pinia";

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

export default defineStore(
  "themeStore",
  () => {
    const themes: Theme[] = ["dark", "light", "system"];

    const callableThemes: Record<Theme, () => Promise<void>> = {
      dark: window.themeApi.toggleDarkMode,
      light: window.themeApi.toggleLightMode,
      system: window.themeApi.toggleToSystem,
    };

    const rowTheme = ref(0);
    const current = computed(() => themes[rowTheme.value] as Theme);

    async function loadTheme() {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const currentPreset = await window.themeApi.currentPreset();

      const presetIndex = themes.indexOf(currentPreset as Theme);
      rowTheme.value = presetIndex !== -1 ? presetIndex : 1; // default to "light" if not found

      const theme = themes[rowTheme.value] as Theme;
      document.documentElement.setAttribute(
        "app-theme",
        theme === "system" ? (isDark ? "dark" : "light") : theme,
      );
      document.documentElement.setAttribute(
        "data-bs-theme",
        theme === "system" ? (isDark ? "dark" : "light") : theme,
      );
      await callableThemes[theme]();
    }

    async function toggleTheme() {
      rowTheme.value = (rowTheme.value + 1) % themes.length;
      const selectedTheme = themes[rowTheme.value] as Theme;

      await callableThemes[selectedTheme]();
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      document.documentElement.setAttribute(
        "app-theme",
        selectedTheme === "system"
          ? isDark
            ? "dark"
            : "light"
          : selectedTheme,
      );
      document.documentElement.setAttribute(
        "data-bs-theme",
        selectedTheme === "system"
          ? isDark
            ? "dark"
            : "light"
          : selectedTheme,
      );
    }

    return { current, loadTheme, toggleTheme, themes, rowTheme };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
