import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Save, ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  getProductById,
  saveProduct,
  updateProduct,
} from './services/productService'

export const ProductFormPage = () => {
  // Si existe ID, estamos editando
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  })

  useEffect(() => {
    if (id) {
      setLoading(true)

      getProductById(Number(id))
        .then((data) =>
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price.toString(),
            stock: data.stock.toString(),
            category: data.category,
          }),
        )
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    }

    try {
      if (id) {
        await updateProduct(Number(id), payload)
        toast.success('Producto actualizado con éxito')
      } else {
        await saveProduct(payload)
        toast.success('Producto creado con éxito')
      }
      navigate('/productos')
    } catch (error) {
      toast.error('Error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  if (loading && id)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    )

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 gap-2 text-gray-500"
      >
        <ArrowLeft size={16} /> Volver
      </Button>

      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <Package size={20} />
            </div>
            <CardTitle>{id ? 'Editar Producto' : 'Nuevo Producto'}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                Nombre del Producto
              </label>
              <Input
                required
                placeholder="Ej. Laptop Dell XPS 15"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                Descripción
              </label>
              <Textarea
                required
                placeholder="Describe las características principales..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Precio ($)
                </label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Stock Inicial
                </label>
                <Input
                  required
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                Categoría
              </label>
              <Input
                required
                placeholder="Ej. Electronics, Software, Home..."
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <Save className="mr-2" size={18} />
              )}
              {id ? 'Actualizar Producto' : 'Publicar Producto'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
