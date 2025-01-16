'use client'

import { useState, useEffect } from 'react'
import { Plus, ExternalLink, Pencil, Trash2, Power } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  description: string
  url: string
  image_url?: string
  is_active: boolean
  user_id: string
  created_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    image_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          editingProduct ? { id: editingProduct.id, ...formData } : formData
        ),
      })

      if (!response.ok) throw new Error('Failed to save')

      toast.success(editingProduct ? '产品已更新' : '产品已添加')
      setIsOpen(false)
      setFormData({ name: '', description: '', url: '', image_url: '' })
      setEditingProduct(null)
      loadProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('保存失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
      toast.error('加载产品失败')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      url: product.url,
      image_url: product.image_url || '',
    })
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个产品吗？')) return

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      toast.success('产品已删除')
      loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('删除失败，请重试')
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/products/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: !currentStatus }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      toast.success(currentStatus ? '已停止营销' : '已开启营销')
      loadProducts()
    } catch (error) {
      console.error('Error toggling status:', error)
      toast.error('状态更新失败，请重试')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">产品管理</h1>
          <p className="text-muted-foreground mt-2">
            管理你的产品信息和营销状态
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加产品
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? '编辑产品' : '添加新产品'}
              </DialogTitle>
              <DialogDescription>
                填写产品信息，用于AI助手推广时使用。
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">产品名称</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="输入产品名称"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">产品描述</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={e =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="简短描述产品特点和优势..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">产品链接</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={e =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image_url">产品图片链接（可选）</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={e =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? '保存中...' : '保存'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {products.map(product => (
          <Card key={product.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {product.name}
                    <Badge
                      variant={product.is_active ? 'default' : 'secondary'}
                    >
                      {product.is_active ? '营销中' : '已暂停'}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="max-w-2xl">
                    {product.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={product.is_active}
                    onCheckedChange={() =>
                      handleToggleStatus(product.id, product.is_active)
                    }
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {product.url}
                </a>
              </div>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="mt-4 h-32 w-auto object-cover rounded-md"
                />
              )}
            </CardContent>
          </Card>
        ))}

        {products.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <p>还没有添加任何产品</p>
            <p className="text-sm mt-1">点击上方按钮添加你的第一个产品</p>
          </Card>
        )}
      </div>
    </div>
  )
}
