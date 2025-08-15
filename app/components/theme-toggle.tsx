import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "~/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <IconMoon size={18} stroke={1.8} />
      ) : (
        <IconSun size={18} stroke={1.8} />
      )}
    </button>
  );
}