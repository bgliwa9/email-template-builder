"use client"

import { Button } from "@/components/Button"
import { cx } from "@/lib/utils"
import {
    RiArrowDownSLine,
    RiCalendarEventLine,
    RiCloseLine,
    RiLineChartLine,
    RiSendPlaneFill,
    RiUserAddLine,
    RiVipCrownLine
} from "@remixicon/react"
import { useEffect, useRef, useState } from "react"

interface AIAssistantDrawerProps {
    isOpen: boolean
    onClose: () => void
}

interface SuggestionCard {
    id: string
    title: string
    description: string
    icon: React.ReactNode
}

interface ChatSession {
    id: string
    title: string
    date: string
    messages: { role: 'user' | 'assistant', content: string }[]
}

export function AIAssistantDrawer({ isOpen, onClose }: AIAssistantDrawerProps) {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
    const [input, setInput] = useState('')
    const [showPreviousChats, setShowPreviousChats] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Sample previous chat sessions
    const previousChats: ChatSession[] = [
        {
            id: '1',
            title: 'Adding new tenant users',
            date: 'Today',
            messages: [
                { role: 'user', content: 'Help me add a user' },
                { role: 'assistant', content: 'I\'d be happy to help you add a user. Here\'s how we can get started...' }
            ]
        },
        {
            id: '2',
            title: 'Building occupancy analysis',
            date: 'Yesterday',
            messages: [
                { role: 'user', content: 'Help me find occupancy trends' },
                { role: 'assistant', content: 'I\'d be happy to help you find occupancy trends. Here\'s how we can get started...' }
            ]
        },
        {
            id: '3',
            title: 'Summer event planning',
            date: 'Jun 10',
            messages: [
                { role: 'user', content: 'Help me schedule an event' },
                { role: 'assistant', content: 'I\'d be happy to help you schedule an event. Here\'s how we can get started...' }
            ]
        }
    ]

    const suggestionCards: SuggestionCard[] = [
        {
            id: 'add-user',
            title: 'Add a user',
            description: 'Add new user account',
            icon: <RiUserAddLine className="size-5" />
        },
        {
            id: 'occupancy-trends',
            title: 'Find occupancy trends',
            description: 'Analyze building occupancy trends',
            icon: <RiLineChartLine className="size-5" />
        },
        {
            id: 'schedule-event',
            title: 'Schedule an event',
            description: 'Create events that tenants will love',
            icon: <RiCalendarEventLine className="size-5" />
        },
        {
            id: 'view-vips',
            title: 'View VIPs',
            description: 'See important visitors expected today',
            icon: <RiVipCrownLine className="size-5" />
        }
    ]

    // Scroll to bottom of messages when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Handle escape key to close drawer
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.classList.add('ai-drawer-open')
        } else {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('ai-drawer-open')
        }

        return () => {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('ai-drawer-open')
        }
    }, [isOpen])

    // Close previous chats dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (showPreviousChats) {
                setShowPreviousChats(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showPreviousChats])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        // Add user message
        const userMessage = { role: 'user' as const, content: input.trim() }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant' as const,
                content: `I received your message: "${input.trim()}". This is a simulated response as this is just a UI demo.`
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    const handleSuggestionClick = (suggestion: SuggestionCard) => {
        // Add user message based on suggestion
        const userMessage = {
            role: 'user' as const,
            content: `Help me ${suggestion.title.toLowerCase()}`
        }
        setMessages(prev => [...prev, userMessage])

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant' as const,
                content: `I'd be happy to help you ${suggestion.title.toLowerCase()}. Here's how we can get started...`
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    const handleNewChat = () => {
        setMessages([])
        setInput('')
        setShowPreviousChats(false)
    }

    const handleLoadPreviousChat = (chat: ChatSession) => {
        setMessages(chat.messages)
        setShowPreviousChats(false)
    }

    const togglePreviousChats = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowPreviousChats(prev => !prev)
    }

    return (
        <>
            <div
                className={cx(
                    "fixed inset-y-0 right-0 z-40 w-80 bg-white dark:bg-gray-950 transform transition-transform duration-300 ease-in-out",
                    "border-l border-gray-200 dark:border-gray-800",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <h2 className="font-medium text-sm text-gray-900 dark:text-gray-50">Assistant</h2>
                    <div className="flex items-center gap-2">
                        {/* Always show the button group for testing */}
                        <div className="relative inline-flex shadow-sm rounded-md">
                            <Button
                                variant="secondary"
                                className="py-1 px-3 h-8 text-xs rounded-r-none border-r border-gray-300 dark:border-gray-700"
                                onClick={handleNewChat}
                            >
                                New chat
                            </Button>
                            <Button
                                variant="secondary"
                                className="p-0 w-8 h-8 flex items-center justify-center rounded-l-none"
                                onClick={togglePreviousChats}
                            >
                                <RiArrowDownSLine className="size-4" />
                                <span className="sr-only">Show previous chats</span>
                            </Button>

                            {/* Previous chats dropdown */}
                            {showPreviousChats && (
                                <div
                                    className="absolute top-full right-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden z-10"
                                >
                                    <div className="py-1">
                                        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                            Previous chats
                                        </div>
                                        {previousChats.map(chat => (
                                            <button
                                                key={chat.id}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                onClick={() => handleLoadPreviousChat(chat)}
                                            >
                                                <div className="font-medium truncate">{chat.title}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            className="p-1.5 h-8 w-8"
                            onClick={onClose}
                        >
                            <RiCloseLine className="size-5" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </div>

                {/* Messages or Suggestions */}
                <div className="flex flex-col h-[calc(100%-8rem)] overflow-y-auto p-4">
                    {messages.length > 0 ? (
                        // Show message history if there are messages
                        <>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={cx(
                                        "mb-4 max-w-[85%] rounded-lg p-3 text-sm",
                                        message.role === 'user'
                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-100 self-end rounded-br-none"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 self-start rounded-bl-none"
                                    )}
                                >
                                    {message.content}
                                </div>
                            ))}
                        </>
                    ) : (
                        // Show suggestion cards if no messages yet
                        <div className="py-2">
                            <div className="grid grid-cols-1 gap-3">
                                {suggestionCards.map((card) => (
                                    <button
                                        key={card.id}
                                        onClick={() => handleSuggestionClick(card)}
                                        className={cx(
                                            "flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                                            "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800",
                                            "border border-gray-200 dark:border-gray-800",
                                            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950"
                                        )}
                                    >
                                        <div className={cx(
                                            "flex-shrink-0 flex items-center justify-center size-10 rounded-full",
                                            "bg-primary/10 text-primary dark:bg-primary/20"
                                        )}>
                                            {card.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-50 text-xs">
                                                {card.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {card.description}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything"
                            className={cx(
                                "w-full rounded-full border border-gray-300 dark:border-gray-700 pl-4 pr-12 py-2.5 text-sm",
                                "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                                "shadow-sm",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={!input.trim()}
                            className={cx(
                                "absolute right-1 top-1/2 -translate-y-1/2 p-1.5 h-8 w-8 rounded-full transition-colors",
                                input.trim()
                                    ? "bg-primary hover:bg-primary-dark text-white"
                                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                            )}
                        >
                            <RiSendPlaneFill className={cx(
                                "size-4",
                                input.trim() ? "text-white" : "text-gray-500 dark:text-gray-400"
                            )} />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
} 