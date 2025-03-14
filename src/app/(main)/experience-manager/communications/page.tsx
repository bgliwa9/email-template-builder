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
        router.push("/experience-manager/communications/create-message")
    }

    return (
        <PageTemplate
            title="Communications"
            primaryCta="Create Message"
            onPrimaryClick={handleCreateMessage}
            tabs={tabs}
        />
    )
} 