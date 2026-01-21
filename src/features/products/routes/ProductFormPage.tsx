import {
  useEffect,
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Package, Save, ArrowLeft, Loader2, ImagePlus, X } from 'lucide-react'
import { toast } from 'sonner'
import { getProductById } from '../api/getProductById'
import { uploadToImgBB } from '../api/uploadToImgBB'
import { updateProduct } from '../api/updateProduct'
import { saveProduct } from '../api/saveProduct'

export const ProductFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: '',
  })

  useEffect(() => {
    if (id) {
      setLoading(true)
      getProductById(Number(id))
        .then((data) => {
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price.toString(),
            stock: data.stock.toString(),
            category: data.category,
            imageUrl: data.imageUrl || '',
          })
          if (data.imageUrl) setImagePreview(data.imageUrl)
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)

    uploadToImgBB(file)
      .then((url) => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: url,
        }))
        setImagePreview(url)
        toast.success('Imagen cargada con éxito')
      })
      .catch((error) => {
        console.error('Error al subir la imagen:', error)
        toast.error('Error al subir la imagen')
      })
      .finally(() => {
        setUploadingImage(false)
      })
  }

  const handleSubmit = async (e: FormEvent) => {
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
                Imagen del Producto
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all ${imagePreview ? 'border-blue-400 bg-white' : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'}`}
              >
                {uploadingImage ? (
                  <Loader2 className="animate-spin text-blue-500" size={32} />
                ) : imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white">
                        Cambiar Imagen
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setImagePreview(null)
                        setFormData((p) => ({ ...p, imageUrl: '' }))
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <ImagePlus size={32} strokeWidth={1.5} className="mb-2" />
                    <p className="text-sm font-medium">
                      Click para añadir imagen
                    </p>
                    <p className="text-[10px] uppercase">JPG, PNG o WEBP</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Nombre</label>
              <Input
                required
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
                className="resize-none"
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
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Stock</label>
                <Input
                  required
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 pb-4">
              <label className="text-sm font-bold text-gray-700">
                Categoría
              </label>
              <Input
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading || uploadingImage}
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
