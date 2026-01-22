import { Loader2, ShoppingBag } from 'lucide-react'

export const CustomLoader = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <Loader2
          className="animate-spin text-blue-600"
          size={48}
          strokeWidth={1.5}
        />
        <ShoppingBag className="absolute text-blue-400" size={20} />
      </div>
      <p className="mt-4 animate-pulse text-sm font-medium text-gray-500">
        Preparando tu catálogo...
      </p>
    </div>
  )
}
