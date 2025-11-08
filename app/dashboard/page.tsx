"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Search } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome, {user?.name}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your lost and found items
              </p>
            </div>

            <Link href="/report">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Report Item
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "My Lost Items",
                value: "3",
                color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100",
              },
              {
                label: "My Found Items",
                value: "1",
                color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100",
              },
              {
                label: "Active Chats",
                value: "5",
                color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100",
              },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-card border border-border rounded-lg backdrop-blur-sm">
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className={`text-3xl font-bold px-3 py-2 rounded w-fit ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { type: "Lost", item: "Black Wallet", time: "2 hours ago" },
                  { type: "Found", item: "Silver Keychain", time: "5 hours ago" },
                  { type: "Lost", item: "Blue Backpack", time: "1 day ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-secondary/50 rounded">
                    <div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded mr-2 ${
                          activity.type === "Lost"
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
                            : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                        }`}
                      >
                        {activity.type}
                      </span>
                      <span className="text-foreground">{activity.item}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-2">

                {/* ✅ FIXED BUTTONS BELOW */}
                <Link href="/report" className="block">
                  <Button
                    variant="outline"
                    className="
                      w-full justify-start text-left
                      bg-[#121415]
                      border border-[#1f2225]
                      text-gray-200
                      hover:bg-[#1a1d21]
                      hover:border-[#2a2e33]
                    "
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Report Item
                  </Button>
                </Link>

                <Link href="/status" className="block">
                  <Button
                    variant="outline"
                    className="
                      w-full justify-start text-left
                      bg-[#121415]
                      border border-[#1f2225]
                      text-gray-200
                      hover:bg-[#1a1d21]
                      hover:border-[#2a2e33]
                    "
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Items
                  </Button>
                </Link>

                <Link href="/chat" className="block">
                  <Button
                    variant="outline"
                    className="
                      w-full justify-start text-left
                      bg-[#121415]
                      border border-[#1f2225]
                      text-gray-200
                      hover:bg-[#1a1d21]
                      hover:border-[#2a2e33]
                    "
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
  