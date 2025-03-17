"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { PageTemplate } from "@/components/PageTemplate"
import { RiAddLine, RiMailLine, RiPencilLine } from "@remixicon/react"
import { useRouter } from "next/navigation"

// Define tabs for the Communications page
const tabs = [
    { name: "All Messages", href: "/experience-manager/communications" },
    { name: "Sent", href: "/experience-manager/communications/sent" },
    { name: "Drafts", href: "/experience-manager/communications/drafts" },
    { name: "Scheduled", href: "/experience-manager/communications/scheduled" },
    { name: "Templates", href: "/experience-manager/communications/templates" },
]

// Sample template data
const templates = [
    {
        id: "template1",
        name: "Welcome Email",
        description: "A warm welcome email for new users",
        lastModified: "2 days ago",
        category: "Onboarding",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Welcome+Email"
    },
    {
        id: "template2",
        name: "Monthly Newsletter",
        description: "Regular updates and news for your subscribers",
        lastModified: "1 week ago",
        category: "Newsletter",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Monthly+Newsletter"
    },
    {
        id: "template3",
        name: "Event Invitation",
        description: "Invite users to your upcoming events",
        lastModified: "3 days ago",
        category: "Events",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Event+Invitation"
    },
    {
        id: "template4",
        name: "Product Announcement",
        description: "Announce new products or features",
        lastModified: "5 days ago",
        category: "Marketing",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Product+Announcement"
    },
    {
        id: "template5",
        name: "Thank You Email",
        description: "Express gratitude to your users",
        lastModified: "1 day ago",
        category: "Engagement",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Thank+You"
    },
    {
        id: "template6",
        name: "Feedback Request",
        description: "Ask users for their feedback",
        lastModified: "4 days ago",
        category: "Engagement",
        thumbnail: "https://placehold.co/300x200/4f46e5/ffffff?text=Feedback+Request"
    }
]

export default function TemplatesPage() {
    const router = useRouter()

    const handleCreateTemplate = () => {
        router.push("/experience-manager/communications/template-builder")
    }

    const handleEditTemplate = (templateId: string) => {
        router.push(`/experience-manager/communications/template-builder?template=${templateId}`)
    }

    const handleUseTemplate = (templateId: string) => {
        router.push(`/experience-manager/communications/template-builder?template=${templateId}&mode=use`)
    }

    return (
        <>
            <PageTemplate
                title="Email Templates"
                primaryCta="Create Template"
                onPrimaryClick={handleCreateTemplate}
                tabs={tabs}
            />
            
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <Card key={template.id} className="overflow-hidden">
                            <div className="relative h-40 overflow-hidden">
                                <img 
                                    src={template.thumbnail} 
                                    alt={template.name} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-md px-2 py-1 text-xs font-medium">
                                    {template.category}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium">{template.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last modified: {template.lastModified}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
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
                                        Use Template
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
            </div>
        </>
    )
} 