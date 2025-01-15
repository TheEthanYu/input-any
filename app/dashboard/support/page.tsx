import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'

const faqs = [
  {
    question: 'How do I change my subscription plan?',
    answer:
      'You can easily change your subscription plan in the Billing settings. Navigate to Dashboard > Billing to view all available plans and select the one that best suits your needs. Changes will take effect in the next billing cycle.',
  },
  {
    question: 'How do I manage team members?',
    answer:
      'Go to Dashboard > Settings > Team to manage your team members. Click the "Invite Member" button to send invitations, or use the options menu next to each member to remove them. Removed members will immediately lose access to the workspace.',
  },
  {
    question: 'How do I get API keys?',
    answer:
      'Visit Dashboard > Settings > API Keys to manage your API keys. You can create new keys, view existing ones, or revoke keys you no longer need. Remember to keep your keys secure and never share them with others.',
  },
  {
    question: 'How can I export my data?',
    answer:
      'You can export your data from Dashboard > Settings > Data Export. We support multiple formats (CSV, JSON), and you can select specific date ranges for export. Export requests are processed in the background, and you&apos;ll be notified via email when complete.',
  },
  {
    question: 'Where can I find my billing history and invoices?',
    answer:
      'All billing records and invoices are available in Dashboard > Billing > History. You can view past payments, download invoices, or update your payment method. Monthly invoices are automatically sent to your email.',
  },
  {
    question: 'How do I secure my account?',
    answer:
      'We strongly recommend enabling Two-Factor Authentication (2FA) in Dashboard > Settings > Security. Additionally, use strong passwords, change them regularly, and avoid staying logged in on untrusted devices.',
  },
]

export default function SupportPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Support Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Find answers to common questions about using our product. Can&apos;t
            find what you&apos;re looking for? Contact our support team.
          </p>
        </div>

        <Card className="border-none shadow-none">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Have more questions?{' '}
            <a
              href="mailto:support@example.com"
              className="font-medium text-primary hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
