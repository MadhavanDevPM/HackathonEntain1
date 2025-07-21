export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Get the last user message
  const lastMessage = messages[messages.length - 1]?.content || ""

  // Mock responses for different questions
  let mockResponse = ""

  if (lastMessage.toLowerCase().includes("ngr") && lastMessage.toLowerCase().includes("ladbrokes")) {
    mockResponse = `Label: Ladbrokes
Market: UK
NGR: £1,000,000 (20th July 2025)`
  } else if (lastMessage.toLowerCase().includes("dau") && lastMessage.toLowerCase().includes("trend")) {
    mockResponse = `DAU_TREND_CHART`
  } else if (
    lastMessage.toLowerCase().includes("top 5") &&
    lastMessage.toLowerCase().includes("game supplier") &&
    lastMessage.toLowerCase().includes("uk")
  ) {
    mockResponse = `TOP_5_SUPPLIERS_CHART`
  } else if (lastMessage.toLowerCase().includes("jackpot") && lastMessage.toLowerCase().includes("yesterday")) {
    mockResponse = `**Biggest Jackpot Wins - Yesterday**

🎰 **Top Jackpot Wins:**
1. **Mega Moolah** - £2,500,000 (Winner: Anonymous, UK)
2. **Divine Fortune** - £850,000 (Winner: John D., London)
3. **Hall of Gods** - £425,000 (Winner: Sarah M., Manchester)
4. **Arabian Nights** - £180,000 (Winner: Mike R., Birmingham)

**Total Jackpots Paid:** £3,955,000`
  } else if (
    lastMessage.toLowerCase().includes("show me the average ggr from players by number of games played") &&
    lastMessage.toLowerCase().includes("do players who play more games have a higher average ggr")
  ) {
    mockResponse = `GGR_ANALYSIS_CHART`
  } else {
    mockResponse = `I understand you're asking about: "${lastMessage}"

This is a demo version of DataGenie. In a real implementation, I would:
1. Convert your question to SQL
2. Query the database
3. Generate visualizations
4. Provide insights

For a working version, please configure your OpenAI API key in the environment variables.`
  }

  // Create a mock streaming response
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      // Simulate typing effect
      const words = mockResponse.split(" ")
      let index = 0

      const interval = setInterval(() => {
        if (index < words.length) {
          const chunk = index === 0 ? words[index] : " " + words[index]
          controller.enqueue(encoder.encode(`0:"${chunk}"\n`))
          index++
        } else {
          controller.enqueue(
            encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":50}}\n`),
          )
          controller.close()
          clearInterval(interval)
        }
      }, 50) // 50ms delay between words for typing effect
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Vercel-AI-Data-Stream": "v1",
    },
  })
}
