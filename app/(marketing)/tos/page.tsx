import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSEOTags } from '@/lib/seo'
import config from '@/config'

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: '/tos'
})

const TOS = () => {
  return (
    <main className='container max-w-4xl mx-auto py-6 px-4'>
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
            <CardTitle className='text-3xl font-bold'>Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className='prose prose-zinc dark:prose-invert max-w-none'>
            <div className='text-sm text-muted-foreground mb-8'>Last Updated: September 26, 2023</div>

            <p className='lead'>
              Welcome to {config.appName}! These Terms of Service (&quot;Terms&quot;) govern your use of the {config.appName} website and the services we provide. By using our Website and services, you agree to these Terms.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-4'>1. Description of {config.appName}</h2>
            <p>{config.appName} is a platform that offers a JavaScript code boilerplate to assist entrepreneurs in launching their startups more efficiently.</p>

            <h2 className='text-xl font-semibold mt-8 mb-4'>2. Ownership and Usage Rights</h2>
            <p>When you purchase a package from {config.appName}, you gain the right to download and use the code provided for creating applications. You own the code you create but do not have the right to resell it. We offer a full refund within 7 days of purchase, as specified in our refund policy.</p>

            <h2 className='text-xl font-semibold mt-8 mb-4'>3. User Data and Privacy</h2>
            <p>
              We collect and store user data, including name, email, and payment information, as necessary to provide our services. For details on how we handle your data, please refer to our{' '}
              <Link href='/privacy-policy' className='font-medium text-primary hover:underline'>
                Privacy Policy
              </Link>
              .
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-4'>4. Non-Personal Data Collection</h2>
            <p>We use web cookies to collect non-personal data for the purpose of improving our services and user experience.</p>

            <h2 className='text-xl font-semibold mt-8 mb-4'>5. Governing Law</h2>
            <p>These Terms are governed by the laws of France.</p>

            <h2 className='text-xl font-semibold mt-8 mb-4'>6. Updates to the Terms</h2>
            <p>We may update these Terms from time to time. Users will be notified of any changes via email.</p>

            <div className='mt-12 p-6 bg-muted rounded-lg'>
              <p className='text-sm text-muted-foreground'>
                For any questions or concerns regarding these Terms of Service, please contact us at{' '}
                <a href='mailto:ethan@ethanyu.me' className='font-medium text-primary hover:underline'>
                  ethan@ethanyu.me
                </a>
              </p>
              <p className='text-sm font-medium mt-4'>Thank you for using {config.appName} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default TOS
