import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Importación de las páginas
import { AdminDashboardPage } from '@/features/auth/AdminDashboardPage';
import { LoginPage } from '@/features/auth/LoginPage';
import { OrdersHistoryPage } from '@/features/orders/OrdersHistoryPage';
import { ProductsPage } from '@/features/products/ProductsPage';

export const AppRoutes = () => {
  const { user, isAdmin } = useAuth();

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
      <Route path="/" element={<Navigate to="/productos" replace />} />
      <Route path="*" element={<Navigate to="/productos" replace />} />
    </Routes>
  );
};
