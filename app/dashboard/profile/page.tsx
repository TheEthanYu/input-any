'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // 获取用户信息
  const fetchUserProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setName(user.user_metadata?.name || '')
        setEmail(user.email || '')
        setAvatar(user.user_metadata?.avatar_url || '')
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  // 在组件加载时获取用户信息
  useEffect(() => {
    fetchUserProfile()
  })

  // 处理头像上传
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true)
      const file = e.target.files?.[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const filePath = `avatars/${Math.random()}.${fileExt}`

      // 上传到 Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 获取公共 URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(filePath)

      // 更新用户元数据
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      })

      if (updateError) throw updateError

      setAvatar(publicUrl)
      router.refresh()
    } catch (error) {
      console.error('Error uploading avatar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 处理名字更新
  const handleNameSave = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.updateUser({
        data: { name },
      })
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Error updating name:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 处理邮箱更新
  const handleEmailSave = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.updateUser({ email })
      if (error) throw error
      alert('Please check your email to confirm the change')
    } catch (error) {
      console.error('Error updating email:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Your avatar</h2>
                <p className="text-sm text-muted-foreground">
                  Click the picture to upload a custom avatar.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={isLoading}
                  />
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>
                      {name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </label>
              </div>
            </div>

            {/* Name Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Your name</h2>
                <p className="text-sm text-muted-foreground">
                  Please enter your full name or a display name you are
                  comfortable with.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="name" className="sr-only">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button onClick={handleNameSave} disabled={isLoading}>
                  Save
                </Button>
              </div>
            </div>

            {/* Email Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Your email</h2>
                <p className="text-sm text-muted-foreground">
                  Please enter the email address you want to use with your
                  account.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button onClick={handleEmailSave} disabled={isLoading}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
