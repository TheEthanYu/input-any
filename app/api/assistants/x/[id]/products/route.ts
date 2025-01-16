import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// PATCH: 更新产品权重
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const json = await request.json()
    const { productId, weight } = json

    // 使用 upsert 来处理新增或更新
    const { error } = await supabase.from('x_assistant_products').upsert({
      assistant_id: params.id,
      product_id: productId,
      weight,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to update product weight' },
      { status: 500 }
    )
  }
}
