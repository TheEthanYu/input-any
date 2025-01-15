import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSEOTags } from '@/lib/seo'
import config from '@/config'

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: '/privacy-policy'
})

const PrivacyPolicy = () => {
  return (
    <div className='container px-4 py-8 mx-auto'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col space-y-8'>
          <div className='flex items-center justify-between'>
            <Button variant='ghost' size='sm' className='gap-2' asChild>
              <Link href='/signin'>
                <ArrowLeft className='h-4 w-4' />
                Back to Sign In
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className='text-3xl font-bold'>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className='prose prose-zinc dark:prose-invert max-w-none'>
              <div className='text-sm text-muted-foreground mb-8'>Last Updated: 2023-08-25</div>

              <p className='lead'>Thank you for visiting {config.appName} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website.</p>

              <div className='text-muted-foreground'>By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use the Website.</div>

              <h2 className='text-xl font-semibold mt-8 mb-4'>1. Information We Collect</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>1.1 Personal Data</h3>
              <p>We collect the following personal information from you:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <strong>Name:</strong> We collect your name to personalize your experience and communicate with you effectively.
                </li>
                <li>
                  <strong>Email:</strong> We collect your email address to send you important information regarding your orders, updates, and communication.
                </li>
                <li>
                  <strong>Payment Information:</strong> We collect payment details to process your orders securely. However, we do not store your payment information on our servers. Payments are processed by trusted third-party payment processors.
                </li>
              </ul>

              <h3 className='text-lg font-medium mt-6 mb-3'>1.2 Non-Personal Data</h3>
              <p>We may use web cookies and similar technologies to collect non-personal information such as your IP address, browser type, device information, and browsing patterns. This information helps us to enhance your browsing experience, analyze trends, and improve our services.</p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>2. Purpose of Data Collection</h2>
              <p>We collect and use your personal data for the sole purpose of order processing. This includes processing your orders, sending order confirmations, providing customer support, and keeping you updated about the status of your orders.</p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>3. Data Sharing</h2>
              <p>We don&apos;t share your personal information with third parties except as required for order processing (e.g., sharing your information with payment processors). We do not sell, trade, or rent your personal information to others.</p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>4. Children&apos;s Privacy</h2>
              <p>{config.appName} is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at the email address provided below.</p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>5. Updates to the Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page, and we may notify you via email about significant changes.</p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>6. Contact Information</h2>
              <p>If you have any questions, concerns, or requests related to this Privacy Policy, you can contact us at:</p>

              <div className='mt-12 p-6 bg-muted rounded-lg'>
                <p className='text-sm text-muted-foreground'>
                  Email:{' '}
                  <a href='mailto:ethan@ethanyu.me' className='font-medium text-primary hover:underline'>
                    ethan@ethanyu.me
                  </a>
                </p>
                <p className='text-sm text-muted-foreground mt-4'>For all other inquiries, please visit our Contact Us page on the Website.</p>
                <p className='text-sm font-medium mt-6'>By using {config.appName}, you consent to the terms of this Privacy Policy.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
