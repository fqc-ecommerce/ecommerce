# Ecommerce
## Desarrollado por [Franco Queirolo](https://github.com/francoqueirolo)
### Estructura de Carpetas

```
src/
├── api/              # Configuración de Axios e Interceptores (JWT)
├── components/       # Componentes globales de Shadcn y UI común
│   ├── ui/           # Componentes de Shadcn (Button, Input, etc.)
│   └── shared/       # Layouts, Navbar, Footer
├── context/          # Estados globales (Auth y Carrito)
├── features/         # Lógica central dividida por dominio
│   ├── auth/         # Login, decodificación de JWT, hooks de permisos
│   ├── products/     # Lista de productos, Formulario de creación (Admin)
│   └── orders/       # Carrito de compras, historial, creación de orden
├── hooks/            # Hooks genéricos (useLocalStorage, useDebounce)
├── lib/              # Utilidades (clase 'cn' para Tailwind, validaciones)
├── services/         # Llamadas directas a los 3 Microservicios
└── types/            # Definiciones de TypeScript / Interfaces

```