import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const getInitialTheme = (): boolean => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
  }
  return true;
};

// Apply theme class synchronously on module load to prevent flash
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("theme");
  const isDark = stored ? stored === "dark" : true;
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

const ThemeToggle = () => {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default ThemeToggle;
