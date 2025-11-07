"use client"

import { useState, useRef, useEffect } from "react"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Send, Search, Paperclip, Phone, Video, MoreVertical, CheckCheck } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(0)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "John Doe",
      item: "Black Wallet",
      avatar: "/male-user-avatar.jpg",
      lastMessage: "I can meet tomorrow at the coffee shop",
      timestamp: "2 min ago",
      unread: 2,
      status: "online",
      messages: [
        { id: 1, sender: "John", text: "Hi! I think I found your wallet", time: "10:30 AM", read: true },
        { id: 2, sender: "You", text: "Really?? Where did you find it?", time: "10:32 AM", read: true },
        { id: 3, sender: "John", text: "Near the downtown area, by the parking lot", time: "10:35 AM", read: true },
        { id: 4, sender: "You", text: "That sounds right! How can we meet?", time: "10:37 AM", read: true },
        { id: 5, sender: "John", text: "I can meet tomorrow at the coffee shop", time: "10:40 AM", read: false },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      item: "Silver Keychain",
      avatar: "/female-user-avatar.jpg",
      lastMessage: "Yes, I still have it",
      timestamp: "1 hour ago",
      unread: 0,
      status: "offline",
      messages: [
        { id: 1, sender: "Jane", text: "Hi, do you have keys on your keychain?", time: "9:00 AM", read: true },
        { id: 2, sender: "You", text: "Yes! I lost a silver keychain with my keys", time: "9:05 AM", read: true },
        { id: 3, sender: "Jane", text: "Yes, I still have it", time: "9:10 AM", read: true },
      ],
    },
    {
      id: 3,
      name: "Mike Johnson",
      item: "Blue Backpack",
      avatar: "/male-user-avatar.jpg",
      lastMessage: "I can describe what was inside...",
      timestamp: "5 hours ago",
      unread: 0,
      status: "online",
      messages: [
        { id: 1, sender: "Mike", text: "I found a blue backpack at the train station", time: "5:00 AM", read: true },
        { id: 2, sender: "You", text: "That might be mine! Does it have a laptop?", time: "5:15 AM", read: true },
        { id: 3, sender: "Mike", text: "I can describe what was inside...", time: "5:20 AM", read: true },
      ],
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats[selectedChat]?.messages.length])

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const current = chats[selectedChat]

  const handleSendMessage = () => {
    if (message.trim() && current) {
      const newMessage = {
        id: current.messages.length + 1,
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        read: true,
      }

      setChats((prevChats) =>
        prevChats.map((chat, i) =>
          i === selectedChat
            ? {
                ...chat,
                messages: [...chat.messages, newMessage],
                lastMessage: message,
                timestamp: "now",
              }
            : chat,
        ),
      )

      setMessage("")
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
            <p className="text-muted-foreground">Connect with users about lost and found items</p>
          </div>

          <div className="flex gap-4 h-[600px] bg-card rounded-lg border border-border overflow-hidden">
            {/* Sidebar - Chat List */}
            <div className="w-full md:w-80 border-r border-border flex flex-col bg-card">
              {/* Search */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg border border-input">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat, i) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chats.indexOf(chat))}
                      className={`w-full p-3 text-left border-b border-border hover:bg-secondary/50 transition-colors ${
                        selectedChat === chats.indexOf(chat) ? "bg-primary/10 border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={chat.avatar || "/placeholder.svg"}
                            alt={chat.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                              chat.status === "online" ? "bg-green-500" : "bg-muted"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="font-semibold text-sm text-foreground truncate">{chat.name}</h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-1">{chat.item}</p>
                          <p className="text-xs text-muted-foreground truncate line-clamp-2">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground text-sm">No chats found</div>
                )}
              </div>
            </div>

            {/* Chat Area - Desktop View */}
            <div className="hidden md:flex flex-1 flex-col bg-background/50">
              {current ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={current.avatar || "/placeholder.svg"}
                          alt={current.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                            current.status === "online" ? "bg-green-500" : "bg-muted"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{current.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {current.item}
                          {current.status === "online" && <span className="text-green-500">• Online</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="px-2">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Link href={`/item/${current.id}`}>
                        <Button variant="outline" size="sm">
                          View Item
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="px-2">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages Area */}
<div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
  {current.messages.map((msg) => (
    <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          msg.sender === "You"
            ? "bg-primary text-black"       // changed here
            : "bg-secondary text-black"     // changed here
        }`}
      >
        <p className="text-sm text-black">{msg.text}</p>  {/* force black */}
        <div className="flex items-center gap-1 mt-1 text-xs opacity-70 text-black">
          {/* force timestamp to black */}
          <span>{msg.time}</span>
          {msg.sender === "You" && msg.read && (
            <CheckCheck className="w-3 h-3 text-black" /> // changed here
          )}
        </div>
      </div>
    </div>
  ))}

  {isTyping && (
    <div className="flex justify-start">
      <div className="bg-secondary text-black px-4 py-2 rounded-lg">   {/* changed here */}
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-black rounded-full animate-pulse animation-delay-100" />
          <div className="w-2 h-2 bg-black rounded-full animate-pulse animation-delay-200" />
        </div>
      </div>
    </div>
  )}

  <div ref={messagesEndRef} />
</div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="px-2">
                        <Paperclip className="w-5 h-5 text-muted-foreground" />
                      </Button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleSendMessage()
                        }}
                        className="flex-1 px-3 py-2 border border-input rounded-lg bg-background outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground text-sm"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-3"
                        size="sm"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Select a chat to start messaging
                </div>
              )}
            </div>

            {/* Mobile View Notice */}
            <div className="md:hidden flex-1 flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
              {current ? (
                <>
                  <h3 className="font-semibold text-foreground mb-2">{current.name}</h3>
                  <p className="text-sm mb-6">{current.item}</p>
                  <div className="space-y-2 w-full max-h-[300px] overflow-y-auto mb-4">
                    {current.messages.slice(-5).map((msg) => (
                      <div key={msg.id} className="text-xs text-left p-2 bg-secondary/50 rounded">
                        <span className="font-semibold">{msg.sender}:</span> {msg.text}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs">Use desktop view for full chat experience</p>
                </>
              ) : (
                <p className="text-sm">Select a chat to continue</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
