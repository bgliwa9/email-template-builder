"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function TemplateEditorPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const templateId = searchParams.get('template')
    const mode = searchParams.get('mode') || 'edit'
    
    useEffect(() => {
        // Redirect to the template builder with the template and mode
        // This will bypass the template selection screen
        if (templateId) {
            // First navigate to the template builder
            router.push(`/experience-manager/communications/template-builder?template=${templateId}&mode=${mode}&skipSelection=true`)
        } else {
            // If no template is specified, go back to the templates page
            router.push('/experience-manager/communications/templates')
        }
    }, [templateId, mode, router])
    
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading template editor...</p>
            </div>
        </div>
    )
} 