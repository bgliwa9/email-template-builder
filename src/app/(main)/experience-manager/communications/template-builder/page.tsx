// Add this at the very top of the file, before any other code
// @ts-nocheck
/* eslint-disable @next/next/no-img-element */

"use client"

// At the top of the file, in the imports section
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Select, SelectContent, SelectGroup, SelectGroupLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { 
    RiAddLine, RiAlignCenter, RiAlignLeft, RiAlignRight, RiArrowDownSLine, 
    RiArrowLeftLine, RiArticleLine, RiAttachmentLine, RiBold, RiCalendarEventLine, 
    RiCheckLine, RiDeleteBin6Line, RiDeleteBinLine, RiDownloadLine, RiDragMove2Line, 
    RiEdit2Line, RiFileLine, RiImage2Line, RiItalic, RiLink, RiListOrdered, 
    RiListUnordered, RiMailLine, RiMarkPenLine, RiPaintFill, RiSave3Line, 
    RiSendPlaneLine, RiSettings4Line, RiUnderline
} from "@remixicon/react"
import { useRouter, useSearchParams } from "next/navigation"
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

// Font options
const fontFamilies = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Tahoma, sans-serif', label: 'Tahoma' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Courier New, monospace', label: 'Courier New' }
];

// Mock content items for content link dropdown
const contentItems = [
    {
        id: 'c1',
        title: 'How to Improve Customer Engagement',
        description: 'Learn effective strategies to boost customer engagement and retention through personalized communication.',
        image: 'https://placehold.co/600x300/4f46e5/ffffff?text=Customer+Engagement',
        url: '/blog/customer-engagement'
    },
    {
        id: 'c2',
        title: 'Email Marketing Best Practices',
        description: 'Discover the latest best practices in email marketing to increase open rates and conversions.',
        image: 'https://placehold.co/600x300/0ea5e9/ffffff?text=Email+Marketing',
        url: '/blog/email-marketing'
    },
    {
        id: 'c3',
        title: 'Product Update: New Features',
        description: 'Explore the exciting new features we have added to our platform to enhance your experience.',
        image: 'https://placehold.co/600x300/10b981/ffffff?text=Product+Update',
        url: '/updates/new-features'
    }
];

// Mock events for event link dropdown
const eventItems = [
    {
        id: 'e1',
        title: 'Annual Customer Conference',
        description: 'Join us for our annual customer conference featuring industry experts and networking opportunities.',
        date: 'June 15-17, 2023',
        location: 'San Francisco, CA',
        image: 'https://placehold.co/600x300/f97316/ffffff?text=Annual+Conference',
        url: '/events/annual-conference'
    },
    {
        id: 'e2',
        title: 'Product Webinar Series',
        description: 'Learn how to maximize your productivity with our latest features in this interactive webinar.',
        date: 'July 8, 2023',
        location: 'Online',
        image: 'https://placehold.co/600x300/ec4899/ffffff?text=Webinar+Series',
        url: '/events/webinar-series'
    },
    {
        id: 'e3',
        title: 'Industry Roundtable Discussion',
        description: 'Participate in our exclusive roundtable discussion with industry leaders on emerging trends.',
        date: 'August 22, 2023',
        location: 'New York, NY',
        image: 'https://placehold.co/600x300/8b5cf6/ffffff?text=Roundtable',
        url: '/events/roundtable'
    }
];

// Font sizes
const fontSizes = [
    { value: '8px', label: '8' },
    { value: '9px', label: '9' },
    { value: '10px', label: '10' },
    { value: '11px', label: '11' },
    { value: '12px', label: '12' },
    { value: '14px', label: '14' },
    { value: '16px', label: '16' },
    { value: '18px', label: '18' },
    { value: '20px', label: '20' },
    { value: '22px', label: '22' },
    { value: '24px', label: '24' },
    { value: '26px', label: '26' },
    { value: '28px', label: '28' },
    { value: '36px', label: '36' },
    { value: '48px', label: '48' },
    { value: '72px', label: '72' }
];

const fontColors = [
    { value: '#000000', label: 'Black', class: 'bg-black' },
    { value: '#FFFFFF', label: 'White', class: 'bg-white border border-gray-300' },
    { value: '#FF0000', label: 'Red', class: 'bg-red-600' },
    { value: '#0000FF', label: 'Blue', class: 'bg-blue-600' },
    { value: '#008000', label: 'Green', class: 'bg-green-600' },
    { value: '#FFA500', label: 'Orange', class: 'bg-orange-500' },
    { value: '#800080', label: 'Purple', class: 'bg-purple-600' },
    { value: '#A52A2A', label: 'Brown', class: 'bg-amber-800' },
    { value: '#808080', label: 'Gray', class: 'bg-gray-500' },
    { value: '#FFD700', label: 'Gold', class: 'bg-yellow-500' },
    // Google colors
    { value: '#4285F4', label: 'Google Blue', class: 'bg-blue-500' },
    { value: '#DB4437', label: 'Google Red', class: 'bg-red-500' },
    { value: '#F4B400', label: 'Google Yellow', class: 'bg-yellow-400' },
    { value: '#0F9D58', label: 'Google Green', class: 'bg-green-500' },
    // Additional colors
    { value: '#E91E63', label: 'Pink', class: 'bg-pink-500' },
    { value: '#9C27B0', label: 'Purple', class: 'bg-purple-500' },
    { value: '#673AB7', label: 'Deep Purple', class: 'bg-purple-600' },
    { value: '#3F51B5', label: 'Indigo', class: 'bg-indigo-500' },
    { value: '#03A9F4', label: 'Light Blue', class: 'bg-blue-400' },
    { value: '#00BCD4', label: 'Cyan', class: 'bg-cyan-500' },
    // Extended palette - darker shades
    { value: '#1A237E', label: 'Dark Indigo', class: 'bg-indigo-900' },
    { value: '#311B92', label: 'Dark Purple', class: 'bg-purple-900' },
    { value: '#880E4F', label: 'Dark Pink', class: 'bg-pink-900' },
    { value: '#B71C1C', label: 'Dark Red', class: 'bg-red-900' },
    { value: '#004D40', label: 'Dark Teal', class: 'bg-teal-900' },
    // Extended palette - lighter shades
    { value: '#E3F2FD', label: 'Light Blue', class: 'bg-blue-100' },
    { value: '#E8F5E9', label: 'Light Green', class: 'bg-green-100' },
    { value: '#FFF3E0', label: 'Light Orange', class: 'bg-orange-100' },
    { value: '#FCE4EC', label: 'Light Pink', class: 'bg-pink-100' },
    { value: '#F3E5F5', label: 'Light Purple', class: 'bg-purple-100' },
];

const backgroundColors = [
    { value: 'transparent', label: 'None', class: 'bg-white border border-gray-300 relative after:content-[""] after:absolute after:inset-0 after:bg-red-500 after:rotate-45 after:w-[1px] after:h-full after:left-1/2 after:-translate-x-1/2' },
    // Bright highlight colors
    { value: '#FFFF00', label: 'Yellow', class: 'bg-yellow-300' },
    { value: '#90EE90', label: 'Light Green', class: 'bg-green-200' },
    { value: '#ADD8E6', label: 'Light Blue', class: 'bg-blue-200' },
    { value: '#FFB6C1', label: 'Light Pink', class: 'bg-pink-200' },
    { value: '#E6E6FA', label: 'Lavender', class: 'bg-purple-100' },
    // Pastel colors
    { value: '#F5F5DC', label: 'Beige', class: 'bg-amber-50' },
    { value: '#D3D3D3', label: 'Light Gray', class: 'bg-gray-300' },
    { value: '#FFA07A', label: 'Light Salmon', class: 'bg-orange-200' },
    { value: '#E0FFFF', label: 'Light Cyan', class: 'bg-cyan-100' },
    { value: '#FFEBCD', label: 'Blanched Almond', class: 'bg-amber-100' },
    // More pastel options
    { value: '#FFDAB9', label: 'Peach Puff', class: 'bg-orange-100' },
    { value: '#F0FFF0', label: 'Honeydew', class: 'bg-green-50' },
    { value: '#F0F8FF', label: 'Alice Blue', class: 'bg-blue-50' },
    { value: '#FFF0F5', label: 'Lavender Blush', class: 'bg-pink-50' },
    { value: '#F5F5F5', label: 'Light Gray', class: 'bg-gray-100' },
    // Additional highlight colors
    { value: '#CCFF90', label: 'Light Green', class: 'bg-lime-200' },
    { value: '#A7FFEB', label: 'Light Teal', class: 'bg-teal-100' },
    { value: '#84FFFF', label: 'Light Cyan', class: 'bg-cyan-200' },
    { value: '#80D8FF', label: 'Light Blue', class: 'bg-blue-300' },
    { value: '#B388FF', label: 'Light Purple', class: 'bg-purple-300' },
    { value: '#FF80AB', label: 'Light Pink', class: 'bg-pink-300' },
    { value: '#FF8A80', label: 'Light Red', class: 'bg-red-200' },
    { value: '#FFD180', label: 'Light Orange', class: 'bg-orange-200' },
    { value: '#FFFF8D', label: 'Light Yellow', class: 'bg-yellow-200' },
    { value: '#CFD8DC', label: 'Light Blue Gray', class: 'bg-slate-200' },
];

// Rich Text Editor component
const RichTextEditor = ({ value, onChange, className, sectionType = 'text', ...props }: {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    sectionType?: 'header' | 'text' | 'footer';
    [key: string]: any;
}) => {
    const [showFontFamily, setShowFontFamily] = useState(false);
    const [showFontSize, setShowFontSize] = useState(false);
    const [showFontColor, setShowFontColor] = useState(false);
    const [showBgColor, setShowBgColor] = useState(false);
    const [showHeadingMenu, setShowHeadingMenu] = useState(false);
    // Set default text color based on section type
    const [currentColor, setCurrentColor] = useState(sectionType === 'footer' ? '#6B7280' : '#000000');
    const [currentBgColor, setCurrentBgColor] = useState('transparent');
    const [currentFontFamily, setCurrentFontFamily] = useState(fontFamilies[0].value);
    const [isApplyingBgColor, setIsApplyingBgColor] = useState(false);

    // Set default font size based on section type
    const getDefaultFontSizeIndex = () => {
        switch (sectionType) {
            case 'header':
                return 10; // 24px for headers
            case 'text':
                return 6; // 16px for regular text (changed from index 8 which was 20px)
            case 'footer':
                return 5; // 14px for footer
            default:
                return 6; // 16px default (changed from index 8 which was 20px)
        }
    };

    const [currentFontSize, setCurrentFontSize] = useState(fontSizes[getDefaultFontSizeIndex()].value);
    // Initialize formatting states to false by default
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [textAlign, setTextAlign] = useState('left'); // Default alignment
    const editorRef = useRef<HTMLDivElement>(null);
    const [htmlContent, setHtmlContent] = useState(value);
    const isInitialRender = useRef(true);
    const isUpdatingContent = useRef(false);

    // Initialize content when the value prop changes
    useEffect(() => {
        if (!editorRef.current) return;

        // Only update if the content has changed or it's the initial render
        if (value !== htmlContent || isInitialRender.current) {
            // Set flag to prevent handleContentChange from firing during initialization
            isUpdatingContent.current = true;

            // Set the HTML content
            editorRef.current.innerHTML = value;

            // Parse initial styles
            parseInitialStyles(value);

            // Reset the initial render flag
            isInitialRender.current = false;

            // Reset the updating content flag after a short delay
            setTimeout(() => {
                isUpdatingContent.current = false;
            }, 0);

            // Update the HTML content state
            setHtmlContent(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, htmlContent, parseInitialStyles]);

    // Parse initial styles from content
    const parseInitialStyles = (content: string) => {
        if (!content || content === '<p></p>' || content === '<p><br></p>') return;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Check for font family
        const fontFamilyElement = tempDiv.querySelector('[style*="font-family"]');
        if (fontFamilyElement) {
            const style = fontFamilyElement.getAttribute('style') || '';
            const fontFamilyMatch = style.match(/font-family:\s*([^;]+)/);
            if (fontFamilyMatch && fontFamilyMatch[1]) {
                const fontFamily = fontFamilyMatch[1].trim();
                // Find the closest matching font family in our options
                const matchedFont = fontFamilies.find(f => fontFamily.includes(f.label) || f.value.includes(fontFamily));
                if (matchedFont) {
                    setCurrentFontFamily(matchedFont.value);
                }
            }
        }

        // Check for font size - prioritize the section type default if no explicit size is found
        let foundFontSize = false;
        const fontSizeElement = tempDiv.querySelector('[style*="font-size"]');
        if (fontSizeElement) {
            const style = fontSizeElement.getAttribute('style') || '';
            const fontSizeMatch = style.match(/font-size:\s*([^;]+)/);
            if (fontSizeMatch && fontSizeMatch[1]) {
                const fontSize = fontSizeMatch[1].trim();

                // Convert to px if needed
                let fontSizeInPx = fontSize;
                if (fontSize.endsWith('pt')) {
                    // Convert pt to px (1pt ≈ 1.333px)
                    const ptValue = parseFloat(fontSize);
                    fontSizeInPx = `${Math.round(ptValue * 1.333)}px`;
                } else if (fontSize.endsWith('em')) {
                    // Convert em to px (assuming 1em = 16px)
                    const emValue = parseFloat(fontSize);
                    fontSizeInPx = `${Math.round(emValue * 16)}px`;
                } else if (fontSize.endsWith('rem')) {
                    // Convert rem to px (assuming 1rem = 16px)
                    const remValue = parseFloat(fontSize);
                    fontSizeInPx = `${Math.round(remValue * 16)}px`;
                } else if (!fontSize.endsWith('px')) {
                    // Try to convert numeric values without units to px
                    const numericValue = parseFloat(fontSize);
                    if (!isNaN(numericValue)) {
                        fontSizeInPx = `${numericValue}px`;
                    }
                }

                // Find the closest matching font size in our options
                const matchedSize = fontSizes.find(s => s.value === fontSizeInPx);
                if (matchedSize) {
                    setCurrentFontSize(matchedSize.value);
                    foundFontSize = true;
                } else {
                    // If no exact match, find the closest size
                    const sizeInPx = parseInt(fontSizeInPx);
                    if (!isNaN(sizeInPx)) {
                        let closestSize = fontSizes[getDefaultFontSizeIndex()].value;
                        let minDiff = Number.MAX_VALUE;

                        fontSizes.forEach(size => {
                            const sizeValue = parseInt(size.value);
                            const diff = Math.abs(sizeValue - sizeInPx);
                            if (diff < minDiff) {
                                minDiff = diff;
                                closestSize = size.value;
                            }
                        });

                        setCurrentFontSize(closestSize);
                        foundFontSize = true;
                    }
                }
            }
        }

        // If no font size was found in the content, use the default for the section type
        if (!foundFontSize) {
            setCurrentFontSize(fontSizes[getDefaultFontSizeIndex()].value);
        }

        // Check for text color - first try style attribute, then computed style
        let foundTextColor = false;

        // Check if this is the announcement template (which has green text that we don't want to use as default)
        const isAnnouncementTemplate = content.includes('new feature') && content.includes('#27ae60');

        // If it's the announcement template, always set the default color to black
        if (isAnnouncementTemplate) {
            setCurrentColor('#000000');
            foundTextColor = true;
        } else {
            // First check for explicit color style
            const colorElements = tempDiv.querySelectorAll('[style*="color:"]');
            if (colorElements.length > 0) {
                // Use the last element with a color style
                const lastColorElement = colorElements[colorElements.length - 1];
                const style = lastColorElement.getAttribute('style') || '';
                const colorMatch = style.match(/color:\s*([^;]+)/);
                if (colorMatch && colorMatch[1]) {
                    const color = colorMatch[1].trim();
                    if (color !== 'inherit' && color !== 'initial' && color !== 'transparent') {
                        setCurrentColor(color);
                        foundTextColor = true;
                    }
                }
            }

            // If no explicit color style, check for font color or span with color
            if (!foundTextColor) {
                // Check for font tag with color attribute
                const fontElements = tempDiv.querySelectorAll('font[color]');
                if (fontElements.length > 0) {
                    // Use the last font element with a color attribute
                    const lastFontElement = fontElements[fontElements.length - 1];
                    const color = lastFontElement.getAttribute('color');
                    if (color && color !== 'inherit' && color !== 'initial' && color !== 'transparent') {
                        setCurrentColor(color);
                        foundTextColor = true;
                    }
                }

                // If still no color found, try to get computed style from the first text node
                if (!foundTextColor) {
                    const textNodes = Array.from(tempDiv.querySelectorAll('*')).filter(el =>
                        el.childNodes.length > 0 &&
                        Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
                    );

                    if (textNodes.length > 0) {
                        // Use the last text node instead of the first one to get the most recent color
                        const lastTextNode = textNodes[textNodes.length - 1];

                        // Create a temporary element to compute the style
                        const tempEl = document.createElement('div');
                        document.body.appendChild(tempEl);
                        tempEl.innerHTML = lastTextNode.outerHTML;

                        const computedStyle = window.getComputedStyle(tempEl.firstElementChild as HTMLElement);
                        const color = computedStyle.color;

                        if (color && color !== 'inherit' && color !== 'initial' && color !== 'rgba(0, 0, 0, 0)') {
                            setCurrentColor(color);
                            foundTextColor = true;
                        }

                        // Clean up
                        document.body.removeChild(tempEl);
                    }
                }
            }
        }

        // If no text color was found, use the default for the section type
        if (!foundTextColor) {
            setCurrentColor(sectionType === 'footer' ? '#6B7280' : '#000000');
        }

        // Check for background color
        const bgColorElement = tempDiv.querySelector('[style*="background-color:"]');
        if (bgColorElement) {
            const style = bgColorElement.getAttribute('style') || '';
            const bgColorMatch = style.match(/background-color:\s*([^;]+)/);
            if (bgColorMatch && bgColorMatch[1]) {
                const bgColor = bgColorMatch[1].trim().toLowerCase();
                // Only set a non-transparent background color if it's explicitly defined
                // and is not transparent, inherit, initial, or any variation of white
                if (bgColor !== 'transparent' &&
                    bgColor !== 'inherit' &&
                    bgColor !== 'initial' &&
                    bgColor !== '#ffffff' &&
                    bgColor !== '#fff' &&
                    bgColor !== 'white' &&
                    !bgColor.match(/rgba?\s*\(\s*255\s*,\s*255\s*,\s*255\s*/) &&
                    !bgColor.match(/rgba?\s*\(\s*255\s*,\s*255\s*,\s*255\s*,\s*[01](\.\d+)?\s*\)/)) {
                    setCurrentBgColor(bgColor);
                } else {
                    // Always set white or transparent colors to 'transparent'
                    setCurrentBgColor('transparent');
                }
            } else {
                setCurrentBgColor('transparent');
            }
        } else {
            setCurrentBgColor('transparent');
        }

        // Check for bold
        const boldElement = tempDiv.querySelector('strong, b, [style*="font-weight: bold"], [style*="font-weight:bold"]');

        // For initial render, we need to check if the last text in the content is bold
        if (isInitialRender.current) {
            // Find all text nodes
            const textNodes = Array.from(tempDiv.querySelectorAll('*')).filter(el =>
                el.childNodes.length > 0 &&
                Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
            );

            if (textNodes.length > 0) {
                // Get the last text node
                const lastTextNode = textNodes[textNodes.length - 1];

                // Check if the last text node is bold or has a bold parent
                let isBold = false;

                // Check if the node itself is a bold element
                if (lastTextNode.nodeName === 'STRONG' || lastTextNode.nodeName === 'B') {
                    isBold = true;
                } else {
                    // Check if the node has a style with font-weight: bold
                    const style = (lastTextNode as HTMLElement).getAttribute('style') || '';
                    if (style.includes('font-weight: bold') || style.includes('font-weight:bold')) {
                        isBold = true;
                    } else {
                        // Check if any parent is a bold element
                        let parent = lastTextNode.parentElement;
                        while (parent && parent !== tempDiv) {
                            if (parent.nodeName === 'STRONG' || parent.nodeName === 'B') {
                                isBold = true;
                                break;
                            }

                            // Check parent style
                            const parentStyle = parent.getAttribute('style') || '';
                            if (parentStyle.includes('font-weight: bold') || parentStyle.includes('font-weight:bold')) {
                                isBold = true;
                                break;
                            }

                            parent = parent.parentElement;
                        }

                        // If still not determined, check computed style
                        if (!isBold) {
                            try {
                                const computedStyle = window.getComputedStyle(lastTextNode as HTMLElement);
                                const fontWeight = computedStyle.fontWeight;
                                isBold = fontWeight === 'bold' || fontWeight === '700';
                            } catch (e) {
                                // If we can't compute style, fall back to checking if there's any bold element
                                isBold = !!boldElement;
                            }
                        }
                    }
                }

                setIsBold(isBold);
            } else {
                // If no text nodes, set bold to false
                setIsBold(false);
            }
        } else {
            // For non-initial render, use the standard detection
            setIsBold(!!boldElement);
        }

        // Check for italic
        const italicElement = tempDiv.querySelector('em, i, [style*="font-style: italic"], [style*="font-style:italic"]');

        // For initial render, check if the last text in the content is italic
        if (isInitialRender.current) {
            // Reuse the text nodes we found for bold
            const textNodes = Array.from(tempDiv.querySelectorAll('*')).filter(el =>
                el.childNodes.length > 0 &&
                Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
            );

            if (textNodes.length > 0) {
                // Get the last text node
                const lastTextNode = textNodes[textNodes.length - 1];

                // Check if the last text node is italic or has an italic parent
                let isItalic = false;

                // Check if the node itself is an italic element
                if (lastTextNode.nodeName === 'EM' || lastTextNode.nodeName === 'I') {
                    isItalic = true;
                } else {
                    // Check if the node has a style with font-style: italic
                    const style = (lastTextNode as HTMLElement).getAttribute('style') || '';
                    if (style.includes('font-style: italic') || style.includes('font-style:italic')) {
                        isItalic = true;
                    } else {
                        // Check if any parent is an italic element
                        let parent = lastTextNode.parentElement;
                        while (parent && parent !== tempDiv) {
                            if (parent.nodeName === 'EM' || parent.nodeName === 'I') {
                                isItalic = true;
                                break;
                            }

                            // Check parent style
                            const parentStyle = parent.getAttribute('style') || '';
                            if (parentStyle.includes('font-style: italic') || parentStyle.includes('font-style:italic')) {
                                isItalic = true;
                                break;
                            }

                            parent = parent.parentElement;
                        }

                        // If still not determined, check computed style
                        if (!isItalic) {
                            try {
                                const computedStyle = window.getComputedStyle(lastTextNode as HTMLElement);
                                isItalic = computedStyle.fontStyle === 'italic';
                            } catch (e) {
                                // If we can't compute style, fall back to checking if there's any italic element
                                isItalic = !!italicElement;
                            }
                        }
                    }
                }

                setIsItalic(isItalic);
            } else {
                // If no text nodes, set italic to false
                setIsItalic(false);
            }
        } else {
            // For non-initial render, use the standard detection
            setIsItalic(!!italicElement);
        }

        // Check for underline
        const underlineElement = tempDiv.querySelector('u, [style*="text-decoration: underline"], [style*="text-decoration:underline"]');

        // For initial render, check if the last text in the content is underlined
        if (isInitialRender.current) {
            // Reuse the text nodes we found for bold
            const textNodes = Array.from(tempDiv.querySelectorAll('*')).filter(el =>
                el.childNodes.length > 0 &&
                Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
            );

            if (textNodes.length > 0) {
                // Get the last text node
                const lastTextNode = textNodes[textNodes.length - 1];

                // Check if the last text node is underlined or has an underlined parent
                let isUnderline = false;

                // Check if the node itself is an underline element
                if (lastTextNode.nodeName === 'U') {
                    isUnderline = true;
                } else {
                    // Check if the node has a style with text-decoration: underline
                    const style = (lastTextNode as HTMLElement).getAttribute('style') || '';
                    if (style.includes('text-decoration: underline') || style.includes('text-decoration:underline')) {
                        isUnderline = true;
                    } else {
                        // Check if any parent is an underline element
                        let parent = lastTextNode.parentElement;
                        while (parent && parent !== tempDiv) {
                            if (parent.nodeName === 'U') {
                                isUnderline = true;
                                break;
                            }

                            // Check parent style
                            const parentStyle = parent.getAttribute('style') || '';
                            if (parentStyle.includes('text-decoration: underline') || parentStyle.includes('text-decoration:underline')) {
                                isUnderline = true;
                                break;
                            }

                            parent = parent.parentElement;
                        }

                        // If still not determined, check computed style
                        if (!isUnderline) {
                            try {
                                const computedStyle = window.getComputedStyle(lastTextNode as HTMLElement);
                                isUnderline = computedStyle.textDecoration.includes('underline');
                            } catch (e) {
                                // If we can't compute style, fall back to checking if there's any underline element
                                isUnderline = !!underlineElement;
                            }
                        }
                    }
                }

                setIsUnderline(isUnderline);
            } else {
                // If no text nodes, set underline to false
                setIsUnderline(false);
            }
        } else {
            // For non-initial render, use the standard detection
            setIsUnderline(!!underlineElement);
        }

        // Check for text alignment
        const alignElements = {
            center: tempDiv.querySelector('[style*="text-align: center"], [style*="text-align:center"], [align="center"]'),
            right: tempDiv.querySelector('[style*="text-align: right"], [style*="text-align:right"], [align="right"]'),
            left: tempDiv.querySelector('[style*="text-align: left"], [style*="text-align:left"], [align="left"]')
        };

        if (alignElements.center) setTextAlign('center');
        else if (alignElements.right) setTextAlign('right');
        else setTextAlign('left');
    };

    // Check formatting on selection change
    const checkFormatting = () => {
        if (!document.activeElement || !editorRef.current || !editorRef.current.contains(document.activeElement)) {
            return;
        }

        // Get the current selection
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        // Get the current range
        const range = selection.getRangeAt(0);

        // Check if the current selection or cursor position has bold formatting
        const isBoldActive = document.queryCommandState('bold');
        setIsBold(isBoldActive);

        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));

        // Check alignment
        if (document.queryCommandState('justifyCenter')) {
            setTextAlign('center');
        } else if (document.queryCommandState('justifyRight')) {
            setTextAlign('right');
        } else {
            setTextAlign('left');
        }

        // Check for text color
        if (selection.rangeCount > 0) {
            let textColor = null; // Use null to indicate no color was found

            // If there's no selection, check the current node and its parents
            if (range.collapsed) {
                let currentNode = range.startContainer;

                // If it's a text node, start with its parent
                if (currentNode.nodeType === Node.TEXT_NODE) {
                    currentNode = currentNode.parentNode as Node;
                }

                while (currentNode && currentNode !== editorRef.current) {
                    if (currentNode.nodeType === Node.ELEMENT_NODE) {
                        const computedStyle = window.getComputedStyle(currentNode as HTMLElement);
                        const color = computedStyle.color;

                        if (color &&
                            color !== 'inherit' &&
                            color !== 'initial' &&
                            color !== 'rgba(0, 0, 0, 0)') {
                            textColor = color;
                            break;
                        }
                    }
                    currentNode = currentNode.parentNode as Node;
                }
            } else {
                // For a selection, check if all selected nodes have the same text color
                const selectedNodes = getSelectedNodes(range);
                let foundTextColor = false;

                for (const node of selectedNodes) {
                    let nodeToCheck = node;

                    // If it's a text node, use its parent
                    if (node.nodeType === Node.TEXT_NODE) {
                        nodeToCheck = node.parentNode as Node;
                    }

                    if (nodeToCheck && nodeToCheck.nodeType === Node.ELEMENT_NODE) {
                        const computedStyle = window.getComputedStyle(nodeToCheck as HTMLElement);
                        const color = computedStyle.color;

                        if (color &&
                            color !== 'inherit' &&
                            color !== 'initial' &&
                            color !== 'rgba(0, 0, 0, 0)') {
                            if (!foundTextColor) {
                                textColor = color;
                                foundTextColor = true;
                            } else if (textColor !== color) {
                                // If different text colors are found, use the first one
                                // This ensures we always show a color from the selection
                                break;
                            }
                        }
                    }
                }
            }

            // Update the text color if we found one
            if (textColor !== null) {
                setCurrentColor(textColor);
            }
        }

        // Check for background color
        let bgColor = null; // Use null to indicate no color was found

        // If there's no selection, check the current node and its parents
        if (range.collapsed) {
            let currentNode = range.startContainer;

            // If it's a text node, start with its parent
            if (currentNode.nodeType === Node.TEXT_NODE) {
                currentNode = currentNode.parentNode as Node;
            }

            while (currentNode && currentNode !== editorRef.current) {
                if (currentNode.nodeType === Node.ELEMENT_NODE) {
                    const computedStyle = window.getComputedStyle(currentNode as HTMLElement);
                    const backgroundColor = computedStyle.backgroundColor;

                    if (backgroundColor &&
                        backgroundColor !== 'transparent' &&
                        backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                        backgroundColor !== 'rgb(255, 255, 255)') {
                        bgColor = backgroundColor;
                        break;
                    }
                }
                currentNode = currentNode.parentNode as Node;
            }
        } else {
            // For a selection, check if all selected nodes have the same background color
            const selectedNodes = getSelectedNodes(range);
            let foundBgColor = false;

            for (const node of selectedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const computedStyle = window.getComputedStyle(node as HTMLElement);
                    const backgroundColor = computedStyle.backgroundColor;

                    if (backgroundColor &&
                        backgroundColor !== 'transparent' &&
                        backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                        backgroundColor !== 'rgb(255, 255, 255)') {
                        if (!foundBgColor) {
                            bgColor = backgroundColor;
                            foundBgColor = true;
                        } else if (bgColor !== backgroundColor) {
                            // If different background colors are found, use null to keep current color
                            bgColor = null;
                            break;
                        }
                    }
                }
            }
        }

        // Only update the background color if we found one
        // This preserves the current selection when making a new selection
        if (bgColor !== null) {
            setCurrentBgColor(bgColor);
        }
    };

    // Add event listeners for selection changes
    useEffect(() => {
        const handleSelectionChange = () => {
            if (document.activeElement === editorRef.current) {
                checkFormatting();
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkFormatting]);

    // Handle content changes
    const handleContentChange = () => {
        if (!editorRef.current || isUpdatingContent.current) return;

        // Get the updated HTML content
        const newContent = editorRef.current.innerHTML;

        // Ensure consistent font size in the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newContent;

        // Check if there are elements without font size
        const allElements = tempDiv.querySelectorAll('*');
        let contentChanged = false;

        allElements.forEach(el => {
            // Skip elements that shouldn't have font size (like br)
            if (el.nodeName === 'BR') return;

            const style = (el as HTMLElement).getAttribute('style') || '';

            // Only add font-size if it's not already specified
            if (!style.includes('font-size')) {
                // For elements that should inherit parent font size, skip
                if (el.nodeName === 'STRONG' || el.nodeName === 'EM' || el.nodeName === 'U' ||
                    el.nodeName === 'B' || el.nodeName === 'I' || el.nodeName === 'SPAN') {
                    return;
                }

                // Add the current font size
                if (style) {
                    (el as HTMLElement).setAttribute('style', `${style}; font-size: ${currentFontSize};`);
                } else {
                    (el as HTMLElement).setAttribute('style', `font-size: ${currentFontSize};`);
                }
                contentChanged = true;
            } else if (style.includes('font-size') && !style.includes(currentFontSize)) {
                // If font-size exists but doesn't match current font size, update it
                const updatedStyle = style.replace(
                    /font-size:\s*([^;]+)(;|$)/g,
                    `font-size: ${currentFontSize}$2`
                );
                (el as HTMLElement).setAttribute('style', updatedStyle);
                contentChanged = true;
            }
        });

        // Update the content with the fixed font sizes if needed
        const updatedContent = contentChanged ? tempDiv.innerHTML : newContent;

        // Only update if content has actually changed
        if (updatedContent !== htmlContent) {
            setHtmlContent(updatedContent);
            onChange(updatedContent);

            // Update the editor content if needed and if content was changed by our modifications
            if (contentChanged && editorRef.current.innerHTML !== updatedContent) {
                // Save current selection
                const selection = window.getSelection();
                let range = null;
                let startContainer = null;
                let startOffset = 0;
                let endContainer = null;
                let endOffset = 0;

                if (selection && selection.rangeCount > 0) {
                    range = selection.getRangeAt(0);
                    startContainer = range.startContainer;
                    startOffset = range.startOffset;
                    endContainer = range.endContainer;
                    endOffset = range.endOffset;
                }

                // Update content
                isUpdatingContent.current = true;
                editorRef.current.innerHTML = updatedContent;
                isUpdatingContent.current = false;

                // Restore selection if possible
                if (range && startContainer && endContainer) {
                    try {
                        // Try to find the same nodes in the updated DOM
                        // This is a simplified approach and might not work in all cases
                        const newRange = document.createRange();
                        newRange.setStart(startContainer, startOffset);
                        newRange.setEnd(endContainer, endOffset);

                        selection?.removeAllRanges();
                        selection?.addRange(newRange);
                    } catch (e) {
                        console.error('Could not restore selection:', e);
                    }
                }
            }
        }

        // Check formatting state
        checkFormatting();
    };

    // Execute command with selection preservation
    const execFormatCommand = (command: string, value?: string) => {
        if (!editorRef.current) return;

        // Focus the editor
        editorRef.current.focus();

        // Execute the command
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand(command, false, value);

        // Update formatting state immediately for better UX
        if (command === 'bold') setIsBold(document.queryCommandState('bold'));
        if (command === 'italic') setIsItalic(document.queryCommandState('italic'));
        if (command === 'underline') setIsUnderline(document.queryCommandState('underline'));

        // Update alignment state
        if (command === 'justifyLeft') setTextAlign('left');
        if (command === 'justifyCenter') setTextAlign('center');
        if (command === 'justifyRight') setTextAlign('right');

        // Update content state
        handleContentChange();
    };

    // Apply heading format
    const applyHeading = (headingTag: string) => {
        if (!editorRef.current) return;

        // Focus the editor
        editorRef.current.focus();

        try {
            // First try the standard approach with proper HTML tags
            if (headingTag === 'p') {
                document.execCommand('formatBlock', false, '<p>');
            } else {
                document.execCommand('formatBlock', false, `<${headingTag}>`);
            }
        } catch (e) {
            // Fallback for browsers that don't support formatBlock with tags
            try {
                document.execCommand('formatBlock', false, headingTag);
            } catch (e2) {
                console.error("Error applying heading:", e2);
            }
        }

        setShowHeadingMenu(false);
        handleContentChange();
    };

    // Apply font family
    const applyFontFamily = (fontFamily: string) => {
        if (!editorRef.current) return;

        // Focus the editor
        editorRef.current.focus();

        document.execCommand('fontName', false, fontFamily);
        setCurrentFontFamily(fontFamily);
        setShowFontFamily(false);

        handleContentChange();
    };

    // Apply font size
    const applyFontSize = (size: string) => {
        if (!editorRef.current) return;

        // Focus the editor
        editorRef.current.focus();

        // Get the current selection
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            // If there's a selection, apply font size to the selected text
            if (!range.collapsed) {
                // Use execCommand for font size
                document.execCommand('fontSize', false, '7');

                // Get all font elements just created (they have size=7)
                const fontElements = document.querySelectorAll('font[size="7"]');
                fontElements.forEach(el => {
                    // Replace the size attribute with a style
                    el.removeAttribute('size');
                    (el as HTMLElement).style.fontSize = size;
                });
            } else {
                // If no selection, apply to the current paragraph or create a new one
                const parentElement = findParentElement(range.startContainer, 'p, h1, h2, h3, h4, h5, h6, div');

                if (parentElement) {
                    // Apply font size to the parent element
                    parentElement.style.fontSize = size;
                } else {
                    // Create a new paragraph with the font size
                    const newParagraph = document.createElement('p');
                    newParagraph.style.fontSize = size;
                    newParagraph.innerHTML = '<br>';

                    // Insert the new paragraph
                    range.insertNode(newParagraph);

                    // Move cursor inside the new paragraph
                    range.selectNodeContents(newParagraph);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }

        setCurrentFontSize(size);
        setShowFontSize(false);

        handleContentChange();
    };

    // Apply font color
    const applyFontColor = (color: string) => {
        if (!editorRef.current) return;

        // Focus the editor
        editorRef.current.focus();

        // Apply the color
        document.execCommand('foreColor', false, color);
        setCurrentColor(color);
        setShowFontColor(false);

        // If this is a footer section and we're initializing (not user selection),
        // ensure all text is grey by default
        if (sectionType === 'footer' && isInitialRender.current) {
            // Select all text in the editor
            const range = document.createRange();
            range.selectNodeContents(editorRef.current);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);

                // Apply grey color to all text
                document.execCommand('foreColor', false, '#6B7280');

                // Clear selection
                selection.removeAllRanges();
            }
        }

        handleContentChange();
    };

    // Apply background color
    const applyBackgroundColor = (colorValue: string) => {
        if (!editorRef.current) return;

        // Focus the editor
        editorRef.current.focus();

        // Set flag to prevent selection change handler from interfering
        setIsApplyingBgColor(true);

        if (colorValue === 'transparent') {
            // Remove background color using execCommand
            document.execCommand('backColor', false, 'transparent');

            // Additional handling for complex cases
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                // If there's no selection, try to remove background color from the current paragraph
                if (range.collapsed) {
                    // Find the current paragraph or block element
                    const parentElement = findParentElement(range.startContainer, 'p, div, h1, h2, h3, h4, h5, h6, span, font');
                    if (parentElement) {
                        parentElement.style.backgroundColor = '';

                        // Also check for any child elements with background colors
                        const elementsWithBgColor = parentElement.querySelectorAll('[style*="background-color"]');
                        elementsWithBgColor.forEach(el => {
                            (el as HTMLElement).style.backgroundColor = '';
                        });
                    }

                    // Also check for any parent elements with background colors
                    let currentNode = range.startContainer;
                    while (currentNode && currentNode !== editorRef.current) {
                        if (currentNode.nodeType === Node.ELEMENT_NODE) {
                            (currentNode as HTMLElement).style.backgroundColor = '';
                        }
                        currentNode = currentNode.parentNode as Node;
                    }
                } else {
                    // Get selected nodes
                    const selectedNodes = getSelectedNodes(range);

                    // Remove background color from each node
                    selectedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            (node as HTMLElement).style.backgroundColor = '';

                            // Also check for any child elements with background colors
                            const elementsWithBgColor = (node as HTMLElement).querySelectorAll('[style*="background-color"]');
                            elementsWithBgColor.forEach(el => {
                                (el as HTMLElement).style.backgroundColor = '';
                            });
                        } else if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
                            // For text nodes, we need to check the parent
                            const parent = node.parentNode as HTMLElement;
                            if (parent && parent !== editorRef.current) {
                                parent.style.backgroundColor = '';
                            }
                        }
                    });

                    // Also check the common ancestor container
                    if (range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE) {
                        (range.commonAncestorContainer as HTMLElement).style.backgroundColor = '';
                    }
                }
            }
        } else {
            // Apply background color
            document.execCommand('hiliteColor', false, colorValue);
        }

        setCurrentBgColor(colorValue);
        setShowBgColor(false);

        handleContentChange();

        // Reset flag after a short delay to allow the operation to complete
        setTimeout(() => {
            setIsApplyingBgColor(false);
        }, 100);
    };

    // Apply list (ordered or unordered)
    const applyList = (listType: 'ordered' | 'unordered') => {
        if (!editorRef.current) return;

        // Focus the editor
        editorRef.current.focus();

        // Get the current selection
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);

        // Determine if we're already in a list
        const parentList = findParentElement(range.commonAncestorContainer, 'UL, OL');

        if (parentList) {
            // We're already in a list, so we should remove it
            const fragment = document.createDocumentFragment();
            const items = parentList.querySelectorAll('li');

            items.forEach(item => {
                const p = document.createElement('p');
                p.innerHTML = item.innerHTML;
                fragment.appendChild(p);
            });

            parentList.parentNode?.replaceChild(fragment, parentList);
        } else {
            // We're not in a list, so create one
            const listTag = listType === 'ordered' ? 'ol' : 'ul';

            // Get the text content
            let content = '';

            if (range.collapsed) {
                // If no text is selected, just create an empty list item
                content = '<li><br></li>';
            } else {
                // If text is selected, wrap it in a list item
                const selectedText = range.toString();
                if (selectedText) {
                    // Check if the selection spans multiple paragraphs
                    if (selectedText.includes('\n')) {
                        const lines = selectedText.split('\n');
                        content = lines.map(line => `<li>${line}</li>`).join('');
                    } else {
                        content = `<li>${selectedText}</li>`;
                    }
                } else {
                    content = '<li><br></li>';
                }
            }

            // Create the list HTML
            const listHTML = `<${listTag}>${content}</${listTag}>`;

            // Insert the list
            document.execCommand('insertHTML', false, listHTML);
        }

        // Update content state
        setTimeout(() => {
            if (editorRef.current) {
                const newContent = editorRef.current.innerHTML;
                setHtmlContent(newContent);
                onChange(newContent);
            }
        }, 10);
    };

    // Helper function to find parent element matching a selector
    const findParentElement = (node: Node, selector: string): HTMLElement | null => {
        let currentNode: Node | null = node;

        while (currentNode && currentNode.nodeType !== Node.ELEMENT_NODE) {
            currentNode = currentNode.parentNode;
        }

        if (!currentNode) return null;

        let element = currentNode as HTMLElement;

        while (element) {
            if (element.matches && element.matches(selector)) {
                return element;
            }

            if (!element.parentElement) break;
            element = element.parentElement;
        }

        return null;
    };

    // Helper function to get all nodes in a selection
    const getSelectedNodes = (range: Range): Node[] => {
        const nodes: Node[] = [];
        const walker = document.createTreeWalker(
            range.commonAncestorContainer,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node: Node): number {
                    if (range.intersectsNode(node)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );

        let currentNode = walker.currentNode;

        if (currentNode) {
            if (range.intersectsNode(currentNode)) {
                nodes.push(currentNode);
            }

            let nextNode = walker.nextNode();
            while (nextNode) {
                if (range.intersectsNode(nextNode)) {
                    nodes.push(nextNode);
                }
                nextNode = walker.nextNode();
            }
        }

        return nodes;
    };

    // Handle editor focus
    const handleEditorFocus = () => {
        if (!editorRef.current) return;

        // If the editor is empty, initialize with default styles
        if (editorRef.current.innerHTML === '' || editorRef.current.innerHTML === '<p></p>' || editorRef.current.innerHTML === '<p><br></p>') {
            // Apply default font family
            document.execCommand('fontName', false, currentFontFamily);

            // Apply default font size (using size 7 as a placeholder that we'll replace with our actual size)
            document.execCommand('fontSize', false, '7');

            // Get all font elements just created (they have size=7)
            const fontElements = document.querySelectorAll('font[size="7"]');
            fontElements.forEach(el => {
                // Replace the size attribute with a style
                el.removeAttribute('size');
                (el as HTMLElement).style.fontSize = currentFontSize;
            });

            // Apply default text color
            document.execCommand('foreColor', false, currentColor);

            // We intentionally don't apply a background color here
            // to ensure no highlight color is selected by default

            // Reset formatting states for empty content
            setIsBold(false);
            setIsItalic(false);
            setIsUnderline(false);
        } else {
            // For non-empty content, check the current formatting at cursor position
            setTimeout(() => {
                checkFormatting();
            }, 0);
        }
    };

    // Function to handle clicks outside of sections
    const handleOutsideClick = (e: React.MouseEvent) => {
        // Check if the click is on the container but not on a section
        if ((e.target as HTMLElement).classList.contains('email-content-container')) {
            setEditingSection(null);
            setIsEditingStyle(false);
        }
    };

    return (
        <div className={`rich-text-editor ${className || ''}`}>
            <div className="flex flex-wrap gap-1 mb-2 p-1 bg-gray-50 rounded-md dark:bg-gray-900">
                {/* Font family dropdown - Google Docs style */}
                <div className="relative">
                    <Tooltip content="Font family">
                        <Button
                            variant="ghost"
                            className={`h-8 px-2 py-0 text-sm flex items-center justify-between min-w-[100px] ${showFontFamily ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                            onClick={() => setShowFontFamily(!showFontFamily)}
                        >
                            <span style={{ fontFamily: currentFontFamily }}>{currentFontFamily.split(',')[0].replace(/['"]/g, '')}</span>
                            <RiArrowDownSLine className="h-4 w-4 ml-1" />
                        </Button>
                    </Tooltip>
                    {showFontFamily && (
                        <div className="absolute top-full left-0 mt-1 w-[200px] bg-white dark:bg-gray-950 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-20 max-h-[300px] overflow-y-auto">
                            {fontFamilies.map((font) => (
                                <button
                                    key={font.value}
                                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 ${currentFontFamily === font.value ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                                    style={{ fontFamily: font.value }}
                                    onClick={() => applyFontFamily(font.value)}
                                >
                                    {font.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Font size dropdown - Google Docs style */}
                <div className="relative">
                    <Tooltip content="Font size">
                        <Button
                            variant="ghost"
                            className={`h-8 px-2 py-0 text-sm flex items-center justify-between min-w-[60px] ${showFontSize ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                            onClick={() => setShowFontSize(!showFontSize)}
                        >
                            <span>{currentFontSize.replace('px', '')}</span>
                            <RiArrowDownSLine className="h-4 w-4 ml-1" />
                        </Button>
                    </Tooltip>
                    {showFontSize && (
                        <div className="absolute top-full left-0 mt-1 w-[80px] bg-white dark:bg-gray-950 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-20 max-h-[300px] overflow-y-auto">
                            {fontSizes.map((size) => (
                                <button
                                    key={size.value}
                                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 ${currentFontSize === size.value ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                                    onClick={() => applyFontSize(size.value)}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* Text formatting */}
                <Tooltip content="Bold (Ctrl+B)">
                    <Button
                        variant="ghost"
                        className={`h-8 w-8 p-0 ${isBold ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => execFormatCommand('bold')}
                    >
                        <RiBold className="h-4 w-4" />
                    </Button>
                </Tooltip>
                <Tooltip content="Italic (Ctrl+I)">
                    <Button
                        variant="ghost"
                        className={`h-8 w-8 p-0 ${isItalic ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => execFormatCommand('italic')}
                    >
                        <RiItalic className="h-4 w-4" />
                    </Button>
                </Tooltip>
                <Tooltip content="Underline (Ctrl+U)">
                    <Button
                        variant="ghost"
                        className={`h-8 w-8 p-0 ${isUnderline ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => execFormatCommand('underline')}
                    >
                        <RiUnderline className="h-4 w-4" />
                    </Button>
                </Tooltip>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* Font color dropdown - Google Docs style */}
                <div className="relative">
                    <div className="flex items-center">
                        <Tooltip content="Text color">
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 flex items-center justify-center relative"
                                onClick={() => applyFontColor(currentColor)}
                            >
                                <span className="font-bold text-lg" style={{ color: currentColor }}>A</span>
                                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: currentColor }}></div>
                            </Button>
                        </Tooltip>
                        <Button
                            variant="ghost"
                            className="h-8 w-4 p-0 flex items-center justify-center"
                            onClick={() => setShowFontColor(!showFontColor)}
                        >
                            <RiArrowDownSLine className="h-4 w-4" />
                        </Button>
                    </div>
                    {showFontColor && (
                        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-950 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-20 p-2 w-[280px]">
                            <div className="mb-2">
                                <div className="text-xs font-medium text-gray-500 mb-1">Basic Colors</div>
                                <div className="grid grid-cols-8 gap-1">
                                    {fontColors.slice(0, 16).map((color) => (
                                        <button
                                            key={color.value}
                                            className={`w-8 h-8 rounded-sm ${color.class} hover:ring-2 hover:ring-gray-400 ${currentColor === color.value ? 'ring-2 ring-blue-500' : ''}`}
                                            title={color.label}
                                            onClick={() => applyFontColor(color.value)}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="text-xs font-medium text-gray-500 mb-1">Dark Colors</div>
                                <div className="grid grid-cols-8 gap-1">
                                    {fontColors.slice(16, 21).map((color) => (
                                        <button
                                            key={color.value}
                                            className={`w-8 h-8 rounded-sm ${color.class} hover:ring-2 hover:ring-gray-400 ${currentColor === color.value ? 'ring-2 ring-blue-500' : ''}`}
                                            title={color.label}
                                            onClick={() => applyFontColor(color.value)}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Light Colors</div>
                                <div className="grid grid-cols-8 gap-1">
                                    {fontColors.slice(21).map((color) => (
                                        <button
                                            key={color.value}
                                            className={`w-8 h-8 rounded-sm ${color.class} hover:ring-2 hover:ring-gray-400 ${currentColor === color.value ? 'ring-2 ring-blue-500' : ''}`}
                                            title={color.label}
                                            onClick={() => applyFontColor(color.value)}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="text-xs font-medium text-gray-500 mb-1">Custom Color</div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={currentColor}
                                        onChange={(e) => applyFontColor(e.target.value)}
                                        className="w-8 h-8 cursor-pointer rounded-sm border border-gray-300"
                                    />
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        {currentColor.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Background color / Highlight dropdown - Google Docs style */}
                <div className="relative">
                    <div className="flex items-center">
                        <Tooltip content={currentBgColor === 'transparent' ? "No highlight color" : "Highlight color"}>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 flex items-center justify-center relative"
                                onClick={() => applyBackgroundColor(currentBgColor)}
                            >
                                <RiMarkPenLine className={`h-4 w-4 ${currentBgColor === 'transparent' ? 'text-gray-500' : ''}`} />
                                {currentBgColor !== 'transparent' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1"
                                        style={{
                                            backgroundColor: currentBgColor
                                        }}
                                    ></div>
                                )}
                            </Button>
                        </Tooltip>
                        <Button
                            variant="ghost"
                            className="h-8 w-4 p-0 flex items-center justify-center"
                            onClick={() => setShowBgColor(!showBgColor)}
                        >
                            <RiArrowDownSLine className="h-4 w-4" />
                        </Button>
                    </div>
                    {showBgColor && (
                        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-950 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-20 p-2 w-[200px]">
                            <div className="grid grid-cols-5 gap-1">
                                {backgroundColors.map((color) => (
                                    <button
                                        key={color.value}
                                        className={`w-8 h-8 rounded-sm ${color.class} hover:ring-2 hover:ring-gray-400 ${currentBgColor === color.value ? 'ring-2 ring-blue-500' : ''}`}
                                        title={color.label}
                                        onClick={() => applyBackgroundColor(color.value)}
                                    ></button>
                                ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="text-xs font-medium text-gray-500 mb-1">Custom Color</div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={currentBgColor === 'transparent' ? '#ffffff' : currentBgColor}
                                        onChange={(e) => applyBackgroundColor(e.target.value)}
                                        className="w-8 h-8 cursor-pointer rounded-sm border border-gray-300"
                                        disabled={currentBgColor === 'transparent'}
                                    />
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        {currentBgColor === 'transparent' ? 'No Color' : currentBgColor.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* Text alignment */}
                <Tooltip content="Align left">
                    <Button
                        variant="ghost"
                        className={`h-8 w-8 p-0 ${textAlign === 'left' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => execFormatCommand('justifyLeft')}
                    >
                        <RiAlignLeft className="h-4 w-4" />
                    </Button>
                </Tooltip>
                <Tooltip content="Align center">
                    <Button
                        variant="ghost"
                        className={`h-8 w-8 p-0 ${textAlign === 'center' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => execFormatCommand('justifyCenter')}
                    >
                        <RiAlignCenter className="h-4 w-4" />
                    </Button>
                </Tooltip>
                <Tooltip content="Align right">
                    <Button
                        variant="ghost"
                        className={`h-8 w-8 p-0 ${textAlign === 'right' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => execFormatCommand('justifyRight')}
                    >
                        <RiAlignRight className="h-4 w-4" />
                    </Button>
                </Tooltip>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* List formatting */}
                <Tooltip content="Bullet list">
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => applyList('unordered')}
                    >
                        <RiListUnordered className="h-4 w-4" />
                    </Button>
                </Tooltip>
                <Tooltip content="Numbered list">
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => applyList('ordered')}
                    >
                        <RiListOrdered className="h-4 w-4" />
                    </Button>
                </Tooltip>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* Link */}
                <Tooltip content="Insert link">
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            const url = prompt('Enter link URL:');
                            if (url) {
                                document.execCommand('createLink', false, url);
                                handleContentChange();
                            }
                        }}
                    >
                        <RiLink className="h-4 w-4" />
                    </Button>
                </Tooltip>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleContentChange}
                onBlur={handleContentChange}
                onFocus={handleEditorFocus}
                onMouseUp={checkFormatting}
                onKeyUp={checkFormatting}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 min-h-[150px] max-w-none"
                style={{
                    backgroundColor: 'white',
                    fontSize: currentFontSize, // Explicitly set the font size
                    fontFamily: currentFontFamily, // Explicitly set the font family
                    color: sectionType === 'footer' ? '#6B7280' : currentColor // Set grey color for footer sections
                }}
                spellCheck="false"
                data-gramm="false"
                onKeyDown={(e) => {
                    // Handle tab key to prevent losing focus
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
                    }

                    // Handle Enter key to preserve styling
                    if (e.key === 'Enter') {
                        e.preventDefault();

                        // Get the current selection
                        const selection = window.getSelection();
                        if (!selection || selection.rangeCount === 0) return;

                        // Get the current node where the cursor is
                        const range = selection.getRangeAt(0);
                        const node = range.startContainer;

                        // Find the closest parent element with styling
                        let parentElement = node.nodeType === Node.TEXT_NODE
                            ? node.parentElement
                            : node as HTMLElement;

                        // Check for active formatting commands
                        const isBold = document.queryCommandState('bold');
                        const isItalic = document.queryCommandState('italic');
                        const isUnderline = document.queryCommandState('underline');

                        // If we're in a text node inside a styled element, we want to preserve that styling
                        if (parentElement) {
                            // Get computed styles of the parent element
                            const computedStyle = window.getComputedStyle(parentElement);
                            const color = computedStyle.color;
                            const fontFamily = computedStyle.fontFamily;
                            const fontSize = computedStyle.fontSize;

                            // Build style string
                            let styleString = `color: ${color}; font-family: ${fontFamily}; font-size: ${fontSize}; margin: 0;`;
                            if (isBold) styleString += 'font-weight: bold;';
                            if (isItalic) styleString += 'font-style: italic;';
                            if (isUnderline) styleString += 'text-decoration: underline;';
                            styleString += '"';

                            // Create a new paragraph with the same styling
                            const newParagraph = `<p style="${styleString}"><br></p>`;

                            // Insert the new paragraph
                            document.execCommand('insertHTML', false, newParagraph);
                        } else {
                            // Fallback if we can't determine the parent element
                            let html = '<p';

                            // Add style attribute if we have any formatting
                            if (isBold || isItalic || isUnderline) {
                                html += ' style="';
                                if (isBold) html += 'font-weight: bold;';
                                if (isItalic) html += 'font-style: italic;';
                                if (isUnderline) html += 'text-decoration: underline;';
                                html += '"';
                            }

                            html += '><br></p>';
                            document.execCommand('insertHTML', false, html);
                        }

                        // Update content state
                        handleContentChange();
                    }
                }}
            />
        </div>
    );
};

// Custom Tabs components since they don't exist in the project
const Tabs = ({ value, onValueChange, className, children }: {
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
    children: React.ReactNode;
}) => (
    <div className={className}>{children}</div>
);

const TabsList = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800 ${className || ''}`}>{children}</div>
);

const TabsTrigger = ({ value, children }: { value: string; children: React.ReactNode }) => (
    <button
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
      ${value === 'design' ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-950 dark:text-gray-50' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
        onClick={() => { }}
    >
        {children}
    </button>
);

const TabsContent = ({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) => (
    <div className={className}>{children}</div>
);

// Custom Card components
const CardHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{children}</h3>
);

const CardDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-gray-500 dark:text-gray-400">{children}</p>
);

const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={className}>{children}</div>
);

const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={`flex items-center justify-end space-x-2 pt-4 ${className || ''}`}>{children}</div>
);

// Prebuilt template definitions
const prebuiltTemplates = [
    {
        id: 'welcome',
        name: 'Welcome email',
        description: 'A warm welcome message for new users',
        subject: 'Welcome to our community!',
        thumbnail: '📧',
        sections: [
            { id: 101, type: "header", content: "<h1 style='color: #4a86e8; font-weight: bold;'>Welcome to our community!</h1>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 102, type: "text", content: "We're <strong>thrilled</strong> to have you join us. Here's everything you need to know to <em>get started</em>.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 103, type: "button", content: "Get Started", link: "#", backgroundColor: 'transparent', textAlign: 'center' as const, padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'default' },
            { id: 104, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' }
        ]
    },
    {
        id: 'announcement',
        name: 'Announcement',
        description: 'Announce important news or updates',
        subject: 'Important announcement',
        thumbnail: '📢',
        sections: [
            { id: 201, type: "header", content: "<h2 style='color: #e74c3c; font-weight: bold;'>Important Announcement</h2>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 202, type: "text", content: "We have some <strong>exciting news</strong> to share with you! Our <span style='color: #27ae60;'>new feature</span> is now available.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 203, type: "button", content: "Learn more", link: "#", backgroundColor: 'transparent', textAlign: 'center' as const, padding: '1rem', margin: '0', buttonColor: 'secondary', buttonSize: 'default' },
            { id: 204, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' }
        ]
    },
    {
        id: 'newsletter',
        name: 'Monthly newsletter',
        description: 'Regular updates and news digest',
        subject: 'Your monthly newsletter',
        thumbnail: '📰',
        sections: [
            { id: 301, type: "header", content: "<h1 style='color: #9b59b6; font-weight: bold;'>Your Monthly Newsletter</h1>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 302, type: "text", content: "<h3>This Month's Highlights:</h3><ul><li><strong>New Feature Launch</strong>: We've released our new dashboard.</li><li><strong>Community Spotlight</strong>: Meet our most active members.</li><li><strong>Upcoming Events</strong>: Don't miss our webinar next week.</li></ul>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 303, type: "button", content: "Read full newsletter", link: "#", backgroundColor: 'transparent', textAlign: 'center' as const, padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'lg' },
            { id: 304, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>You're receiving this email because you subscribed to our newsletter.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' }
        ]
    },
    {
        id: 'invitation',
        name: 'Event invitation',
        description: 'Invite users to an upcoming event',
        subject: 'You\'re invited!',
        thumbnail: '🎉',
        sections: [
            { id: 401, type: "header", content: "<h1 style='color: #f39c12; font-weight: bold;'>You're Invited!</h1>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 402, type: "text", content: "Join us for our <strong>annual conference</strong> on <span style='background-color: #f8f9fa; padding: 2px 4px;'>June 15-17, 2025</span>. It's going to be an amazing event with speakers from around the world.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 403, type: "button", content: "RSVP now", link: "#", backgroundColor: 'transparent', textAlign: 'center' as const, padding: '1rem', margin: '0', buttonColor: 'destructive', buttonSize: 'default' },
            { id: 404, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>Location: Grand Hotel, 123 Main St, Anytown", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' }
        ]
    },
    {
        id: 'confirmation',
        name: 'Order confirmation',
        description: 'Confirm a user\'s purchase or order',
        subject: 'Your order confirmation',
        thumbnail: '✅',
        sections: [
            { id: 501, type: "header", content: "<h2 style='color: #2ecc71; font-weight: bold;'>Order Confirmation</h2>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 502, type: "text", content: "Thank you for your order! Your order <strong>#12345</strong> has been confirmed and is being processed.<br><br><span style='color: #7f8c8d;'>Order details:</span><br>1x Product A - $29.99<br>2x Product B - $39.98<br><strong>Total: $69.97</strong>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 503, type: "button", content: "Track order", link: "#", backgroundColor: 'transparent', textAlign: 'center' as const, padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'default' },
            { id: 504, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>Questions? Contact our support team.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' }
        ]
    },
    {
        id: 'feedback',
        name: 'Feedback request',
        description: 'Ask users for their feedback',
        subject: 'We value your feedback',
        thumbnail: '💬',
        sections: [
            { id: 601, type: "header", content: "<h2 style='color: #3498db; font-weight: bold;'>We Value Your Feedback</h2>", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 602, type: "text", content: "We're constantly working to improve our service and would love to hear your thoughts. <strong>Your feedback</strong> helps us make our product better for everyone.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' },
            { id: 603, type: "button", content: "Take our survey", link: "#", backgroundColor: 'transparent', textAlign: 'center' as const, padding: '1rem', margin: '0', buttonColor: 'ghost', buttonSize: 'default' },
            { id: 604, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>This survey will take approximately 5 minutes to complete.", backgroundColor: 'transparent', textAlign: 'left' as const, padding: '1rem', margin: '0' }
        ]
    }
];

// Define a Section type to fix type errors
type Section = {
    backgroundColor: string
    textAlign: "left" | "center" | "right"
    padding: string
    margin: string
    id: number
    type: string
    content: string
    link?: string
    buttonColor?: "primary" | "secondary" | "destructive" | "ghost" | "custom"
    buttonSize?: string
    height?: string
    alt?: string
    contentId?: string
    eventId?: string
    customButtonColor?: string
    buttonAlign?: "left" | "center" | "right"
    imageHeight?: string
    imageAlt?: string
    linkIcon?: string
    description?: string
    image?: string
    date?: string
    location?: string
    ctaText?: string
    // Attachment properties
    fileName?: string
    fileType?: string
    fileSize?: string
}

// Add this function before the EmailTemplateBuilder component
// Calculate contrast ratio to determine text color (black or white) based on background color
const getContrastRatio = (hexColor: string): string => {
    // Default to white text if no color or invalid color
    if (!hexColor || hexColor === 'transparent') return 'white';

    try {
        // Remove # if present
        const color = hexColor.replace('#', '');

        // Convert hex to RGB
        const r = parseInt(color.substring(0, 2), 16) || 0;
        const g = parseInt(color.substring(2, 4), 16) || 0;
        const b = parseInt(color.substring(4, 6), 16) || 0;

        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Return black for light colors, white for dark colors
        return luminance > 0.5 ? 'black' : 'white';
    } catch (error) {
        // Default to white on error
        return 'white';
    }
};

export default function EmailTemplateBuilder() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [step, setStep] = useState<'select' | 'edit'>('select')
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
    const [sections, setSections] = useState<Section[]>([])
    const [subject, setSubject] = useState('')
    const [editingSection, setEditingSection] = useState<number | null>(null)
    const [isEditingStyle, setIsEditingStyle] = useState(false)
    const [draggedSection, setDraggedSection] = useState<number | null>(null)

    // Get parameters from URL
    const templateIdParam = searchParams?.get('template')
    const modeParam = searchParams?.get('mode')
    const skipSelectionParam = searchParams?.get('skipSelection') === 'true'

    // Handle direct navigation to editor
    useEffect(() => {
        if (templateIdParam && skipSelectionParam) {
            selectTemplate(templateIdParam)
            setStep('edit')
        }
    }, [templateIdParam, skipSelectionParam])

    const selectTemplate = (templateId: string) => {
        // First try to find the template in prebuiltTemplates
        const template = prebuiltTemplates.find(t => t.id === templateId);
        
        if (template) {
            setSelectedTemplate(templateId);
            setSections(template.sections.map(section => ({
                ...section,
                backgroundColor: section.backgroundColor || 'transparent',
                textAlign: section.textAlign || 'left',
                padding: section.padding || '1rem',
                margin: section.margin || '0'
            })));
            setSubject(template.subject || '');
        } else {
            // If template not found in prebuiltTemplates, create a default template
            // This handles templates from the templates page that don't exist in prebuiltTemplates
            console.log(`Template ${templateId} not found in prebuiltTemplates, creating default template`);
            setSelectedTemplate(templateId);
            
            // Create default sections for the template
            setSections([
                { 
                    id: 101, 
                    type: "header", 
                    content: "<h1 style='color: #4a86e8; font-weight: bold;'>Email Template</h1>", 
                    backgroundColor: 'transparent', 
                    textAlign: 'left' as const, 
                    padding: '1rem', 
                    margin: '0' 
                },
                { 
                    id: 102, 
                    type: "text", 
                    content: "This is a sample email template. Edit this content to create your message.", 
                    backgroundColor: 'transparent', 
                    textAlign: 'left' as const, 
                    padding: '1rem', 
                    margin: '0' 
                },
                { 
                    id: 103, 
                    type: "footer", 
                    content: "© 2025 Your Company. All rights reserved.", 
                    backgroundColor: 'transparent', 
                    textAlign: 'left' as const, 
                    padding: '1rem', 
                    margin: '0' 
                }
            ]);
            setSubject('New Email Template');
        }
    }

    const proceedToEdit = () => {
        if (selectedTemplate) {
            setStep('edit');
        }
    }

    const addSection = (type: string) => {
        const newSection = {
            id: Date.now(),
            type,
            content: type === "header" ? "<h1>New header</h1>" :
                type === "text" ? "<p>New text block</p>" :
                    type === "button" ? "Button text" :
                        type === "image" ? "https://placehold.co/600x200/e2e8f0/1e293b?text=Image" :
                            type === "spacer" ? "" :
                                type === "content-link" ? "Link to content" :
                                    type === "event-link" ? "Link to event" :
                                        type === "attachment" ? "Document.pdf" :
                                            "<p>Footer content</p>",
            link: type === "button" || type === "content-link" || type === "event-link" ? "#" : undefined,
            backgroundColor: 'transparent',
            textAlign: 'left' as 'left' | 'center' | 'right',
            padding: type === "spacer" ? '2rem' : '1rem',
            margin: '0',
            buttonColor: type === "button" ? 'primary' as 'primary' : undefined,
            buttonSize: type === "button" ? 'default' as 'default' : undefined,
            buttonAlign: type === "button" ? 'center' as 'center' : undefined,
            imageHeight: type === "image" ? '200px' : undefined,
            imageAlt: type === "image" ? 'Image description' : undefined,
            linkIcon: type === "content-link" ? 'article' : type === "event-link" ? 'calendar' : undefined,
            fileSize: type === "attachment" ? '125 KB' : undefined,
            fileType: type === "attachment" ? 'PDF' : undefined,
            fileName: type === "attachment" ? 'Document.pdf' : undefined
        }
        setSections([...sections, newSection])
    }

    const updateSection = (id: number, updates: any) => {
        setSections(sections.map(section =>
            section.id === id ? { ...section, ...updates } : section
        ))
    }

    const removeSection = (id: number) => {
        setSections(sections.filter(section => section.id !== id))
    }

    const handleSave = () => {
        // Save template logic would go here
        alert("Template saved!")
    }

    const handleSend = () => {
        // Send template logic would go here
        alert("Template sent!")
    }

    const handleBack = () => {
        if (skipSelectionParam) {
            // If we skipped selection, go back to templates page
            router.push("/experience-manager/communications/templates");
        } else if (step === 'edit') {
            setStep('select');
        } else {
            router.push("/experience-manager/communications/templates");
        }
    }

    // Handle section drag start
    const handleDragStart = (id: number) => {
        setDraggedSection(id);
    }

    // Handle section drag over
    const handleDragOver = (e: React.DragEvent, id: number) => {
        e.preventDefault();
        if (draggedSection === null || draggedSection === id) return;

        // Find the indices of the dragged section and the target section
        const draggedIndex = sections.findIndex(section => section.id === draggedSection);
        const targetIndex = sections.findIndex(section => section.id === id);

        if (draggedIndex === -1 || targetIndex === -1) return;

        // Create a new array with the sections reordered
        const newSections = [...sections];
        const [removed] = newSections.splice(draggedIndex, 1);
        newSections.splice(targetIndex, 0, removed);

        setSections(newSections);
    }

    // Handle section drag end
    const handleDragEnd = () => {
        setDraggedSection(null);
    }

    // Function to render HTML content safely
    const renderHTML = (html: string, sectionType = 'text') => {
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Get the default font size for this section type
        const getDefaultFontSize = () => {
            switch (sectionType) {
                case 'header':
                    return '24px'; // Match header font size
                case 'text':
                    return '16px'; // Match text font size (changed from 20px)
                case 'footer':
                    return '14px'; // Match footer font size
                default:
                    return '16px'; // Default (changed from 20px)
            }
        };

        const defaultFontSize = getDefaultFontSize();

        // Ensure all elements preserve their styles in the preview
        const allElements = tempDiv.querySelectorAll('*');
        allElements.forEach(el => {
            // Skip elements that shouldn't have font size (like br)
            if (el.nodeName === 'BR') return;

            // Get current style
            const style = el.getAttribute('style') || '';
            let updatedStyle = style;

            // If the element has a font-size style, make sure it's preserved in the preview
            // by adding !important to override any Tailwind classes
            if (style.includes('font-size')) {
                updatedStyle = style.replace(
                    /font-size:\s*([^;]+)(;|$)/g,
                    'font-size: $1 !important$2'
                );
            }
            // If no font-size is specified, add an appropriate one based on element type and section type
            else {
                // Apply default font sizes based on element type
                let elementSize = defaultFontSize; // Use section default

                // Override for specific heading elements
                if (el.nodeName === 'H1') elementSize = '32px';
                else if (el.nodeName === 'H2') elementSize = '28px';
                else if (el.nodeName === 'H3') elementSize = '24px';
                else if (el.nodeName === 'H4') elementSize = '22px';
                else if (el.nodeName === 'H5') elementSize = '20px';
                else if (el.nodeName === 'H6') elementSize = '18px';

                // For elements that should inherit parent font size, skip
                if (el.nodeName === 'STRONG' || el.nodeName === 'EM' || el.nodeName === 'U' ||
                    el.nodeName === 'B' || el.nodeName === 'I' || el.nodeName === 'SPAN') {
                    // Don't add font-size to these elements
                } else {
                    // Add the default font size
                    updatedStyle = updatedStyle ?
                        `${updatedStyle}; font-size: ${elementSize} !important` :
                        `font-size: ${elementSize} !important`;
                }
            }

            // Update the style attribute if it changed
            if (updatedStyle !== style) {
                el.setAttribute('style', updatedStyle);
            }
        });

        return { __html: tempDiv.innerHTML };
    };

    // Template selection screen
    if (step === 'select') {
        return (
            <div className="container mx-auto py-6" >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={handleBack}>
                            <RiArrowLeftLine className="mr-2" />
                            Back
                        </Button>
                        <h1 className="text-2xl font-semibold">Choose email template</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prebuiltTemplates.map((template) => (
                        <div
                            key={template.id}
                            className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${selectedTemplate === template.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 dark:border-gray-800'}`}
                            onClick={() => selectTemplate(template.id)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-lg font-medium">{template.name}</h3>
                                    <p className="text-sm text-gray-500">{template.description}</p>
                                </div>
                                <div className="text-3xl">{template.thumbnail}</div>
                            </div>

                            <div className="mt-4 text-xs text-gray-500">
                                <p><strong>Subject:</strong> {template.subject}</p>
                                <p className="mt-1"><strong>Sections:</strong> {template.sections.length}</p>
                            </div>

                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                                    <RiCheckLine className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <Button
                        onClick={proceedToEdit}
                        disabled={!selectedTemplate}
                        className={!selectedTemplate ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        Customize template
                    </Button>
                </div>
            </div >
        );
    }

    // WYSIWYG Template editing screen
    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={handleBack}>
                        <RiArrowLeftLine className="mr-2" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-semibold">Customize email template</h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" className="border border-primary" onClick={handleSave}>
                        <RiSave3Line className="mr-2" />
                        Save template
                    </Button>
                    <Button onClick={handleSend}>
                        <RiSendPlaneLine className="mr-2" />
                        Send test
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar with controls */}
                <div className="col-span-12 lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add elements</CardTitle>
                            <CardDescription>Drag and drop elements into your template</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("header")}>
                                    <span className="text-xl mb-1">H</span>
                                    <span className="text-sm">Header</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("text")}>
                                    <span className="text-xl mb-1">T</span>
                                    <span className="text-sm">Text</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("button")}>
                                    <span className="text-xl mb-1">B</span>
                                    <span className="text-sm">Button</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("image")}>
                                    <RiImage2Line className="text-xl mb-1" />
                                    <span className="text-sm">Image</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("spacer")}>
                                    <span className="text-xl mb-1">—</span>
                                    <span className="text-sm">Spacer</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("attachment")}>
                                    <RiAttachmentLine className="text-xl mb-1" />
                                    <span className="text-sm">Attachment</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("content-link")}>
                                    <RiArticleLine className="text-xl mb-1" />
                                    <span className="text-sm">Content link</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("event-link")}>
                                    <RiCalendarEventLine className="text-xl mb-1" />
                                    <span className="text-sm">Event link</span>
                                </Button>
                                <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("footer")}>
                                    <span className="text-xl mb-1">F</span>
                                    <span className="text-sm">Footer</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section style editor */}
                    {editingSection !== null && isEditingStyle && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Section style</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Background color */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Background color</label>
                                    <div className="flex items-center">
                                        <input
                                            type="color"
                                            value={sections.find(s => s.id === editingSection)?.backgroundColor === 'transparent'
                                                ? '#ffffff'
                                                : sections.find(s => s.id === editingSection)?.backgroundColor || '#ffffff'}
                                            onChange={(e) => updateSection(editingSection, { backgroundColor: e.target.value })}
                                            className="w-10 h-10 p-1 border rounded mr-2"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateSection(editingSection, { backgroundColor: 'transparent' })}
                                            className="text-xs"
                                        >
                                            Transparent
                                        </Button>
                                        <div className="text-sm text-gray-700 dark:text-gray-300 ml-2">
                                            {sections.find(s => s.id === editingSection)?.backgroundColor === 'transparent'
                                                ? 'Transparent'
                                                : sections.find(s => s.id === editingSection)?.backgroundColor?.toUpperCase()}
                                        </div>
                                    </div>
                                </div>

                                {/* Text alignment - Only show for non-button sections */}
                                {sections.find(s => s.id === editingSection)?.type !== 'button' && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Text alignment</label>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={sections.find(s => s.id === editingSection)?.textAlign === 'left' ? 'primary' : 'ghost'}
                                                size="sm"
                                                onClick={() => updateSection(editingSection, { textAlign: 'left' })}
                                                className="flex-1"
                                            >
                                                <RiAlignLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant={sections.find(s => s.id === editingSection)?.textAlign === 'center' ? 'primary' : 'ghost'}
                                                size="sm"
                                                onClick={() => updateSection(editingSection, { textAlign: 'center' })}
                                                className="flex-1"
                                            >
                                                <RiAlignCenter className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant={sections.find(s => s.id === editingSection)?.textAlign === 'right' ? 'primary' : 'ghost'}
                                                size="sm"
                                                onClick={() => updateSection(editingSection, { textAlign: 'right' })}
                                                className="flex-1"
                                            >
                                                <RiAlignRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Padding control */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Padding</label>
                                    <Select
                                        value={sections.find(s => s.id === editingSection)?.padding || '1rem'}
                                        onValueChange={(value) => updateSection(editingSection, { padding: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select padding" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">None</SelectItem>
                                            <SelectItem value="0.5rem">Small</SelectItem>
                                            <SelectItem value="1rem">Medium</SelectItem>
                                            <SelectItem value="1.5rem">Large</SelectItem>
                                            <SelectItem value="2rem">Extra Large</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Margin control */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Margin</label>
                                    <Select
                                        value={sections.find(s => s.id === editingSection)?.margin || '0'}
                                        onValueChange={(value) => updateSection(editingSection, { margin: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select margin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">None</SelectItem>
                                            <SelectItem value="0.5rem">Small</SelectItem>
                                            <SelectItem value="1rem">Medium</SelectItem>
                                            <SelectItem value="1.5rem">Large</SelectItem>
                                            <SelectItem value="2rem">Extra Large</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Delete section button */}
                                <div className="pt-4 border-t">
                                    <Button
                                        variant="destructive"
                                        className="w-full"
                                        onClick={() => {
                                            removeSection(editingSection);
                                            setEditingSection(null);
                                            setIsEditingStyle(false);
                                        }}
                                    >
                                        <RiDeleteBinLine className="mr-2" />
                                        Delete section
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Email subject line */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Email subject</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter email subject"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* WYSIWYG Email Content Area */}
                <div className="col-span-12 lg:col-span-9">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Email content</CardTitle>
                                <CardDescription>Edit your email directly</CardDescription>
                            </div>
                            <div className="text-sm text-gray-500">
                                Click on a section to edit its content. Use the style button to change appearance.
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="space-y-4 min-h-[600px] bg-white p-4 rounded-md border"
                                onClick={(e) => {
                                    // Only close sections if clicking directly on the container
                                    if (e.target === e.currentTarget) {
                                        setEditingSection(null);
                                        setIsEditingStyle(false);
                                    }
                                }}
                            >
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className={`relative group hover:border hover:border-blue-400 transition-all ${editingSection === section.id ? 'ring-2 ring-blue-500' : 'border-transparent border'}`}
                                        style={{
                                            backgroundColor: section.backgroundColor !== 'transparent' ? section.backgroundColor : 'transparent',
                                            padding: section.padding,
                                            margin: section.margin,
                                            textAlign: section.textAlign,
                                            cursor: 'pointer'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingSection(section.id);
                                        }}
                                        draggable
                                        onDragStart={() => handleDragStart(section.id)}
                                        onDragOver={(e) => handleDragOver(e, section.id)}
                                        onDragEnd={handleDragEnd}
                                    >
                                        {/* Section toolbar */}
                                        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 bg-white shadow-sm rounded-md border p-1 z-10">
                                            <Button
                                                variant="ghost"
                                                className="h-6 w-6 p-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingSection(section.id);
                                                    setIsEditingStyle(!isEditingStyle);
                                                }}
                                                title="Edit style"
                                            >
                                                <RiPaintFill className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="h-6 w-6 p-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeSection(section.id);
                                                    setEditingSection(null);
                                                }}
                                                title="Delete section"
                                            >
                                                <RiDeleteBinLine className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="h-6 w-6 p-0 cursor-grab"
                                                title="Drag to reorder"
                                            >
                                                <RiDragMove2Line className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {section.type === "header" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <RichTextEditor
                                                        value={section.content}
                                                        onChange={(value) => updateSection(section.id, { content: value })}
                                                        sectionType="header"
                                                    />
                                                ) : (
                                                    <div
                                                        className="prose-headings:m-0 prose-p:m-0"
                                                        style={{ fontSize: '24px' }}
                                                        dangerouslySetInnerHTML={renderHTML(section.content, section.type)}>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {section.type === "text" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <RichTextEditor
                                                        value={section.content}
                                                        onChange={(value) => updateSection(section.id, { content: value })}
                                                        sectionType="text"
                                                    />
                                                ) : (
                                                    <div
                                                        className="prose-headings:m-0 prose-p:m-0"
                                                        style={{ fontSize: '16px' }}
                                                        dangerouslySetInnerHTML={renderHTML(section.content, section.type)}>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {section.type === "button" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Button Text</label>
                                                                <Input
                                                                    value={section.content}
                                                                    onChange={(e) => updateSection(section.id, { content: e.target.value })}
                                                                    placeholder="Button text"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Button Link</label>
                                                                <Input
                                                                    value={section.link || ''}
                                                                    onChange={(e) => updateSection(section.id, { link: e.target.value })}
                                                                    placeholder="Button link"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Button Color</label>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <Select
                                                                        value={section.buttonColor || 'primary'}
                                                                        onValueChange={(value) => updateSection(section.id, { buttonColor: value })}
                                                                    >
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Select button color" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectGroupLabel>Button Colors</SelectGroupLabel>
                                                                                <SelectItem value="primary">Primary</SelectItem>
                                                                                <SelectItem value="secondary">Secondary</SelectItem>
                                                                                <SelectItem value="destructive">Destructive</SelectItem>
                                                                                <SelectItem value="ghost">Outline</SelectItem>
                                                                                <SelectItem value="custom">Custom</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    {section.buttonColor === 'custom' && (
                                                                        <Input
                                                                            type="color"
                                                                            value={section.buttonColor === 'custom' ? (section.customButtonColor || '#3b82f6') : '#3b82f6'}
                                                                            onChange={(e) => updateSection(section.id, { customButtonColor: e.target.value })}
                                                                            className="p-1 h-10"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Button Size</label>
                                                                <Select
                                                                    value={section.buttonSize || 'default'}
                                                                    onValueChange={(value) => updateSection(section.id, { buttonSize: value })}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select button size" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="default">Default</SelectItem>
                                                                        <SelectItem value="sm">Small</SelectItem>
                                                                        <SelectItem value="lg">Large</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Button Alignment</label>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant={section.buttonAlign === 'left' ? 'primary' : 'ghost'}
                                                                    className="flex-1 h-10"
                                                                    onClick={() => updateSection(section.id, { buttonAlign: 'left' })}
                                                                >
                                                                    <RiAlignLeft className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant={!section.buttonAlign || section.buttonAlign === 'center' ? 'primary' : 'ghost'}
                                                                    className="flex-1 h-10"
                                                                    onClick={() => updateSection(section.id, { buttonAlign: 'center' })}
                                                                >
                                                                    <RiAlignCenter className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant={section.buttonAlign === 'right' ? 'primary' : 'ghost'}
                                                                    className="flex-1 h-10"
                                                                    onClick={() => updateSection(section.id, { buttonAlign: 'right' })}
                                                                >
                                                                    <RiAlignRight className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Button Preview</label>
                                                            <div className={`flex ${section.buttonAlign === 'left' ? 'justify-start' : section.buttonAlign === 'right' ? 'justify-end' : 'justify-center'}`}>
                                                                <Button
                                                                    variant={section.buttonColor === 'custom' ? undefined : (section.buttonColor || 'primary')}
                                                                    className={`${section.buttonSize === 'sm' ? 'text-xs px-2 py-1 h-8' : section.buttonSize === 'lg' ? 'text-lg px-6 py-3 h-12' : ''}`}
                                                                    style={section.buttonColor === 'custom' ? {
                                                                        backgroundColor: section.customButtonColor || '#3b82f6',
                                                                        color: getContrastRatio(section.customButtonColor || '#3b82f6')
                                                                    } : undefined}
                                                                >
                                                                    {section.content}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`flex ${section.buttonAlign === 'left' ? 'justify-start' : section.buttonAlign === 'right' ? 'justify-end' : 'justify-center'}`}>
                                                        <Button
                                                            variant={section.buttonColor === 'custom' ? undefined : (section.buttonColor || 'primary')}
                                                            className={`${section.buttonSize === 'sm' ? 'text-xs px-2 py-1 h-8' : section.buttonSize === 'lg' ? 'text-lg px-6 py-3 h-12' : ''}`}
                                                            style={section.buttonColor === 'custom' ? {
                                                                backgroundColor: section.customButtonColor || '#3b82f6',
                                                                color: getContrastRatio(section.customButtonColor || '#3b82f6')
                                                            } : undefined}
                                                        >
                                                            {section.content}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {section.type === "footer" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <RichTextEditor
                                                        value={section.content}
                                                        onChange={(value) => updateSection(section.id, { content: value })}
                                                        sectionType="footer"
                                                    />
                                                ) : (
                                                    <div
                                                        className="text-sm text-gray-500 prose-headings:m-0 prose-p:m-0"
                                                        style={{ fontSize: '14px' }}
                                                        dangerouslySetInnerHTML={renderHTML(section.content, section.type)}>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Add rendering for image section */}
                                        {section.type === "image" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Image URL</label>
                                                            <Input
                                                                value={section.content}
                                                                onChange={(e) => updateSection(section.id, { content: e.target.value })}
                                                                placeholder="Enter image URL"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Alt Text</label>
                                                            <Input
                                                                value={section.imageAlt || ''}
                                                                onChange={(e) => updateSection(section.id, { imageAlt: e.target.value })}
                                                                placeholder="Describe the image"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Height</label>
                                                            <Select
                                                                value={section.imageHeight || '200px'}
                                                                onValueChange={(value) => updateSection(section.id, { imageHeight: value })}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select height" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="100px">Small (100px)</SelectItem>
                                                                    <SelectItem value="200px">Medium (200px)</SelectItem>
                                                                    <SelectItem value="300px">Large (300px)</SelectItem>
                                                                    <SelectItem value="auto">Auto</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Image Preview</label>
                                                            <div className="border rounded-md overflow-hidden">
                                                                <img
                                                                    src={section.content}
                                                                    alt={section.imageAlt || 'Preview'}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: section.imageHeight || '200px',
                                                                        objectFit: 'cover'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center">
                                                        <img
                                                            src={section.content}
                                                            alt={section.imageAlt || 'Image'}
                                                            style={{
                                                                maxWidth: '100%',
                                                                height: section.imageHeight || '200px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Add rendering for spacer section */}
                                        {section.type === "spacer" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Spacer Height</label>
                                                            <Select
                                                                value={section.padding}
                                                                onValueChange={(value) => updateSection(section.id, { padding: value })}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select height" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="0.5rem">Small (8px)</SelectItem>
                                                                    <SelectItem value="1rem">Medium (16px)</SelectItem>
                                                                    <SelectItem value="2rem">Large (32px)</SelectItem>
                                                                    <SelectItem value="3rem">Extra Large (48px)</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="border-t border-dashed border-gray-300 my-2"></div>
                                                    </div>
                                                ) : (
                                                    <div className="border-t border-dashed border-gray-300 my-2"></div>
                                                )}
                                            </div>
                                        )}

                                        {/* Add rendering for content link section */}
                                        {section.type === "content-link" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Select Content</label>
                                                            <Select
                                                                value={section.contentId || ''}
                                                                onValueChange={(value) => {
                                                                    // Find the selected content
                                                                    const selectedContent = [
                                                                        { id: 'c1', title: 'How to Improve Customer Engagement', description: 'Learn effective strategies to boost customer engagement and retention through personalized communication.', image: 'https://placehold.co/600x300/4f46e5/ffffff?text=Customer+Engagement', url: '/blog/customer-engagement' },
                                                                        { id: 'c2', title: 'Email Marketing Best Practices', description: 'Discover the latest best practices in email marketing to increase open rates and conversions.', image: 'https://placehold.co/600x300/0ea5e9/ffffff?text=Email+Marketing', url: '/blog/email-marketing' },
                                                                        { id: 'c3', title: 'Product Update: New Features', description: 'Explore the exciting new features we have added to our platform to enhance your experience.', image: 'https://placehold.co/600x300/10b981/ffffff?text=Product+Update', url: '/updates/new-features' }
                                                                    ].find(c => c.id === value);

                                                                    if (selectedContent) {
                                                                        updateSection(section.id, {
                                                                            contentId: value,
                                                                            content: selectedContent.title,
                                                                            description: selectedContent.description,
                                                                            image: selectedContent.image,
                                                                            link: selectedContent.url
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select content" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="c1">How to Improve Customer Engagement</SelectItem>
                                                                    <SelectItem value="c2">Email Marketing Best Practices</SelectItem>
                                                                    <SelectItem value="c3">Product Update: New Features</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">CTA Text</label>
                                                            <Input
                                                                value={section.ctaText || 'Read more →'}
                                                                onChange={(e) => updateSection(section.id, { ctaText: e.target.value })}
                                                                placeholder="Enter call-to-action text"
                                                            />
                                                        </div>

                                                        {section.contentId && (
                                                            <div className="border rounded-md p-4 bg-gray-50">
                                                                <div className="text-sm font-medium mb-2">Preview</div>
                                                                <div className="space-y-3">
                                                                    <img
                                                                        src={section.image}
                                                                        alt={section.content}
                                                                        className="w-full h-40 object-cover rounded-md"
                                                                    />
                                                                    <h3 className="font-bold text-lg">{section.content}</h3>
                                                                    <p className="text-sm text-gray-600">{section.description}</p>
                                                                    <div className="text-primary text-sm">{section.ctaText || 'Read more →'}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="border rounded-md overflow-hidden">
                                                        {section.image && (
                                                            <img
                                                                src={section.image}
                                                                alt={section.content}
                                                                className="w-full h-40 object-cover"
                                                            />
                                                        )}
                                                        <div className="p-4">
                                                            <h3 className="font-bold text-lg mb-2">{section.content}</h3>
                                                            {section.description && (
                                                                <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                                                            )}
                                                            <a href={section.link} className="text-primary hover:underline text-sm flex items-center">
                                                                <RiArticleLine className="mr-1" />
                                                                {section.ctaText || 'Read more →'}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Add rendering for event link section */}
                                        {section.type === "event-link" && (
                                            <div>
                                                {editingSection === section.id ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Select Event</label>
                                                            <Select
                                                                value={section.eventId || ''}
                                                                onValueChange={(value) => {
                                                                    // Find the selected event
                                                                    const selectedEvent = [
                                                                        { id: 'e1', title: 'Annual Customer Conference', description: 'Join us for our annual customer conference featuring industry experts and networking opportunities.', date: 'June 15-17, 2023', location: 'San Francisco, CA', image: 'https://placehold.co/600x300/f97316/ffffff?text=Annual+Conference', url: '/events/annual-conference' },
                                                                        { id: 'e2', title: 'Product Webinar Series', description: 'Learn how to maximize your productivity with our latest features in this interactive webinar.', date: 'July 8, 2023', location: 'Online', image: 'https://placehold.co/600x300/ec4899/ffffff?text=Webinar+Series', url: '/events/webinar-series' },
                                                                        { id: 'e3', title: 'Industry Roundtable Discussion', description: 'Participate in our exclusive roundtable discussion with industry leaders on emerging trends.', date: 'August 22, 2023', location: 'New York, NY', image: 'https://placehold.co/600x300/8b5cf6/ffffff?text=Roundtable', url: '/events/roundtable' }
                                                                    ].find(e => e.id === value);

                                                                    if (selectedEvent) {
                                                                        updateSection(section.id, {
                                                                            eventId: value,
                                                                            content: selectedEvent.title,
                                                                            description: selectedEvent.description,
                                                                            image: selectedEvent.image,
                                                                            link: selectedEvent.url,
                                                                            date: selectedEvent.date,
                                                                            location: selectedEvent.location
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select event" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="e1">Annual Customer Conference</SelectItem>
                                                                    <SelectItem value="e2">Product Webinar Series</SelectItem>
                                                                    <SelectItem value="e3">Industry Roundtable Discussion</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">CTA Text</label>
                                                            <Input
                                                                value={section.ctaText || 'Register now →'}
                                                                onChange={(e) => updateSection(section.id, { ctaText: e.target.value })}
                                                                placeholder="Enter call-to-action text"
                                                            />
                                                        </div>

                                                        {section.eventId && (
                                                            <div className="border rounded-md p-4 bg-gray-50">
                                                                <div className="text-sm font-medium mb-2">Preview</div>
                                                                <div className="space-y-3">
                                                                    <img
                                                                        src={section.image}
                                                                        alt={section.content}
                                                                        className="w-full h-40 object-cover rounded-md"
                                                                    />
                                                                    <h3 className="font-bold text-lg">{section.content}</h3>
                                                                    <p className="text-sm text-gray-600">{section.description}</p>
                                                                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                                                                        <div className="flex items-center">
                                                                            <RiCalendarEventLine className="mr-1" />
                                                                            {section.date}
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                            <span className="mr-1">📍</span>
                                                                            {section.location}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-primary text-sm">{section.ctaText || 'Register now →'}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="border rounded-md overflow-hidden">
                                                        {section.image && (
                                                            <img
                                                                src={section.image}
                                                                alt={section.content}
                                                                className="w-full h-40 object-cover"
                                                            />
                                                        )}
                                                        <div className="p-4">
                                                            <h3 className="font-bold text-lg mb-2">{section.content}</h3>
                                                            {section.description && (
                                                                <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                                                            )}
                                                            {section.date && section.location && (
                                                                <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                                                                    <div className="flex items-center">
                                                                        <RiCalendarEventLine className="mr-1" />
                                                                        {section.date}
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="mr-1">📍</span>
                                                                        {section.location}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <a href={section.link} className="text-primary hover:underline text-sm flex items-center">
                                                                <RiCalendarEventLine className="mr-1" />
                                                                {section.ctaText || 'Register now →'}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Attachment section editor */}
                                        {editingSection === section.id && section.type === "attachment" && (
                                            <div className="mt-4 p-4 border rounded-md bg-gray-50">
                                                <h4 className="font-medium mb-3">Edit Attachment</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">File Name</label>
                                                        <Input
                                                            value={section.fileName || section.content}
                                                            onChange={(e) => updateSection(section.id, { fileName: e.target.value, content: e.target.value })}
                                                            placeholder="Enter file name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">File Type</label>
                                                        <Select
                                                            value={section.fileType || 'PDF'}
                                                            onValueChange={(value) => updateSection(section.id, { fileType: value })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select file type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="PDF">PDF</SelectItem>
                                                                <SelectItem value="DOCX">Word Document</SelectItem>
                                                                <SelectItem value="XLSX">Excel Spreadsheet</SelectItem>
                                                                <SelectItem value="PPTX">PowerPoint</SelectItem>
                                                                <SelectItem value="ZIP">ZIP Archive</SelectItem>
                                                                <SelectItem value="TXT">Text File</SelectItem>
                                                                <SelectItem value="IMG">Image</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">File Size</label>
                                                        <Input
                                                            value={section.fileSize || '125 KB'}
                                                            onChange={(e) => updateSection(section.id, { fileSize: e.target.value })}
                                                            placeholder="Enter file size"
                                                        />
                                                    </div>
                                                    <div className="pt-2">
                                                        <Button variant="outline" className="w-full">
                                                            <RiAttachmentLine className="mr-2" />
                                                            Upload File
                                                        </Button>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            In a real implementation, this would allow you to upload an actual file.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {sections.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                        <div className="text-4xl text-gray-400 mb-4">
                                            <RiMailLine />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">Your email is empty</h3>
                                        <p className="text-gray-500 mb-4">Add sections from the sidebar to start building your email</p>
                                        <div className="flex gap-2">
                                            <Button onClick={() => addSection("header")}>Add Header</Button>
                                            <Button variant="ghost" onClick={() => addSection("text")}>Add Text</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
} 