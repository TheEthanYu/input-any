import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InfoIcon,
  AlertCircle,
  CreditCard,
  Activity,
  Receipt,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Current Plan Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Billing & Subscription</h1>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Update Payment Method
          </Button>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Beta Access</AlertTitle>
          <AlertDescription>
            You are currently on the beta program. We will notify you when the
            paid plans become available.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Your subscription plan and usage details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Beta Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Free during beta period
                </p>
              </div>
              <Button variant="outline" disabled>
                Current Plan
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm font-medium">API Requests</span>
                  </div>
                  <span className="text-sm">1,234 / 5,000</span>
                </div>
                <Progress value={24} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <InfoIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Storage Used</span>
                  </div>
                  <span className="text-sm">2.1 GB / 10 GB</span>
                </div>
                <Progress value={21} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">Billing History</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col divide-y">
              {/* Placeholder billing history items */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Receipt className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Beta Plan - Monthly</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$0.00</p>
                    <Button variant="link" className="text-sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
