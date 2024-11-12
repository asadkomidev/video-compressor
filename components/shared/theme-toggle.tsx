import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, FC } from "react";

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-transparent border-none"
      aria-label="Toggle theme">
      {theme === "dark" ? (
        <Sun className="size-4 " />
      ) : (
        <Moon className="size-4 " />
      )}
    </button>
  );
};

export default ThemeToggle;
