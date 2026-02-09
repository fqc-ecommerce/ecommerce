# 🛍️ ECOM - e-commerce Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Una plataforma de comercio electrónico moderna y escalable construida con tecnologías de vanguardia.

## 🚀 Características Principales

- **Autenticación segura** con JWT y manejo de sesiones
- **Catálogo de productos** con búsqueda y filtrado
- **Carrito de compras** persistente
- **Panel de administración** para gestión de productos
- **Diseño responsive** que funciona en todos los dispositivos
- **Tema oscuro/claro** con soporte para preferencias del sistema

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Entorno de desarrollo y construcción
- **React Router** - Enrutamiento del lado del cliente
- **Zustand** - Gestión de estado global
- **Axios** - Cliente HTTP
- **JWT Decode** - Manejo de tokens de autenticación

### UI/UX
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/UI** - Componentes de UI accesibles
- **Lucide React** - Iconos
- **Radix UI** - Componentes primitivos accesibles
- **Class Variance Authority** - Utilidades para variantes de componentes

### Herramientas de Desarrollo
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formateador de código
- **Husky** - Git hooks
- **Commitlint** - Linting de mensajes de commit

## 🏗️ Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes de Shadcn/UI
│   └── shared/      # Componentes compartidos (Layout, Navbar, etc.)
├── features/        # Funcionalidades agrupadas por dominio
│   ├── auth/        # Autenticación y autorización
│   ├── products/    # Gestión de productos
│   └── orders/      # Gestión de pedidos
├── lib/             # Utilidades y configuraciones
├── providers/       # Proveedores de contexto
├── routes/          # Configuración de rutas
├── stores/          # Estados globales con Zustand
├── types/           # Definiciones de TypeScript
└── utils/           # Funciones de utilidad
```

## 🚀 Empezando

### Requisitos Previos

- Node.js 18+
- pnpm

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/francoqueirolo/ecommerce.git
   cd ecommerce
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

3. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus configuraciones
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

## 📦 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm lint` - Ejecuta ESLint
- `pnpm format` - Formatea el código con Prettier
- `pnpm preview` - Previsualiza la versión de producción localmente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

---

##  Arquitectura del Proyecto
Arquitectura basada en las buenas practicas de:
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

## Link de la aplicacion en vercel:
- https://ecommerce-nine-xi-39.vercel.app/

## 📦 Mocks
nota: usando servivio de mocks de [beeceptor](https://beeceptor.com/) para emular en produccion.
```
Login: admin@ecom.com
Password: admin123
```z
Desarrollado con ❤️ por [Franco Queirolo](https://github.com/francoqueirolo)