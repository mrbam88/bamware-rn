import { Provider } from "react-redux"
import { store } from "@/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useThemeProvider } from "@/utils/useAppTheme"

const queryClient = new QueryClient()

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>{children}</ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
