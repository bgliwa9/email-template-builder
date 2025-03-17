"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { PageTemplate } from "@/components/PageTemplate"
import { RiAddLine, RiMailLine, RiMoreLine, RiPencilLine, RiSearchLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Define tabs for the Communications page
const tabs = [
    { name: "All Messages", href: "/experience-manager/communications" },
    { name: "Sent", href: "/experience-manager/communications/sent" },
    { name: "Drafts", href: "/experience-manager/communications/drafts" },
    { name: "Scheduled", href: "/experience-manager/communications/scheduled" },
    { name: "Templates", href: "/experience-manager/communications/templates" },
]

// Sample template data
const templateData = [
    {
        id: "template1",
        name: "Welcome Email",
        description: "A warm welcome email for new users",
        lastModified: "2 days ago",
        category: "Onboarding",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Welcome+Email",
        createdAt: "2023-12-15",
        author: "John Smith"
    },
    {
        id: "template2",
        name: "Monthly Newsletter",
        description: "Regular updates and news for your subscribers",
        lastModified: "1 week ago",
        category: "Newsletter",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Monthly+Newsletter",
        createdAt: "2023-11-01",
        author: "Sarah Johnson"
    },
    {
        id: "template3",
        name: "Event Invitation",
        description: "Invite users to your upcoming events",
        lastModified: "3 days ago",
        category: "Events",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Event+Invitation",
        createdAt: "2024-01-10",
        author: "Michael Brown"
    },
    {
        id: "template4",
        name: "Product Announcement",
        description: "Announce new products or features",
        lastModified: "5 days ago",
        category: "Marketing",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Product+Announcement",
        createdAt: "2024-02-05",
        author: "Emily Davis"
    },
    {
        id: "template5",
        name: "Thank You Email",
        description: "Express gratitude to your users",
        lastModified: "1 day ago",
        category: "Engagement",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Thank+You",
        createdAt: "2024-02-20",
        author: "David Wilson"
    },
    {
        id: "template6",
        name: "Feedback Request",
        description: "Ask users for their feedback",
        lastModified: "4 days ago",
        category: "Engagement",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Feedback+Request",
        createdAt: "2024-03-01",
        author: "Lisa Martinez"
    }
]

// Get unique categories for filter options
const categories = Array.from(new Set(templateData.map(template => template.category)))

export default function TemplatesPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [templates, setTemplates] = useState(templateData)
    const [showDropdownId, setShowDropdownId] = useState<string | null>(null)

    const handleCreateTemplate = () => {
        router.push("/experience-manager/communications/template-builder")
    }

    const handleEditTemplate = (templateId: string) => {
        // Go directly to the editor with the template and edit mode
        router.push(`/experience-manager/communications/template-builder/editor?template=${templateId}&mode=edit`)
    }

    const handleUseTemplate = (templateId: string) => {
        // Go directly to the editor with the template and use mode
        router.push(`/experience-manager/communications/template-builder/editor?template=${templateId}&mode=use`)
    }

    const handleDuplicateTemplate = (templateId: string) => {
        // In a real app, this would create a copy in the backend
        const templateToDuplicate = templates.find(t => t.id === templateId)
        if (templateToDuplicate) {
            const newTemplate = {
                ...templateToDuplicate,
                id: `${templateToDuplicate.id}-copy-${Date.now()}`,
                name: `${templateToDuplicate.name} (Copy)`,
                lastModified: "Just now"
            }
            setTemplates([...templates, newTemplate])
        }
        setShowDropdownId(null)
    }

    const handleDeleteTemplate = (templateId: string) => {
        // In a real app, this would delete from the backend
        setTemplates(templates.filter(t => t.id !== templateId))
        setShowDropdownId(null)
    }

    const toggleDropdown = (templateId: string) => {
        if (showDropdownId === templateId) {
            setShowDropdownId(null)
        } else {
            setShowDropdownId(templateId)
        }
    }

    // Filter templates based on search query and category
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             template.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory ? template.category === selectedCategory : true
        return matchesSearch && matchesCategory
    })

    return (
        <>
            <PageTemplate
                title="Email Templates Library"
                primaryCta="Create Template"
                onPrimaryClick={handleCreateTemplate}
                tabs={tabs}
            >
                <div className="container mx-auto px-4 py-6">
                    {/* Search and filter bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input 
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select 
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
                                value={selectedCategory || ""}
                                onChange={(e) => setSelectedCategory(e.target.value || null)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results summary */}
                    <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredTemplates.length} of {templates.length} templates
                        {selectedCategory && <span> in <strong>{selectedCategory}</strong></span>}
                        {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
                    </div>

                    {/* Templates grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTemplates.map((template) => (
                            <Card key={template.id} className="overflow-hidden group">
                                <div className="relative h-40 overflow-hidden">
                                    <img 
                                        src={template.thumbnail} 
                                        alt={template.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-md px-2 py-1 text-xs font-medium">
                                        {template.category}
                                    </div>
                                    <div className="absolute top-2 left-2">
                                        <div className="relative">
                                            <button 
                                                className="bg-white dark:bg-gray-800 rounded-full p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => toggleDropdown(template.id)}
                                            >
                                                <RiMoreLine className="h-4 w-4" />
                                            </button>
                                            
                                            {showDropdownId === template.id && (
                                                <div className="absolute left-0 top-8 z-10 w-48 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                                        <button 
                                                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                            onClick={() => handleDuplicateTemplate(template.id)}
                                                        >
                                                            Duplicate
                                                        </button>
                                                        <button 
                                                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                            onClick={() => handleDeleteTemplate(template.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium">{template.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last modified: {template.lastModified}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Created by: {template.author}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2">
                                        {template.description}
                                    </p>
                                    <div className="flex justify-between mt-4">
                                        <Button 
                                            variant="secondary" 
                                            onClick={() => handleEditTemplate(template.id)}
                                        >
                                            <RiPencilLine className="mr-1 h-4 w-4" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleUseTemplate(template.id)}
                                        >
                                            <RiMailLine className="mr-1 h-4 w-4" />
                                            Use
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        
                        {/* Add new template card */}
                        <Card className="flex flex-col items-center justify-center h-full min-h-[320px] border-dashed cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors" onClick={handleCreateTemplate}>
                            <div className="flex flex-col items-center justify-center p-6 text-center">
                                <div className="rounded-full bg-primary/10 p-3 mb-4">
                                    <RiAddLine className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">Create New Template</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Design a new email template from scratch
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Empty state */}
                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No templates found</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {searchQuery || selectedCategory ? 
                                    "Try adjusting your search or filter criteria." : 
                                    "Get started by creating a new template."}
                            </p>
                            <div className="mt-6">
                                <Button onClick={handleCreateTemplate}>
                                    <RiAddLine className="mr-1 h-4 w-4" />
                                    Create Template
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </PageTemplate>
        </>
    )
} 