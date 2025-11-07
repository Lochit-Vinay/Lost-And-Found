  "use client"
  import { useState, useEffect } from "react"
  import Link from "next/link"
  import { Button } from "@/components/ui/button"
  import Navigation from "@/components/navigation"
  import { Package, MessageSquare, Users, ArrowRight } from "lucide-react"
  import Image from "next/image"

  export default function HomePage() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeFeature, setActiveFeature] = useState(0)

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const features = [
      {
        title: "Smart Matching",
        description: "AI-powered matching algorithm connects lost items with found ones",
        icon: Package,
      },
      {
        title: "Real-time Chat",
        description: "Communicate directly with finders or those who lost items",
        icon: MessageSquare,
      },
      {
        title: "Community Driven",
        description: "Join thousands of users helping reunite belongings",
        icon: Users,
      },
    ]

    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Never Lose What Matters
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Connect with others in your community. Report lost items, find belongings, and reunite possessions with
                their owners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/report">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  >
                    Report Lost Item
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/status">
  <Button
    size="lg"
    variant="outline"
    className="w-full sm:w-auto border-2 border-accent text-accent
               hover:bg-accent hover:text-white font-semibold
               shadow-lg hover:shadow-accent/40 transition-all bg-transparent"
  >
    Browse Found Items
    <ArrowRight className="w-4 h-4 ml-2" />
  </Button>
</Link>

              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
              {[
                { label: "Items Recovered", value: "2,547", color: "from-primary to-secondary" },
                { label: "Active Users", value: "15,000+", color: "from-secondary to-accent" },
                { label: "Success Rate", value: "94%", color: "from-accent to-primary" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-lg bg-gradient-to-br ${stat.color} opacity-90 hover:opacity-100 transition-all border-2 border-${stat.color.split(" ")[1]} shadow-lg hover:shadow-2xl hover:scale-105 text-center backdrop-blur-sm`}
                >
                  <div className="text-5xl font-bold text-white drop-shadow-lg">{stat.value}</div>
                  <div className="text-base font-bold mt-3 text-white drop-shadow-md">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon
                const colors = ["from-primary", "from-secondary", "from-accent"]
                return (
                  <div
  key={i}
  className={`p-6 rounded-lg bg-gradient-to-br ${colors[i]}/10 
  border border-accent/40
  hover:border-accent 
  hover:shadow-[0_0_15px_var(--accent)]
  transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105`}
  onMouseEnter={() => setActiveFeature(i)}
>
  <div
    className={`w-12 h-12 bg-gradient-to-br ${colors[i]} to-accent rounded-lg flex items-center justify-center mb-4 shadow-lg`}
  >
    <Icon className="w-6 h-6 text-white" />
  </div>

  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
  <p className="text-muted-foreground text-sm">{feature.description}</p>
</div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Status Preview Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Recent Activity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { type: "Lost", item: "Black Wallet", location: "Downtown Area", match: "87%", color: "from-red-500" },
                {
                  type: "Found",
                  item: "Silver Keychain",
                  location: "Central Park",
                  match: "92%",
                  color: "from-green-500",
                },
                { type: "Lost", item: "Blue Backpack", location: "Train Station", match: "78%", color: "from-blue-500" },
                {
                  type: "Found",
                  item: "Red Umbrella",
                  location: "Shopping Mall",
                  match: "95%",
                  color: "from-orange-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg bg-gradient-to-br ${item.color}/10 border border-${item.color.split("-")[1]}-200 flex items-center justify-between hover:shadow-lg transition-all hover:scale-105`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${item.type === "Lost" ? "from-red-500 to-red-600" : "from-green-500 to-green-600"} text-white shadow-md`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="font-bold text-foreground">{item.item}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.match}
                    </div>
                    <p className="text-xs text-muted-foreground">match</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary via-secondary to-accent/30 rounded-2xl p-12 border border-secondary/50 shadow-2xl hover:shadow-3xl transition-all">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Find Your Lost Items?</h2>
            <p className="text-black mb-6">Join our community today and increase your chances of recovery.</p>
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-secondary/30 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Image src="/logo.png" alt="Lost & Found Logo" width={40} height={40} className="rounded-full" />
                  <h4 className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    LostFound
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">Reuniting belongings with their owners.</p>
              </div>
              {[
                { title: "Product", links: ["Features", "Pricing", "Security"] },
                { title: "Company", links: ["About", "Blog", "Careers"] },
                { title: "Legal", links: ["Privacy", "Terms", "Contact"] },
              ].map((col, i) => (
                <div key={i}>
                  <h4 className="font-bold mb-4 text-foreground">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-secondary/30 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">© 2025 LostFound. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
