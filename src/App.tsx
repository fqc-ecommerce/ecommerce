import { Toaster } from '@/components/ui/sonner'
import { AppRoutes } from './routes/AppRoutes'
import { Navbar } from './components/shared/Navbar'
import { CartSidebar } from './components/shared/CartSidebar'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <CartSidebar />

      <main className="container mx-auto px-4 py-6">
        <AppRoutes />
      </main>

      <Toaster position="bottom-right" richColors closeButton />
    </div>
  )
}

export default App
