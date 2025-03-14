"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Card"
import { PageTemplate } from "@/components/PageTemplate"
import { RiAddLine, RiArticleLine, RiCalendarEventLine, RiMailLine, RiNewspaperLine } from "@remixicon/react"

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
    id: "blank",
    name: "Blank Template",
    description: "Start with a clean slate",
    icon: RiArticleLine,
    lastModified: "2023-03-10",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Weekly newsletter template with sections for featured content",
    icon: RiNewspaperLine,
    lastModified: "2023-03-12",
  },
  {
    id: "announcement",
    name: "Announcement",
    description: "Template for important announcements and updates",
    icon: RiMailLine,
    lastModified: "2023-03-14",
  },
  {
    id: "event",
    name: "Event Invitation",
    description: "Template for event invitations with RSVP options",
    icon: RiCalendarEventLine,
    lastModified: "2023-03-15",
  },
]

export default function TemplatesPage() {
  const router = useRouter()

  const handleCreateTemplate = () => {
    router.push("/experience-manager/communications/template-builder")
  }

  const handleEditTemplate = (templateId: string) => {
    router.push(`/experience-manager/communications/template-builder?template=${templateId}`)
  }

  return (
    <PageTemplate
      title="Email Templates"
      primaryCta="Create Template"
      onPrimaryClick={handleCreateTemplate}
      tabs={tabs}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-primary/10 mr-3">
                    <template.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{template.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-2">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Last modified: {template.lastModified}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="ghost" 
                onClick={() => handleEditTemplate(template.id)}
              >
                Edit Template
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Create new template card */}
        <Card className="border-dashed border-2 hover:shadow-md transition-shadow flex flex-col items-center justify-center p-6 cursor-pointer" onClick={handleCreateTemplate}>
          <div className="p-3 rounded-full bg-primary/10 mb-4">
            <RiAddLine className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Create New Template</h3>
          <p className="text-sm text-gray-500 text-center">Start from scratch or use one of our pre-built templates</p>
        </Card>
      </div>
    </PageTemplate>
  )
} 