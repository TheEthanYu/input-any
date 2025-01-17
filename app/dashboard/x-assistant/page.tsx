'use client'

import { useState, useEffect } from 'react'
import { Plus, Settings, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Assistant {
  id: string
  name: string
  product_id?: string
  settings: {
    replyInterval: {
      min: number
      max: number
    }
    requireConfirmation: boolean
    dailyLimit: {
      min: number
      max: number
    }
    workingHours: {
      start: number
      end: number
    }
    keywords: string[]
    template: string
  }
}

interface Product {
  id: string
  name: string
  description: string
  url: string
}

interface FormData {
  name: string
  product_id?: string
  settings: {
    replyInterval: {
      min: number
      max: number
    }
    requireConfirmation: boolean
    keywords: string[]
    template: string
  }
}

export default function XAssistantPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [currentAssistant, setCurrentAssistant] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [newKeyword, setNewKeyword] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    settings: {
      replyInterval: {
        min: 30,
        max: 180,
      },
      requireConfirmation: true,
      keywords: [],
      template: '',
    },
  })

  useEffect(() => {
    loadAssistants()
    loadProducts()
  }, [])

  useEffect(() => {
    if (assistants.length > 0 && !currentAssistant) {
      setCurrentAssistant(assistants[0]?.id || '')
    }
  }, [assistants, currentAssistant])

  const loadAssistants = async () => {
    console.log('开始加载助手列表...')
    try {
      const response = await fetch('/api/assistants/x')
      console.log('助手列表接口响应:', response.status)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      console.log('获取到的助手数据:', data)
      setAssistants(data)
    } catch (error) {
      console.error('Error loading assistants:', error)
      toast.error('加载助手失败')
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

  const handleAddAssistant = async () => {
    if (!formData.name.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/assistants/x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          product_id: formData.product_id,
          settings: {
            ...formData.settings,
            dailyLimit: { min: 10, max: 50 },
            workingHours: { start: 9, end: 18 },
          },
        }),
      })

      if (!response.ok) throw new Error('Failed to create')

      toast.success('助手已创建')
      setIsDialogOpen(false)
      setFormData({
        name: '',
        settings: {
          replyInterval: {
            min: 30,
            max: 180,
          },
          requireConfirmation: true,
          keywords: [],
          template: '',
        },
      })
      loadAssistants()
    } catch (error) {
      console.error('Error:', error)
      toast.error('创建失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateAssistant = async (
    id: string,
    data: Partial<Assistant>
  ) => {
    try {
      console.log('Updating assistant:', id, 'with data:', data)
      const response = await fetch(`/api/assistants/x/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Update failed:', errorData)
        throw new Error('Failed to update')
      }

      const updatedData = await response.json()
      console.log('Update successful:', updatedData)

      toast.success('设置已更新')
      loadAssistants()
    } catch (error) {
      console.error('Error:', error)
      toast.error('更新失败')
    }
  }

  const handleDeleteAssistant = async (id: string) => {
    if (!confirm('确定要删除这个助手吗？')) return

    try {
      const response = await fetch(`/api/assistants/x/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      toast.success('助手已删除')
      loadAssistants()
      if (currentAssistant === id) {
        setCurrentAssistant('')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('删除失败')
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">X 助手管理</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          添加助手
        </Button>
      </div>

      {assistants.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <p>还没有创建任何助手</p>
          <p className="text-sm mt-1">点击右上角按钮创建你的第一个助手</p>
        </Card>
      ) : (
        <Tabs value={currentAssistant} onValueChange={setCurrentAssistant}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              {assistants.map(assistant => (
                <TabsTrigger
                  key={assistant.id}
                  value={assistant.id}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  {assistant.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {currentAssistant && (
              <Button
                variant="destructive"
                onClick={() => handleDeleteAssistant(currentAssistant)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除助手
              </Button>
            )}
          </div>

          {assistants.map(assistant => (
            <TabsContent key={assistant.id} value={assistant.id}>
              <div className="grid gap-6">
                {/* 基本信息 */}
                <Card>
                  <CardHeader>
                    <CardTitle>基本设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <Label>关联产品（可选）</Label>
                        <Select
                          value={assistant.product_id || 'none'}
                          onValueChange={value => {
                            console.log('Selected product:', value)
                            const product_id =
                              value === 'none' ? undefined : value
                            console.log('Updating product_id to:', product_id)
                            handleUpdateAssistant(assistant.id, {
                              product_id: product_id,
                            })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择要关联的产品" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">不关联产品</SelectItem>
                            {products.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>手动确认</Label>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={assistant.settings.requireConfirmation}
                            onCheckedChange={checked =>
                              handleUpdateAssistant(assistant.id, {
                                settings: {
                                  ...assistant.settings,
                                  requireConfirmation: checked,
                                },
                              })
                            }
                          />
                          <Label className="text-sm">需要手动确认回复</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 关键词监控 */}
                <Card>
                  <CardHeader>
                    <CardTitle>关键词监控</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="输入要监控的关键词，按回车添加每个关键词"
                        value={newKeyword}
                        onChange={e => setNewKeyword(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && newKeyword.trim()) {
                            const keywords = assistant.settings.keywords || []
                            handleUpdateAssistant(assistant.id, {
                              settings: {
                                ...assistant.settings,
                                keywords: [...keywords, newKeyword.trim()],
                              },
                            })
                            setNewKeyword('')
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          if (newKeyword.trim()) {
                            const keywords = assistant.settings.keywords || []
                            handleUpdateAssistant(assistant.id, {
                              settings: {
                                ...assistant.settings,
                                keywords: [...keywords, newKeyword.trim()],
                              },
                            })
                            setNewKeyword('')
                          }
                        }}
                      >
                        添加
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {assistant.settings.keywords?.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {keyword}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => {
                              const keywords = [...assistant.settings.keywords]
                              keywords.splice(index, 1)
                              handleUpdateAssistant(assistant.id, {
                                settings: {
                                  ...assistant.settings,
                                  keywords,
                                },
                              })
                            }}
                          />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 回复模板 */}
                <Card>
                  <CardHeader>
                    <CardTitle>回复模板</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      可用变量：{'{ai_reply}'} - AI生成的回复，
                      {assistant.product_id && (
                        <>
                          {'{product_name}'} - 产品名称，
                          {'{product_description}'} - 产品描述，
                          {'{product_url}'} - 产品URL，
                        </>
                      )}
                      {'{username}'} - 被回复用户的Twitter用户名
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="输入回复模板"
                        value={assistant.settings.template}
                        onChange={e =>
                          handleUpdateAssistant(assistant.id, {
                            settings: {
                              ...assistant.settings,
                              template: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 回复设置 */}
                <Card>
                  <CardHeader>
                    <CardTitle>回复设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <Label>回复间隔（秒）</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm">最小间隔</Label>
                          <Input
                            type="number"
                            min={0}
                            value={assistant.settings.replyInterval.min}
                            onChange={e =>
                              handleUpdateAssistant(assistant.id, {
                                settings: {
                                  ...assistant.settings,
                                  replyInterval: {
                                    ...assistant.settings.replyInterval,
                                    min: parseInt(e.target.value),
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">最大间隔</Label>
                          <Input
                            type="number"
                            min={0}
                            value={assistant.settings.replyInterval.max}
                            onChange={e =>
                              handleUpdateAssistant(assistant.id, {
                                settings: {
                                  ...assistant.settings,
                                  replyInterval: {
                                    ...assistant.settings.replyInterval,
                                    max: parseInt(e.target.value),
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建新助手</DialogTitle>
            <DialogDescription>配置你的新助手</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">助手名称</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                placeholder="例如：养号助手"
              />
            </div>

            <div className="grid gap-2">
              <Label>关联产品（可选）</Label>
              <Select
                value={formData.product_id || 'none'}
                onValueChange={value => {
                  console.log('Form selected product:', value)
                  const product_id = value === 'none' ? undefined : value
                  console.log('Setting form product_id to:', product_id)
                  setFormData(prev => ({
                    ...prev,
                    product_id: product_id,
                  }))
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择要关联的产品" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">不关联产品</SelectItem>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>手动确认</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.settings.requireConfirmation}
                  onCheckedChange={checked =>
                    setFormData(prev => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        requireConfirmation: checked,
                      },
                    }))
                  }
                />
                <Label className="text-sm">需要手动确认回复</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAssistant} disabled={isLoading}>
              {isLoading ? '创建中...' : '创建'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
