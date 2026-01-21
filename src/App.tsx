import { Toaster } from '@/components/ui/sonner'
import { AppRoutes } from './routes/AppRoutes'
import { Navbar } from './components/shared/Navbar'
import { CartSidebar } from './components/shared/CartSidebar'
import Footer from './components/shared/Footer'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <CartSidebar />

      <main className="container mx-auto flex-1 px-4 py-6">
        <AppRoutes />
      </main>

      <Footer />
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  )
}

export default App