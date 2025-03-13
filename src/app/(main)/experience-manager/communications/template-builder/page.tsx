// @ts-nocheck
/* eslint-disable @next/next/no-img-element */

"use client"

// At the top of the file, in the imports section
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Select, SelectContent, SelectGroup, SelectGroupLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Textarea } from "@/components/Textarea"
import { RiAlignCenter, RiAlignLeft, RiAlignRight, RiArrowDownSLine, RiArrowLeftLine, RiArticleLine, RiBold, RiCalendarEventLine, RiCheckLine, RiDeleteBinLine, RiDragMove2Line, RiImage2Line, RiItalic, RiLink, RiListOrdered, RiListUnordered, RiMailLine, RiMarkPenLine, RiPaintFill, RiSave3Line, RiSendPlaneLine, RiUnderline } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Custom Tooltip component
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsVisible(true), 300);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    return (
        <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {isVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
                    {content}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </div>
    );
}; 