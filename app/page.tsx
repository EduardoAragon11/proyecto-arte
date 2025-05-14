import Desktop from "@/components/desktop/desktop"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <main className="h-screen w-full overflow-hidden">
        <Desktop />
      </main>
    </ThemeProvider>
  )
}
