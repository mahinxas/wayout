// Dark mode removed — Wayout is light-only.
// Stub preserved so legacy imports compile without errors during migration.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export const useTheme = () => ({ theme: 'light' as const, toggle: () => {} });
