'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+15.2%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Active Subscriptions',
    value: '1,250',
    change: '-2.3%',
    trend: 'down',
    icon: CreditCard,
  },
  {
    title: 'API Requests',
    value: '45.2M',
    change: '+12.5%',
    trend: 'up',
    icon: Activity,
  },
]

const recentActivity = [
  {
    user: 'John Doe',
    action: 'Upgraded to Pro Plan',
    time: '2 minutes ago',
    amount: '$29.00',
  },
  {
    user: 'Alice Smith',
    action: 'New API Key Generated',
    time: '15 minutes ago',
    amount: null,
  },
  {
    user: 'Bob Johnson',
    action: 'Cancelled Subscription',
    time: '1 hour ago',
    amount: '-$49.00',
  },
  {
    user: 'Emma Wilson',
    action: 'Added Team Member',
    time: '2 hours ago',
    amount: null,
  },
  {
    user: 'Michael Brown',
    action: 'Increased Usage Limit',
    time: '3 hours ago',
    amount: '$19.00',
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-foreground/75">
            Your business metrics and recent activities.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => {
          const Icon = stat.icon
          const isPositive = stat.trend === 'up'
          const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight

          return (
            <Card key={stat.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="rounded-full bg-muted/50 p-2">
                  <Icon className="h-4 w-4 text-foreground/75" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 flex items-center text-xs">
                  <TrendIcon
                    className={
                      'mr-1 h-4 w-4 ' +
                      (isPositive ? 'text-emerald-500' : 'text-rose-500')
                    }
                  />
                  <span
                    className={
                      isPositive ? 'text-emerald-500' : 'text-rose-500'
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1 text-foreground/75">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-foreground/75"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map(activity => (
                <TableRow key={activity.time}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell className="flex items-center gap-1 text-foreground/75">
                    <Clock className="h-3.5 w-3.5" />
                    {activity.time}
                  </TableCell>
                  <TableCell
                    className={
                      'text-right ' +
                      (activity.amount?.startsWith('-')
                        ? 'text-rose-500'
                        : activity.amount
                        ? 'text-emerald-500'
                        : '')
                    }
                  >
                    {activity.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
