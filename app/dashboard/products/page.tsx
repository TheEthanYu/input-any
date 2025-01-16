'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

interface Product {
  id: string
  name: string
  description: string
  url: string
  image_url?: string
  user_id: string
  created_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const supabase = createClientComponentClient()

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

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">产品管理</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id}>
            {product.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline truncate block"
              >
                {product.url}
              </a>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(product)}
              >
                编辑
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.id)}
              >
                删除
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
