import { AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'

export const ErrorComponent = ({ error }: { error: string }) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-100 bg-red-50 p-10 text-center">
      <AlertCircle className="mb-4 text-red-500" size={48} />
      <h3 className="text-lg font-bold text-red-800">Hubo un problema</h3>
      <p className="mb-6 text-red-600/80">{error}</p>
      <Button
        onClick={() => window.location.reload()}
        variant="outline"
        className="border-red-200 hover:bg-red-100"
      >
        Reintentar conexión
      </Button>
    </div>
  )
}
