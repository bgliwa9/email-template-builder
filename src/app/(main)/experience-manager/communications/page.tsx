"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { useRouter } from "next/navigation"

// Define tabs for the Communications page
const tabs = [
    { name: "All Messages", href: "/experience-manager/communications" },
    { name: "Sent", href: "/experience-manager/communications/sent" },
    { name: "Drafts", href: "/experience-manager/communications/drafts" },
    { name: "Scheduled", href: "/experience-manager/communications/scheduled" },
    { name: "Templates", href: "/experience-manager/communications/templates" },
]

export default function Communications() {
    const router = useRouter()

    const handleCreateMessage = () => {
        router.push("/experience-manager/communications/template-builder")
    }

    return (
        <PageTemplate
            title="Communications"
            primaryCta="Create Message"
            onPrimaryClick={handleCreateMessage}
            tabs={tabs}
        >
            <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400">All your messages will appear here.</p>
            </div>
        </PageTemplate>
    )
} 