import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

import { AdminDashboardPage } from '@/features/auth/routes/AdminDashboardPage'
import { LoginPage } from '@/features/auth/routes/LoginPage'
import { OrdersHistoryPage } from '@/features/orders/routes/OrdersHistoryPage'
import { ProductsPage } from '@/features/products/routes/ProductsPage'
import { OrderDetailPage } from '@/features/orders/routes/OrderDetailPage'
import { ProductFormPage } from '@/features/products/routes/ProductFormPage'

export const AppRoutes = () => {
  const { user, isAdmin } = useAuth()

  console.log(user, isAdmin)

  return (
    <Routes>
      <Route path="/productos" element={<ProductsPage />} />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/productos" />}
      />
      <Route
        path="/ordenes"
        element={user ? <OrdersHistoryPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={
          isAdmin ? <AdminDashboardPage /> : <Navigate to="/productos" />
        }
      />
      <Route path="/ordenes/:id" element={<OrderDetailPage />} />
      <Route path="/" element={<Navigate to="/productos" replace />} />
      <Route path="*" element={<Navigate to="/productos" replace />} />

      <Route path="/admin/productos/nuevo" element={<ProductFormPage />} />
      <Route path="/admin/productos/editar/:id" element={<ProductFormPage />} />
    </Routes>
  )
}
