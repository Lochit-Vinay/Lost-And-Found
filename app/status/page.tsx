"use client"

import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Clock, Zap, X, Heart, Share2, MessageCircle } from "lucide-react"
import Link from "next/link"

const mockItems = [
  {
    id: 1,
    type: "Lost",
    title: "Black Leather Wallet",
    description: "Bifold wallet with multiple card slots, contains family photos",
    location: "Downtown Area",
    date: "2 days ago",
    category: "Accessories",
    condition: "Good",
    image: "/black-leather-wallet.jpg",
    color: "Black",
    brand: "Coach",
    size: "Standard",
    matchScore: 87,
    liked: false,
  },
  {
    id: 2,
    type: "Found",
    title: "Dark Wallet",
    description: "Leather wallet found near main street, excellent condition",
    location: "Main Street",
    date: "1 day ago",
    category: "Accessories",
    condition: "Excellent",
    image: "/dark-leather-wallet.jpg",
    color: "Brown",
    brand: "Generic",
    size: "Standard",
    matchScore: 82,
    liked: false,
  },
  {
    id: 3,
    type: "Lost",
    title: "Blue Backpack",
    description: "North Face backpack with laptop compartment, important documents inside",
    location: "Train Station",
    date: "5 days ago",
    category: "Bags",
    condition: "Good",
    image: "/blue-north-face-backpack.jpg",
    color: "Blue",
    brand: "The North Face",
    size: "Large",
    matchScore: 0,
    liked: false,
  },
  {
    id: 4,
    type: "Found",
    title: "Navy Backpack",
    description: "Large backpack with side pockets found at train station",
    location: "Train Station",
    date: "3 days ago",
    category: "Bags",
    condition: "Good",
    image: "/navy-backpack.jpg",
    color: "Navy",
    brand: "Unknown",
    size: "Large",
    matchScore: 0,
    liked: false,
  },
  {
    id: 5,
    type: "Lost",
    title: "Silver Watch",
    description: "Apple Watch Series 7 with sport band, last seen at mall",
    location: "Shopping Mall",
    date: "1 week ago",
    category: "Electronics",
    condition: "Excellent",
    image: "/apple-watch-silver.jpg",
    color: "Silver",
    brand: "Apple",
    size: "42mm",
    matchScore: 0,
    liked: false,
  },
  {
    id: 6,
    type: "Found",
    title: "Smartwatch",
    description: "Silver smartwatch found in mall food court, working condition",
    location: "Shopping Mall",
    date: "4 days ago",
    category: "Electronics",
    condition: "Excellent",
    image: "/silver-smartwatch.jpg",
    color: "Silver",
    brand: "Apple",
    size: "42mm",
    matchScore: 91,
    liked: false,
  },
]

export default function StatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterCategory, setFilterCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())

  const categories = ["All", "Accessories", "Bags", "Electronics", "Clothing", "Other"]

  const calculateMatch = (item1: any, item2: any): number => {
    let score = 0
    if (item1.category === item2.category) score += 40
    if (item1.location === item2.location) score += 30
    if (
      item1.color.toLowerCase().includes(item2.color.toLowerCase()) ||
      item2.color.toLowerCase().includes(item1.color.toLowerCase())
    ) {
      score += 20
    }
    if (item1.condition === item2.condition) score += 10
    return Math.min(score, 100)
  }

  const itemsWithMatches = useMemo(() => {
    const lost = mockItems.filter((item) => item.type === "Lost")
    const found = mockItems.filter((item) => item.type === "Found")

    return mockItems.map((item) => {
      if (item.type === "Lost") {
        const bestMatch = found.reduce(
          (best, f) => {
            const score = calculateMatch(item, f)
            return score > best.score ? { item: f, score } : best
          },
          { item: null as any, score: 0 },
        )
        return {
          ...item,
          matchScore: bestMatch.score,
          matchWith: bestMatch.item?.id,
          matchItem: bestMatch.item,
        }
      } else if (item.type === "Found") {
        const bestMatch = lost.reduce(
          (best, l) => {
            const score = calculateMatch(item, l)
            return score > best.score ? { item: l, score } : best
          },
          { item: null as any, score: 0 },
        )
        return {
          ...item,
          matchScore: bestMatch.score,
          matchWith: bestMatch.item?.id,
          matchItem: bestMatch.item,
        }
      }
      return item
    })
  }, [])

  const filteredItems = useMemo(() => {
    return itemsWithMatches.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "All" || item.type === filterType
      const matchesCategory = filterCategory === "All" || item.category === filterCategory

      return matchesSearch && matchesType && matchesCategory
    })
  }, [searchTerm, filterType, filterCategory, itemsWithMatches])

  const highMatchItems = filteredItems.filter((item) => item.matchScore > 75)
  const otherItems = filteredItems.filter((item) => item.matchScore <= 75)

  const selectedItemData = selectedItem ? itemsWithMatches.find((item) => item.id === selectedItem) : null

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <VantaBackground /> */}
      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Browse Lost & Found Items</h1>
            <p className="text-muted-foreground">AI-powered matching helps you find your belongings faster</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 bg-card border border-border rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-3 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search items, locations, descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Lost", "Found"].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className={filterType === type ? "bg-primary text-primary-foreground" : "bg-transparent"}
                >
                  {type}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 ml-4">
              {categories.slice(0, 3).map((cat) => (
                <Button
                  key={cat}
                  variant={filterCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(cat)}
                  className={filterCategory === cat ? "bg-accent text-accent-foreground" : "bg-transparent"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {highMatchItems.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-bold text-foreground">Possible Matches</h2>
                <Badge variant="secondary">{highMatchItems.length} found</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highMatchItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isHighMatch={true}
                    isLiked={likedItems.has(item.id)}
                    onLike={() => toggleLike(item.id)}
                    onSelect={() => setSelectedItem(item.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other Items */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">All Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherItems.length > 0 ? (
                otherItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isHighMatch={false}
                    isLiked={likedItems.has(item.id)}
                    onLike={() => toggleLike(item.id)}
                    onSelect={() => setSelectedItem(item.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No items found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedItemData && <ItemDetailModal item={selectedItemData} onClose={() => setSelectedItem(null)} />}
    </div>
  )
}

function ItemCard({
  item,
  isHighMatch,
  isLiked,
  onLike,
  onSelect,
}: {
  item: any
  isHighMatch: boolean
  isLiked: boolean
  onLike: () => void
  onSelect: () => void
}) {
  return (
    <div
      className={`relative bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 backdrop-blur-sm ${
        isHighMatch ? "border-accent/50 ring-1 ring-accent/20" : "border-border"
      }`}
    >
      {/* Match Badge */}
      {item.matchScore > 0 && (
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold z-10">
          {item.matchScore}% match
        </div>
      )}

      {/* Type Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            item.type === "Lost"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
          }`}
        >
          {item.type}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-40 bg-secondary/50 overflow-hidden">
        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-1 text-balance line-clamp-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{item.date}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {item.condition}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onSelect}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            View Details
          </Button>
          <Button onClick={onLike} variant="outline" size="sm" className="px-3 bg-transparent">
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ItemDetailModal({ item, onClose }: { item: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-card/80">
          <h2 className="text-lg font-bold text-foreground">Item Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full max-w-sm h-80 object-cover rounded-lg"
            />
          </div>

          {/* Basic Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{item.title}</h1>
                <div className="flex gap-2">
                  <Badge
                    className={
                      item.type === "Lost"
                        ? "bg-red-100 text-red-700 dark:bg-red-900"
                        : "bg-green-100 text-green-700 dark:bg-green-900"
                    }
                  >
                    {item.type}
                  </Badge>
                  {item.matchScore > 0 && (
                    <Badge className="bg-accent text-accent-foreground">{item.matchScore}% Match</Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">{item.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {item.location}
              </p>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {item.date}
              </p>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <p className="font-semibold text-foreground">{item.category}</p>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Condition</p>
              <p className="font-semibold text-foreground">{item.condition}</p>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Color</p>
              <p className="font-semibold text-foreground">{item.color}</p>
            </div>
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Brand</p>
              <p className="font-semibold text-foreground">{item.brand}</p>
            </div>
          </div>

          {/* Match Info */}
          {item.matchWith && item.matchScore > 0 && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Potential Match
              </h3>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">This item has a {item.matchScore}% match with:</p>
                <p className="font-semibold text-foreground mb-4">{item.matchItem?.title}</p>
                <Link href={`/item/${item.matchWith}`}>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">View Matched Item</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-border pt-6 flex gap-3">
            <Link href="/chat" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Owner
              </Button>
            </Link>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
