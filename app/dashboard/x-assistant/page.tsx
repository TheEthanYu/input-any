'use client'

import { useState, useEffect } from 'react'
import { Plus, Settings, Trash2 } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface Assistant {
  id: string
  name: string
  modes: {
    growth: boolean
    promotion: boolean
  }
  growth_weight: number
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
    templates: string[]
  }
  products: Array<{
    id: string
    weight: number
    include_link: boolean
  }>
}

interface FormData {
  name: string
  modes: {
    growth: boolean
    promotion: boolean
  }
  growth_weight: number
  settings: {
    replyInterval: {
      min: number
      max: number
    }
    requireConfirmation: boolean
  }
  products: Array<{
    id: string
    weight: number
    include_link: boolean
  }>
}

export default function XAssistantPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [currentAssistant, setCurrentAssistant] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    modes: {
      growth: false,
      promotion: false,
    },
    growth_weight: 50,
    settings: {
      replyInterval: {
        min: 30,
        max: 180,
      },
      requireConfirmation: true,
    },
    products: [],
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
          modes: formData.modes,
          growth_weight: formData.growth_weight,
          settings: {
            ...formData.settings,
            dailyLimit: { min: 10, max: 50 },
            workingHours: { start: 9, end: 18 },
            keywords: [],
            templates: [],
          },
          products: formData.products,
        }),
      })

      if (!response.ok) throw new Error('Failed to create')

      toast.success('助手已创建')
      setIsDialogOpen(false)
      setFormData({
        name: '',
        modes: {
          growth: false,
          promotion: false,
        },
        growth_weight: 50,
        settings: {
          replyInterval: {
            min: 30,
            max: 180,
          },
          requireConfirmation: true,
        },
        products: [],
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
      const response = await fetch(`/api/assistants/x/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to update')

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

  const handleUpdateProductWeight = async (
    assistantId: string,
    productId: string,
    weight: number,
    assistant: Assistant,
    includeLink?: boolean
  ) => {
    const updatedProducts =
      assistant.products?.map(p =>
        p.id === productId
          ? { ...p, weight, include_link: includeLink ?? p.include_link }
          : p
      ) || []

    // 如果产品不存在，添加新产品
    if (!assistant.products?.find(p => p.id === productId)) {
      updatedProducts.push({
        id: productId,
        weight,
        include_link: includeLink ?? false,
      })
    }

    // 计算总权重并调整
    const totalWeight = updatedProducts.reduce((sum, p) => sum + p.weight, 0)
    if (totalWeight > 100) {
      const factor = 100 / totalWeight
      updatedProducts.forEach(p => {
        p.weight = Math.round(p.weight * factor)
      })
    }

    await handleUpdateAssistant(assistantId, { products: updatedProducts })
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
                <Card>
                  <CardHeader>
                    <CardTitle>行为模式</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={assistant.modes.growth}
                          onCheckedChange={checked =>
                            handleUpdateAssistant(assistant.id, {
                              modes: {
                                ...assistant.modes,
                                growth: checked as boolean,
                              },
                            })
                          }
                        />
                        <label>养号模式</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={assistant.modes.promotion}
                          onCheckedChange={checked =>
                            handleUpdateAssistant(assistant.id, {
                              modes: {
                                ...assistant.modes,
                                promotion: checked as boolean,
                              },
                            })
                          }
                        />
                        <label>营销模式</label>
                      </div>
                    </div>

                    {assistant.modes.growth && assistant.modes.promotion && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">模式权重</label>
                        <Slider
                          min={0}
                          max={100}
                          step={10}
                          value={[assistant.growth_weight]}
                          onValueChange={([value]) =>
                            handleUpdateAssistant(assistant.id, {
                              growth_weight: value,
                            })
                          }
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>养号 {assistant.growth_weight}%</span>
                          <span>营销 {100 - assistant.growth_weight}%</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {assistant.modes.promotion && (
                  <Card>
                    <CardHeader>
                      <CardTitle>产品配置</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {products.map(product => (
                        <div key={product.id} className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">
                              {product.name}
                            </label>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={
                                    assistant.products.find(
                                      p => p.id === product.id
                                    )?.include_link || false
                                  }
                                  onCheckedChange={checked =>
                                    handleUpdateProductWeight(
                                      assistant.id,
                                      product.id,
                                      assistant.products.find(
                                        p => p.id === product.id
                                      )?.weight || 0,
                                      assistant,
                                      checked
                                    )
                                  }
                                />
                                <Label className="text-sm">包含链接</Label>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {assistant.products.find(
                                  p => p.id === product.id
                                )?.weight || 0}
                                %
                              </span>
                            </div>
                          </div>
                          <Slider
                            min={0}
                            max={100}
                            step={10}
                            value={[
                              assistant.products.find(p => p.id === product.id)
                                ?.weight || 0,
                            ]}
                            onValueChange={([value]) =>
                              handleUpdateProductWeight(
                                assistant.id,
                                product.id,
                                value,
                                assistant,
                                assistant.products.find(
                                  p => p.id === product.id
                                )?.include_link || false
                              )
                            }
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>回复设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>创建新助手</DialogTitle>
            <DialogDescription>配置你的新助手</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">助手名称</Label>
              <Input
                id="name"
                value={formData?.name || ''}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                placeholder="例如：养号助手"
              />
            </div>

            <div className="grid gap-4">
              <Label>行为模式</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData?.modes?.growth || false}
                    onCheckedChange={checked =>
                      setFormData(prev => ({
                        ...prev,
                        modes: { ...prev.modes, growth: checked as boolean },
                      }))
                    }
                  />
                  <label>养号模式</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData?.modes?.promotion || false}
                    onCheckedChange={checked =>
                      setFormData(prev => ({
                        ...prev,
                        modes: { ...prev.modes, promotion: checked as boolean },
                      }))
                    }
                  />
                  <label>营销模式</label>
                </div>
              </div>
            </div>

            {formData?.modes?.growth && formData?.modes?.promotion && (
              <div className="space-y-2">
                <Label>模式权重</Label>
                <Slider
                  min={0}
                  max={100}
                  step={10}
                  value={[formData.growth_weight]}
                  onValueChange={([value]) => {
                    if (typeof value !== 'number') return
                    setFormData(prev => ({ ...prev, growth_weight: value }))
                  }}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>养号 {formData.growth_weight}%</span>
                  <span>营销 {100 - formData.growth_weight}%</span>
                </div>
              </div>
            )}

            <div className="grid gap-4">
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

              <Label>回复间隔（秒）</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">最小间隔</Label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.settings.replyInterval.min}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          replyInterval: {
                            ...prev.settings.replyInterval,
                            min: parseInt(e.target.value),
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">最大间隔</Label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.settings.replyInterval.max}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          replyInterval: {
                            ...prev.settings.replyInterval,
                            max: parseInt(e.target.value),
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {formData?.modes?.promotion && (
              <div className="grid gap-4">
                <Label>产品配置</Label>
                <div className="space-y-4">
                  {products.map(product => (
                    <div key={product.id} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">
                          {product.name}
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={
                                formData.products.find(p => p.id === product.id)
                                  ?.include_link || false
                              }
                              onCheckedChange={checked => {
                                const updatedProducts = [...formData.products]
                                const productIndex = updatedProducts.findIndex(
                                  p => p.id === product.id
                                )

                                if (productIndex === -1) {
                                  updatedProducts.push({
                                    id: product.id,
                                    weight: 0,
                                    include_link: checked,
                                  })
                                } else {
                                  updatedProducts[productIndex].include_link =
                                    checked
                                }

                                setFormData(prev => ({
                                  ...prev,
                                  products: updatedProducts,
                                }))
                              }}
                            />
                            <Label className="text-sm">包含链接</Label>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formData.products.find(p => p.id === product.id)
                              ?.weight || 0}
                            %
                          </span>
                        </div>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={[
                          formData.products.find(p => p.id === product.id)
                            ?.weight || 0,
                        ]}
                        onValueChange={([value]) => {
                          if (typeof value !== 'number') return

                          const updatedProducts = [...formData.products]
                          const productIndex = updatedProducts.findIndex(
                            p => p.id === product.id
                          )

                          if (productIndex === -1) {
                            updatedProducts.push({
                              id: product.id,
                              weight: value,
                              include_link: false,
                            })
                          } else {
                            updatedProducts[productIndex].weight = value
                          }

                          // 调整权重总和为100%
                          const totalWeight = updatedProducts.reduce(
                            (sum, p) => sum + p.weight,
                            0
                          )
                          if (totalWeight > 100) {
                            const factor = 100 / totalWeight
                            updatedProducts.forEach(p => {
                              p.weight = Math.round(p.weight * factor)
                            })
                          }

                          setFormData(prev => ({
                            ...prev,
                            products: updatedProducts,
                          }))
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
