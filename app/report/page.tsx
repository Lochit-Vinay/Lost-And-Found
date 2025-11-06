"use client"

import type React from "react"

import { useState, useRef } from "react"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Upload, MapPin, Calendar, Type, FileText, ArrowRight } from "lucide-react"

export default function ReportPage() {
  const [reportType, setReportType] = useState<"lost" | "found">("lost")
  const [image, setImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    date: "",
    category: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Report submitted:", { reportType, ...formData, image })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* removed VantaBackground component */}
      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Report an Item</h1>
            <p className="text-muted-foreground">Help others find their belongings or report what you've found</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Report Type */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">What are you reporting?</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "lost", label: "Lost Item", desc: "I lost something" },
                      { value: "found", label: "Found Item", desc: "I found something" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setReportType(option.value as "lost" | "found")}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          reportType === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <h4 className="font-semibold text-foreground">{option.label}</h4>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Item Image</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    {image ? (
                      <div className="space-y-2">
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Preview"
                          className="w-24 h-24 mx-auto object-cover rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="font-medium text-foreground">Drop image here or click to upload</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Item Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Item Name</label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                    <Type className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="itemName"
                      placeholder="e.g., Black Leather Wallet"
                      value={formData.itemName}
                      onChange={handleChange}
                      className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background/50 outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="bags">Bags & Luggage</option>
                    <option value="documents">Documents</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                  <div className="flex items-start gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                    <FileText className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <textarea
                      name="description"
                      placeholder="Describe the item, its condition, any unique marks or features..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm resize-none"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., Downtown Shopping Mall"
                      value={formData.location}
                      onChange={handleChange}
                      className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Date {reportType === "lost" ? "Lost" : "Found"}
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="flex-1 bg-transparent border-0 outline-none text-foreground text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                  Submit Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>

            {/* Tips Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Tips for Better Match</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">1</span>
                    <span>Upload a clear, well-lit photo of the item</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">2</span>
                    <span>Include specific details and unique characteristics</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">3</span>
                    <span>Provide accurate location information</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">4</span>
                    <span>Be as precise as possible with the date</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">How Matching Works</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes item descriptions, images, locations, and dates to find the best matches. The higher
                  the percentage, the more likely it's a match.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Privacy & Safety</h3>
                <p className="text-sm text-muted-foreground">
                  Your personal information is protected. Chat before meeting anyone, and always verify the item before
                  exchanging contact details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
