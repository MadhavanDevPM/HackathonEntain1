"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Database, Sparkles, Copy, Download, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function NL2SQLChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    maxSteps: 3,
  })

  const sampleQuestions = [
    "Provide me a trend of DAU for the previous month",
    "What are the top 5 most popular game suppliers in the UK market?",
    "What was the biggest jackpot wins yesterday?",
  ]

  const handleNewChat = () => {
    setMessages([])
    setIsChatOpen(false)
  }

  // MoM comparison data
  const momData = [
    {
      month: "June 2025",
      ngr: 1000000,
      ngrFormatted: "£1,000,000",
    },
    {
      month: "July 2025",
      ngr: 1250000,
      ngrFormatted: "£1,250,000",
    },
  ]

  // DAU trend data for June 2025
  const dauData = [
    { date: "2025-06-01", dau: 115000 },
    { date: "2025-06-02", dau: 101000 },
    { date: "2025-06-03", dau: 137000 },
    { date: "2025-06-04", dau: 147000 },
    { date: "2025-06-05", dau: 111000 },
    { date: "2025-06-06", dau: 107000 },
    { date: "2025-06-07", dau: 117000 },
    { date: "2025-06-08", dau: 136000 },
    { date: "2025-06-09", dau: 122000 },
    { date: "2025-06-10", dau: 149000 },
    { date: "2025-06-11", dau: 145000 },
    { date: "2025-06-12", dau: 116000 },
    { date: "2025-06-13", dau: 102000 },
    { date: "2025-06-14", dau: 142000 },
    { date: "2025-06-15", dau: 103000 },
    { date: "2025-06-16", dau: 105000 },
    { date: "2025-06-17", dau: 137000 },
    { date: "2025-06-18", dau: 139000 },
    { date: "2025-06-19", dau: 117000 },
    { date: "2025-06-20", dau: 119000 },
    { date: "2025-06-21", dau: 107000 },
    { date: "2025-06-22", dau: 129000 },
    { date: "2025-06-23", dau: 127000 },
    { date: "2025-06-24", dau: 142000 },
    { date: "2025-06-25", dau: 125000 },
    { date: "2025-06-26", dau: 119000 },
    { date: "2025-06-27", dau: 118000 },
    { date: "2025-06-28", dau: 103000 },
    { date: "2025-06-29", dau: 100000 },
    { date: "2025-06-30", dau: 100000 },
  ]

  const percentageChange = (((1250000 - 1000000) / 1000000) * 100).toFixed(1)

  const [showIntro, setShowIntro] = useState(true)
  const [currentIntroScreen, setCurrentIntroScreen] = useState(0)

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        if (currentIntroScreen < 2) {
          setCurrentIntroScreen(currentIntroScreen + 1)
        } else {
          setShowIntro(false)
        }
      }, 10000) // Changed from 20000 to 10000 (10 seconds per screen)

      return () => clearTimeout(timer)
    }
  }, [showIntro, currentIntroScreen])

  const handleDotClick = (index: number) => {
    if (index === 2 && currentIntroScreen === 2) {
      // If clicking on the last dot while on the last screen, go to main app
      setShowIntro(false)
    } else {
      setCurrentIntroScreen(index)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onNewChat={handleNewChat} />
      <SidebarInset className="flex-1">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full">
          {/* Main Content - Intro Screens or Start Screen */}
          {showIntro ? (
            <div className="flex items-center justify-center min-h-screen w-full">
              <div className="text-center max-w-2xl mx-auto px-8 w-full">
                {/* Instagram Reel Style Container */}
                <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 rounded-3xl p-8 shadow-2xl border border-purple-500/20">
                  {currentIntroScreen === 0 && (
                    <div className="space-y-6">
                      <h1 className="text-4xl font-bold text-white mb-6">What problem are we solving for?</h1>
                      <div className="text-lg text-gray-200 leading-relaxed space-y-4">
                        <p>
                          Employees don't have easy access to data and research. It can take them a long time to find
                          the answers they want.
                        </p>
                        <p>
                          They either have to ask a BI analyst to create a dashboard or do it themselves in Sigma which
                          can still take a little while and the required data isn't always available.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentIntroScreen === 1 && (
                    <div className="space-y-6">
                      <h1 className="text-4xl font-bold text-white mb-6">Our Solution</h1>
                      <div className="text-lg text-gray-200 leading-relaxed">
                        <p>
                          Provide a Natural Language to SQL (NL2SQL) chatbot, which can sit on top of your data
                          warehouse or reporting layer and allow business users, analysts, or product managers to query
                          key metrics using plain English.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentIntroScreen === 2 && (
                    <div className="space-y-6">
                      <h1 className="text-4xl font-bold text-white mb-6">Benefits</h1>
                      <div className="text-left space-y-6">
                        <div className="space-y-3">
                          <div className="text-lg text-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">🔹</span>
                              <span className="font-semibold">Empowers employees with data</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">🔹</span>
                              <span className="font-semibold">Speeds up decision making</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">🔹</span>
                              <span className="font-semibold">Reduces manual-effort</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">🔹</span>
                              <span className="font-semibold">Reduces development cycle-time</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🔹</span>
                              <span className="font-semibold">Democratizes data-access</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-purple-300">For Our Colleagues</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                              <div className="flex items-start gap-2">
                                <span className="text-purple-400">🔹</span>
                                <span>Reduces manual effort for analysts</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-purple-400">🔹</span>
                                <span>Enhances self-sufficiency of all teams</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-purple-400">🔹</span>
                                <span>Simplifies access to trusted, real-time data</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-blue-300">For the Business</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                              <div className="flex items-start gap-2">
                                <span className="text-blue-400">🔹</span>
                                <span>Speeds up insight-to-decision cycle</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-blue-400">🔹</span>
                                <span>Reduces inefficiencies and delays</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-blue-400">🔹</span>
                                <span>Boosts scalability — more insights, fewer people</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress Dots - Now clickable */}
                  <div className="flex justify-center gap-2 mt-8">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-colors cursor-pointer hover:scale-110 transform ${
                          index === currentIntroScreen ? "bg-purple-400" : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Skip Button */}
                  <button
                    onClick={() => setShowIntro(false)}
                    className="mt-6 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Skip Introduction →
                  </button>
                </div>
              </div>
            </div>
          ) : messages.length === 0 ? (
            // Keep existing start screen content...
            <div className="flex items-center justify-center min-h-screen w-full">
              <div className="text-center max-w-4xl mx-auto px-12 w-full">
                {/* Header with Sidebar Trigger */}
                <div className="flex items-start justify-start mb-8 w-full pl-4">
                  <SidebarTrigger className="text-white hover:bg-gray-800" />
                </div>

                {/* DataGenie Logo and Title */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="relative">
                      <Sparkles className="h-16 w-16 text-purple-400 animate-pulse" />
                      <div className="absolute -top-1 -right-1">
                        <Database className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    DataGenie
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Your magical AI assistant for data insights. Ask questions about your data in plain English, and
                    I'll conjure up SQL queries with beautiful visualizations.
                  </p>
                </div>

                {/* Call to Action with Search Box */}
                <div className="text-center w-full">
                  <p className="text-gray-400 mb-6">Ready to unlock your data's potential?</p>

                  {/* Sample Questions - Above Search Box */}
                  <div className="mb-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      {sampleQuestions.map((question, index) => (
                        <Card
                          key={index}
                          className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-colors cursor-pointer"
                          onClick={() => {
                            const syntheticEvent = {
                              preventDefault: () => {},
                              target: { value: question },
                            } as any
                            handleInputChange(syntheticEvent)

                            // Auto-submit the form after setting the input
                            setTimeout(() => {
                              handleSubmit(new Event("submit") as any)
                            }, 100)
                          }}
                        >
                          <CardContent className="p-4">
                            <p className="text-gray-300 text-sm text-left leading-relaxed">
                              {question.length > 60 ? question.substring(0, 60) + "..." : question}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Search Box */}
                  <div className="max-w-2xl mx-auto">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bh5VdGKJAfDqKy7N14oY2YL5N9kguR.png"
                            alt="DataGenie"
                            className="w-12 h-12 object-contain"
                          />
                          <h2 className="text-xl font-semibold text-white">Ask DataGenie</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask me about your data... (e.g., 'What are our top customers by revenue?')"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 text-lg p-4"
                            disabled={isLoading}
                          />
                          <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-purple-600 hover:bg-purple-700 w-full"
                          >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Ask DataGenie
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Chat Interface - Added more padding from sidebar
            <div className="w-full h-full pl-8">
              <div className="max-w-4xl mx-auto p-8 w-full">
                {/* Chat Header */}
                <div className="flex items-center gap-3 mb-6">
                  <SidebarTrigger className="text-white hover:bg-gray-800" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMessages([])
                      setIsChatOpen(false)
                    }}
                    className="text-white hover:bg-gray-800 flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                  <Sparkles className="h-8 w-8 text-purple-400" />
                  <h1 className="text-2xl font-bold text-white">DataGenie</h1>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6 w-full">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} w-full`}
                    >
                      <Card
                        className={`max-w-3xl ${message.role === "user" ? "bg-blue-600 text-white border-blue-500" : "bg-gray-800 border-gray-700 text-white"}`}
                      >
                        <CardContent className="p-4">
                          {message.role === "user" ? (
                            <div className="text-right">
                              <span>{message.content}</span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {message.content.includes("Label: Ladbrokes") ||
                              message.content.includes("Market: UK") ||
                              message.content.includes("NGR: £1,000,000") ||
                              (message.content.toLowerCase().includes("ngr") &&
                                message.content.toLowerCase().includes("ladbrokes")) ? (
                                <div className="space-y-2 text-gray-200">
                                  <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-I8L3LkVT7fZ9G8k0Go9j8ED8hd2fty.png"
                                    alt="Ladbrokes NGR Data"
                                    className="w-full h-auto"
                                  />
                                </div>
                              ) : message.content.toLowerCase().includes("jackpot") &&
                                message.content.toLowerCase().includes("wins") ? (
                                // Keep existing jackpot wins response...
                                <div className="text-gray-200">
                                  <h3 className="text-lg font-semibold mb-4 text-white">Jackpot Wins Data</h3>

                                  {/* Jackpot Wins Table Image */}
                                  <div className="bg-white p-4 rounded-lg mb-4 relative group">
                                    <img
                                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m568juFn1kvclUIpabUQOAM1mgFxW2.png"
                                      alt="Jackpot Wins Data Table"
                                      className="w-full h-auto"
                                      id="jackpot-table-image"
                                    />

                                    {/* Export Button */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={async () => {
                                          try {
                                            const img = document.getElementById(
                                              "jackpot-table-image",
                                            ) as HTMLImageElement
                                            const canvas = document.createElement("canvas")
                                            const ctx = canvas.getContext("2d")

                                            canvas.width = img.naturalWidth
                                            canvas.height = img.naturalHeight

                                            if (ctx) {
                                              ctx.drawImage(img, 0, 0)
                                              canvas.toBlob(async (blob) => {
                                                if (blob) {
                                                  await navigator.clipboard.write([
                                                    new ClipboardItem({ "image/png": blob }),
                                                  ])
                                                  console.log("Table copied to clipboard")
                                                }
                                              })
                                            }
                                          } catch (err) {
                                            console.error("Failed to copy table:", err)
                                          }
                                        }}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={() => {
                                          const jackpotData = [
                                            { jackpot_name: "Jackpot Blitz", win_amount: "934324.73", label: "Gala" },
                                            { jackpot_name: "The Big One", win_amount: "643012.43", label: "Coral" },
                                            { jackpot_name: "Age of Gods", win_amount: "920278.6", label: "Ladbrokes" },
                                            {
                                              jackpot_name: "The Big One",
                                              win_amount: "531969.28",
                                              label: "Ladbrokes",
                                            },
                                            {
                                              jackpot_name: "Jackpot Blitz",
                                              win_amount: "670715.7",
                                              label: "Ladbrokes",
                                            },
                                            {
                                              jackpot_name: "The Big One",
                                              win_amount: "652908.72",
                                              label: "Ladbrokes",
                                            },
                                          ]

                                          const csvContent =
                                            "Jackpot Name,Win Amount,Label\n" +
                                            jackpotData
                                              .map((item) => `${item.jackpot_name},${item.win_amount},${item.label}`)
                                              .join("\n")

                                          const blob = new Blob([csvContent], { type: "text/csv" })
                                          const url = window.URL.createObjectURL(blob)
                                          const link = document.createElement("a")
                                          link.href = url
                                          link.download = "jackpot-wins-data.csv"
                                          document.body.appendChild(link)
                                          link.click()
                                          document.body.removeChild(link)
                                          window.URL.revokeObjectURL(url)
                                        }}
                                      >
                                        <Download className="h-4 w-4 mr-2" />
                                        Export CSV
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ) : message.content === "GGR_ANALYSIS_CHART" ? (
                                // Keep existing GGR chart response...
                                <div className="text-gray-200">
                                  <h3 className="text-lg font-semibold mb-4 text-white">
                                    Average GGR by Number of Games Played
                                  </h3>

                                  {/* GGR Chart Image */}
                                  <div className="bg-white p-4 rounded-lg mb-4 relative group">
                                    <img
                                      src="/images/ggr-chart-new.png"
                                      alt="Average GGR by Number of Games Played"
                                      className="w-full h-auto"
                                      id="ggr-chart-image"
                                    />

                                    {/* Chart Actions - Copy and Download */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={async () => {
                                          try {
                                            const img = document.getElementById("ggr-chart-image") as HTMLImageElement
                                            const canvas = document.createElement("canvas")
                                            const ctx = canvas.getContext("2d")

                                            canvas.width = img.naturalWidth
                                            canvas.height = img.naturalHeight

                                            if (ctx) {
                                              ctx.drawImage(img, 0, 0)
                                              canvas.toBlob(async (blob) => {
                                                if (blob) {
                                                  await navigator.clipboard.write([
                                                    new ClipboardItem({ "image/png": blob }),
                                                  ])
                                                  console.log("Chart copied to clipboard")
                                                }
                                              })
                                            }
                                          } catch (err) {
                                            console.error("Failed to copy chart:", err)
                                          }
                                        }}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={() => {
                                          const link = document.createElement("a")
                                          link.href = "/images/ggr-chart-new.png"
                                          link.download = "average-ggr-by-games-played.png"
                                          document.body.appendChild(link)
                                          link.click()
                                          document.body.removeChild(link)
                                        }}
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Analysis */}
                                  <div className="space-y-2">
                                    <p>
                                      <strong>Key Insights:</strong>
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Players who play 6-10 games have the highest average GGR (~£20.0)</li>
                                      <li>GGR increases from 1-3 games (£5.0) up to 6-10 games (£20.0)</li>
                                      <li>After 10+ games, average GGR starts to decline</li>
                                      <li>Players with 20+ games have the lowest GGR (~£4.0)</li>
                                    </ul>
                                    <p className="mt-3">
                                      <strong>Answer:</strong> Players who play more games don't necessarily have higher
                                      GGR. The relationship follows an inverted U-shape, with peak GGR occurring in the
                                      6-10 games range.
                                    </p>
                                  </div>
                                </div>
                              ) : message.content === "DAU_TREND_CHART" ? (
                                // Keep existing DAU chart response...
                                <div className="text-gray-200">
                                  <h3 className="text-lg font-semibold mb-4 text-white">
                                    Daily Active Users (DAU) - June 2025
                                  </h3>

                                  {/* DAU Chart Image */}
                                  <div className="bg-gray-900 p-4 rounded-lg mb-4 relative group">
                                    <img
                                      src="/images/dau-chart.png"
                                      alt="Daily Active Users (DAU) - June 2025"
                                      className="w-full h-auto"
                                      id="dau-chart-image"
                                    />

                                    {/* Chart Actions - Copy and Download */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={async () => {
                                          try {
                                            const img = document.getElementById("dau-chart-image") as HTMLImageElement
                                            const canvas = document.createElement("canvas")
                                            const ctx = canvas.getContext("2d")

                                            canvas.width = img.naturalWidth
                                            canvas.height = img.naturalHeight

                                            if (ctx) {
                                              ctx.drawImage(img, 0, 0)
                                              canvas.toBlob(async (blob) => {
                                                if (blob) {
                                                  await navigator.clipboard.write([
                                                    new ClipboardItem({ "image/png": blob }),
                                                  ])
                                                  // You could add a toast notification here
                                                  console.log("Chart copied to clipboard")
                                                }
                                              })
                                            }
                                          } catch (err) {
                                            console.error("Failed to copy chart:", err)
                                          }
                                        }}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={() => {
                                          const link = document.createElement("a")
                                          link.href = "/images/dau-chart.png"
                                          link.download = "dau-trend-june-2025.png"
                                          document.body.appendChild(link)
                                          link.click()
                                          document.body.removeChild(link)
                                        }}
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Summary */}
                                  <div className="space-y-2">
                                    <p>
                                      <strong>Average DAU:</strong>{" "}
                                      {Math.round(
                                        dauData.reduce((sum, day) => sum + day.dau, 0) / dauData.length,
                                      ).toLocaleString()}
                                    </p>
                                    <p>
                                      <strong>Peak DAU:</strong>{" "}
                                      {Math.max(...dauData.map((d) => d.dau)).toLocaleString()} users
                                    </p>
                                    <p>
                                      <strong>Lowest DAU:</strong>{" "}
                                      {Math.min(...dauData.map((d) => d.dau)).toLocaleString()} users
                                    </p>
                                  </div>
                                </div>
                              ) : message.content === "TOP_5_SUPPLIERS_CHART" ? (
                                // Keep existing suppliers chart response...
                                <div className="text-gray-200">
                                  <h3 className="text-lg font-semibold mb-4 text-white">
                                    Top 5 Game Suppliers - UK Market (Turnover in Millions)
                                  </h3>

                                  {/* Suppliers Bar Chart */}
                                  <div className="bg-gray-900 p-4 rounded-lg mb-4 relative group">
                                    <img
                                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output%20%281%29-k3lUzdvHl0wyCswtXl9HdsIOKnRldt.png"
                                      alt="Top 5 Game Suppliers - UK Market (Turnover in Millions)"
                                      className="w-full h-auto"
                                      id="suppliers-chart-image"
                                    />

                                    {/* Chart Actions - Copy and Download */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={async () => {
                                          try {
                                            const img = document.getElementById(
                                              "suppliers-chart-image",
                                            ) as HTMLImageElement
                                            const canvas = document.createElement("canvas")
                                            const ctx = canvas.getContext("2d")

                                            canvas.width = img.naturalWidth
                                            canvas.height = img.naturalHeight

                                            if (ctx) {
                                              ctx.drawImage(img, 0, 0)
                                              canvas.toBlob(async (blob) => {
                                                if (blob) {
                                                  await navigator.clipboard.write([
                                                    new ClipboardItem({ "image/png": blob }),
                                                  ])
                                                  console.log("Chart copied to clipboard")
                                                }
                                              })
                                            }
                                          } catch (err) {
                                            console.error("Failed to copy chart:", err)
                                          }
                                        }}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                        onClick={() => {
                                          const link = document.createElement("a")
                                          link.href =
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output%20%281%29-k3lUzdvHl0wyCswtXl9HdsIOKnRldt.png"
                                          link.download = "top-5-game-suppliers-uk.png"
                                          document.body.appendChild(link)
                                          link.click()
                                          document.body.removeChild(link)
                                        }}
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Summary */}
                                  <div className="space-y-2">
                                    <p>
                                      <strong>Market Leader:</strong> Blueprint Gaming with £45.2M turnover
                                    </p>
                                    <p>
                                      <strong>Total Combined Turnover:</strong> £
                                      {[
                                        { supplier: "Blueprint", turnover: 45.2 },
                                        { supplier: "Playtech", turnover: 38.7 },
                                        { supplier: "Pragmatic Play", turnover: 32.1 },
                                        { supplier: "Microgaming", turnover: 28.9 },
                                        { supplier: "Evolution", turnover: 25.3 },
                                      ]
                                        .reduce((sum, supplier) => sum + supplier.turnover, 0)
                                        .toFixed(1)}
                                      M
                                    </p>
                                    <p>
                                      <strong>Average Turnover:</strong> £
                                      {(
                                        [
                                          { supplier: "Blueprint", turnover: 45.2 },
                                          { supplier: "Playtech", turnover: 38.7 },
                                          { supplier: "Pragmatic Play", turnover: 32.1 },
                                          { supplier: "Microgaming", turnover: 28.9 },
                                          { supplier: "Evolution", turnover: 25.3 },
                                        ].reduce((sum, supplier) => sum + supplier.turnover, 0) /
                                        [
                                          { supplier: "Blueprint", turnover: 45.2 },
                                          { supplier: "Playtech", turnover: 38.7 },
                                          { supplier: "Pragmatic Play", turnover: 32.1 },
                                          { supplier: "Microgaming", turnover: 28.9 },
                                          { supplier: "Evolution", turnover: 25.3 },
                                        ].length
                                      ).toFixed(1)}
                                      M
                                    </p>
                                  </div>
                                </div>
                              ) : message.content.toLowerCase().includes("yes") ? (
                                // Keep existing MoM comparison response...
                                <div className="text-gray-200">
                                  <h3 className="text-lg font-semibold mb-4 text-white">
                                    NGR Month-over-Month Comparison
                                  </h3>

                                  {/* Bar Chart */}
                                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                                    <ResponsiveContainer width="100%" height={300}>
                                      <BarChart data={momData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                                        <YAxis
                                          stroke="#9ca3af"
                                          fontSize={12}
                                          tickFormatter={(value) => `£${(value / 1000000).toFixed(1)}M`}
                                        />
                                        <Tooltip
                                          formatter={(value) => [`£${(value as number).toLocaleString()}`, "NGR"]}
                                          contentStyle={{
                                            backgroundColor: "#374151",
                                            border: "1px solid #4b5563",
                                            borderRadius: "6px",
                                            color: "#f3f4f6",
                                          }}
                                        />
                                        <Bar dataKey="ngr" fill="#60a5fa" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>

                                  {/* Summary */}
                                  <div className="space-y-2">
                                    <p>
                                      <strong>June 2025:</strong> £1,000,000
                                    </p>
                                    <p>
                                      <strong>July 2025:</strong> £1,250,000
                                    </p>
                                    <p className="text-green-400 font-semibold">
                                      <strong>Growth:</strong> +{percentageChange}% month-over-month
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                // Default responses
                                <div className="whitespace-pre-wrap text-gray-200">{message.content}</div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Search Box - Fixed at bottom */}
                <div className="sticky bottom-4 w-full">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Ask me about your data..."
                          className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                          disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
