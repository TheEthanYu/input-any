import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function GET(request: Request) {
  if (
    process.env.NODE_ENV === 'production' &&
    !request.headers.get('user-agent')
  ) {
    return NextResponse.json({ success: true, message: 'Skipped during build' })
  }

  try {
    const result = await resend.emails.send({
      from: 'ShipOneDay <no-reply@shipone.day>',
      to: '13217660808@163.com',
      subject: 'Test Email',
      html: '<h1>This is a test email</h1>',
    })

    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error('Email send error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message || 'Unknown error',
          code: error.code || 'UNKNOWN',
          statusCode: error.statusCode || 500,
        },
      },
      { status: 500 }
    )
  }
}
