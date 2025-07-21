"use client"

import type * as React from "react"
import { MessageSquare, Search, Library, History, Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

// Mock data for previous chats
const previousChats = [
  {
    id: 1,
    title: "NGR Analysis for Ladbrokes",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "DAU Trends Analysis",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    title: "Game Supplier Performance",
    timestamp: "2 days ago",
  },
  {
    id: 4,
    title: "Jackpot Wins Report",
    timestamp: "3 days ago",
  },
  {
    id: 5,
    title: "Revenue by Market",
    timestamp: "1 week ago",
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNewChat: () => void
}

export function AppSidebar({ onNewChat, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="bg-gray-900 border-gray-700" {...props}>
      <SidebarHeader className="bg-gray-900 border-b border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={onNewChat} className="hover:bg-gray-800 text-white">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Plus className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-white">New Chat</span>
                <span className="truncate text-xs text-gray-400">Start a new conversation</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                  <Search className="size-4" />
                  <span>Search Chats</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                  <Library className="size-4" />
                  <span>Library</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">Previous Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {previousChats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                    <MessageSquare className="size-4" />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium text-white">{chat.title}</span>
                      <span className="truncate text-xs text-gray-400">{chat.timestamp}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gray-900 border-t border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
              <History className="size-4" />
              <span>View All History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
