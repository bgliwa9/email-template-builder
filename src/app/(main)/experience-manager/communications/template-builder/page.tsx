"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Textarea } from "@/components/Textarea"
import { RiAlignCenter, RiAlignLeft, RiAlignRight, RiArrowDownSLine, RiArrowLeftLine, RiBold, RiCheckLine, RiDeleteBinLine, RiDragMove2Line, RiEditLine, RiEyeLine, RiItalic, RiLink, RiListOrdered, RiListUnordered, RiMarkPenLine, RiSave3Line, RiSendPlaneLine, RiUnderline } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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
    const [currentColor, setCurrentColor] = useState('#000000');
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

            // If it's the initial render and the content is empty, apply default styles
            if (isInitialRender.current && (!value || value === '<p></p>' || value === '<p><br></p>' || value === '')) {
                // Focus the editor to ensure commands work
                editorRef.current.focus();

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

                // Reset formatting states to ensure they're not selected by default
                setIsBold(false);
                setIsItalic(false);
                setIsUnderline(false);
            }
        }

        // Reset flags
        isUpdatingContent.current = false;
        isInitialRender.current = false;
    }, [value, htmlContent, currentFontFamily, currentFontSize, currentColor]);

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

        // If no text color was found, default to black
        if (!foundTextColor) {
            setCurrentColor('#000000');
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

    // Add event listener for selection change
    useEffect(() => {
        const handleSelectionChange = () => {
            if (document.activeElement === editorRef.current && !isApplyingBgColor) {
                checkFormatting();
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [isApplyingBgColor]);

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

        document.execCommand('foreColor', false, color);
        setCurrentColor(color);
        setShowFontColor(false);

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

    return (
        <div className={`rich-text-editor ${className || ''}`}>
            <div className="flex flex-wrap gap-1 mb-2 p-1 bg-gray-50 rounded-md dark:bg-gray-900">
                {/* Font family dropdown - Google Docs style */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        className={`h-8 px-3 py-0 text-sm flex items-center justify-between min-w-[120px] ${showFontFamily ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => setShowFontFamily(!showFontFamily)}
                        style={{ fontFamily: currentFontFamily }}
                    >
                        <span className="truncate">
                            {fontFamilies.find(f => f.value === currentFontFamily)?.label || 'Arial'}
                        </span>
                        <RiArrowDownSLine className="h-4 w-4 ml-1" />
                    </Button>
                    {showFontFamily && (
                        <div className="absolute top-full left-0 mt-1 w-[200px] bg-white dark:bg-gray-950 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-20 max-h-[300px] overflow-y-auto">
                            {fontFamilies.map((font) => (
                                <button
                                    key={font.value}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 ${currentFontFamily === font.value ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
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
                    <Button
                        variant="ghost"
                        className={`h-8 px-2 py-0 text-sm flex items-center justify-between min-w-[60px] ${showFontSize ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                        onClick={() => setShowFontSize(!showFontSize)}
                    >
                        <span>{currentFontSize.replace('px', '')}</span>
                        <RiArrowDownSLine className="h-4 w-4 ml-1" />
                    </Button>
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
                <Button
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${isBold ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    onClick={() => execFormatCommand('bold')}
                    title="Bold (Ctrl+B)"
                >
                    <RiBold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${isItalic ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    onClick={() => execFormatCommand('italic')}
                    title="Italic (Ctrl+I)"
                >
                    <RiItalic className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${isUnderline ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    onClick={() => execFormatCommand('underline')}
                    title="Underline (Ctrl+U)"
                >
                    <RiUnderline className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* Font color dropdown - Google Docs style */}
                <div className="relative">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 flex items-center justify-center relative"
                            onClick={() => applyFontColor(currentColor)}
                            title="Text color"
                        >
                            <span className="font-bold text-lg" style={{ color: currentColor }}>A</span>
                            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: currentColor }}></div>
                        </Button>
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
                        </div>
                    )}
                </div>

                {/* Background color / Highlight dropdown - Google Docs style */}
                <div className="relative">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 flex items-center justify-center relative"
                            onClick={() => applyBackgroundColor(currentBgColor)}
                            title={currentBgColor === 'transparent' ? "No highlight color" : "Highlight color"}
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
                        </div>
                    )}
                </div>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* Text alignment */}
                <Button
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${textAlign === 'left' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    onClick={() => execFormatCommand('justifyLeft')}
                    title="Align left"
                >
                    <RiAlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${textAlign === 'center' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    onClick={() => execFormatCommand('justifyCenter')}
                    title="Align center"
                >
                    <RiAlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${textAlign === 'right' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    onClick={() => execFormatCommand('justifyRight')}
                    title="Align right"
                >
                    <RiAlignRight className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* List formatting */}
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => applyList('unordered')}
                    title="Bullet list"
                >
                    <RiListUnordered className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => applyList('ordered')}
                    title="Numbered list"
                >
                    <RiListOrdered className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center"></div>

                {/* Link */}
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
                    title="Insert link"
                >
                    <RiLink className="h-4 w-4" />
                </Button>
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
                    fontFamily: currentFontFamily // Explicitly set the font family
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
            { id: 101, type: "header", content: "<h1 style='color: #4a86e8; font-weight: bold;'>Welcome to our community!</h1>" },
            { id: 102, type: "text", content: "We're <strong>thrilled</strong> to have you join us. Here's everything you need to know to <em>get started</em>." },
            { id: 103, type: "button", content: "Get Started", link: "#" },
            { id: 104, type: "footer", content: "© 2025 Your Company. All rights reserved." }
        ]
    },
    {
        id: 'announcement',
        name: 'Announcement',
        description: 'Announce important news or updates',
        subject: 'Important announcement',
        thumbnail: '📢',
        sections: [
            { id: 201, type: "header", content: "<h2 style='color: #e74c3c; font-weight: bold;'>Important Announcement</h2>" },
            { id: 202, type: "text", content: "We have some <strong>exciting news</strong> to share with you! Our <span style='color: #27ae60;'>new feature</span> is now available." },
            { id: 203, type: "button", content: "Learn more", link: "#" },
            { id: 204, type: "footer", content: "© 2025 Your Company. All rights reserved." }
        ]
    },
    {
        id: 'newsletter',
        name: 'Monthly newsletter',
        description: 'Regular updates and news digest',
        subject: 'Your monthly newsletter',
        thumbnail: '📰',
        sections: [
            { id: 301, type: "header", content: "<h1 style='color: #9b59b6; font-weight: bold;'>Your Monthly Newsletter</h1>" },
            { id: 302, type: "text", content: "<h3>This Month's Highlights:</h3><ul><li><strong>New Feature Launch</strong>: We've released our new dashboard.</li><li><strong>Community Spotlight</strong>: Meet our most active members.</li><li><strong>Upcoming Events</strong>: Don't miss our webinar next week.</li></ul>" },
            { id: 303, type: "button", content: "Read full newsletter", link: "#" },
            { id: 304, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>You're receiving this email because you subscribed to our newsletter." }
        ]
    },
    {
        id: 'invitation',
        name: 'Event invitation',
        description: 'Invite users to an upcoming event',
        subject: 'You\'re invited!',
        thumbnail: '🎉',
        sections: [
            { id: 401, type: "header", content: "<h1 style='color: #f39c12; font-weight: bold;'>You're Invited!</h1>" },
            { id: 402, type: "text", content: "Join us for our <strong>annual conference</strong> on <span style='background-color: #f8f9fa; padding: 2px 4px;'>June 15-17, 2025</span>. It's going to be an amazing event with speakers from around the world." },
            { id: 403, type: "button", content: "RSVP now", link: "#" },
            { id: 404, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>Location: Grand Hotel, 123 Main St, Anytown" }
        ]
    },
    {
        id: 'confirmation',
        name: 'Order confirmation',
        description: 'Confirm a user\'s purchase or order',
        subject: 'Your order confirmation',
        thumbnail: '✅',
        sections: [
            { id: 501, type: "header", content: "<h2 style='color: #2ecc71; font-weight: bold;'>Order Confirmation</h2>" },
            { id: 502, type: "text", content: "Thank you for your order! Your order <strong>#12345</strong> has been confirmed and is being processed.<br><br><span style='color: #7f8c8d;'>Order details:</span><br>1x Product A - $29.99<br>2x Product B - $39.98<br><strong>Total: $69.97</strong>" },
            { id: 503, type: "button", content: "Track order", link: "#" },
            { id: 504, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>Questions? Contact our support team." }
        ]
    },
    {
        id: 'feedback',
        name: 'Feedback request',
        description: 'Ask users for their feedback',
        subject: 'We value your feedback',
        thumbnail: '💬',
        sections: [
            { id: 601, type: "header", content: "<h2 style='color: #3498db; font-weight: bold;'>We Value Your Feedback</h2>" },
            { id: 602, type: "text", content: "We're constantly working to improve our service and would love to hear your thoughts. <strong>Your feedback</strong> helps us make our product better for everyone." },
            { id: 603, type: "button", content: "Take our survey", link: "#" },
            { id: 604, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>This survey will take approximately 5 minutes to complete." }
        ]
    }
];

export default function EmailTemplateBuilder() {
    const router = useRouter()
    const [step, setStep] = useState<'select' | 'edit'>('select')
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
    const [templateName, setTemplateName] = useState("")
    const [subject, setSubject] = useState("")
    const [isPreview, setIsPreview] = useState(false)

    // Template sections
    const [sections, setSections] = useState<Array<{ id: number, type: string, content: string, link?: string }>>([])

    const selectTemplate = (templateId: string) => {
        const template = prebuiltTemplates.find(t => t.id === templateId);
        if (template) {
            setSelectedTemplate(templateId);
            setTemplateName(template.name);
            setSubject(template.subject);
            setSections([...template.sections]);
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
            content: type === "header" ? "New header" :
                type === "text" ? "New text block" :
                    type === "button" ? "Button text" :
                        "Footer content",
            link: type === "button" ? "#" : undefined
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
        if (step === 'edit') {
            setStep('select');
        } else {
            router.push("/experience-manager/communications");
        }
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
            <div className="container mx-auto py-6">
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
            </div>
        );
    }

    // Template editing screen
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
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <Button
                            variant={!isPreview ? "primary" : "ghost"}
                            className="rounded-none border-0"
                            onClick={() => setIsPreview(false)}
                        >
                            <RiEditLine className="mr-2" />
                            Edit
                        </Button>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
                        <Button
                            variant={isPreview ? "primary" : "ghost"}
                            className="rounded-none border-0"
                            onClick={() => setIsPreview(true)}
                        >
                            <RiEyeLine className="mr-2" />
                            Preview
                        </Button>
                    </div>
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

            {isPreview ? (
                // Preview Mode
                <div className="flex flex-col space-y-4 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Preview</h2>
                        <Button
                            variant="secondary"
                            onClick={() => setIsPreview(!isPreview)}
                        >
                            {isPreview ? "Hide Preview" : "Show Preview"}
                        </Button>
                    </div>
                    {isPreview && (
                        <div className="border rounded-md p-4 bg-white">
                            <div className="prose max-w-none">
                                {sections.map((section) => (
                                    <div key={section.id} className={section.type === "footer" ? "footer-content" : ""}>
                                        {section.type === "header" && (
                                            <div className="header-content mb-4" style={{ fontSize: '24px' }} dangerouslySetInnerHTML={renderHTML(section.content, section.type)}></div>
                                        )}

                                        {section.type === "text" && (
                                            <div className="text-content mb-4" style={{ fontSize: '16px' }} dangerouslySetInnerHTML={renderHTML(section.content, section.type)}></div>
                                        )}

                                        {section.type === "button" && (
                                            <div className="button-content mb-4">
                                                <a
                                                    href={section.link}
                                                    className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                                                >
                                                    {section.content}
                                                </a>
                                            </div>
                                        )}

                                        {section.type === "footer" && (
                                            <div className="footer-content mt-8 pt-4 border-t text-gray-500" style={{ fontSize: '14px' }} dangerouslySetInnerHTML={renderHTML(section.content, section.type)}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // Edit Mode
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Template settings</CardTitle>
                                <CardDescription>Configure your email template</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Template name</label>
                                    <Input
                                        value={templateName}
                                        onChange={(e) => setTemplateName(e.target.value)}
                                        placeholder="Enter template name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subject line</label>
                                    <Input
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Enter email subject"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Recipient group</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select recipient group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All users</SelectItem>
                                            <SelectItem value="tenants">Tenants</SelectItem>
                                            <SelectItem value="employees">Employees</SelectItem>
                                            <SelectItem value="visitors">Visitors</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Add elements</CardTitle>
                                <CardDescription>Add elements to your template</CardDescription>
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
                                    <Button variant="ghost" className="h-auto py-4 flex flex-col items-center border border-gray-200" onClick={() => addSection("footer")}>
                                        <span className="text-xl mb-1">F</span>
                                        <span className="text-sm">Footer</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email content</CardTitle>
                                <CardDescription>Design your email template</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 min-h-[500px] bg-white p-4 rounded-md border">
                                    {sections.map((section) => (
                                        <div key={section.id} className="relative group border rounded-md p-4 hover:border-blue-400">
                                            <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100">
                                                <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => removeSection(section.id)}>
                                                    <RiDeleteBinLine className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" className="h-6 w-6 p-0 cursor-move">
                                                    <RiDragMove2Line className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {section.type === "header" && (
                                                <div>
                                                    <div
                                                        className="text-xl font-bold mb-2 prose-headings:m-0 prose-p:m-0"
                                                        style={{ fontSize: '24px' }}
                                                        dangerouslySetInnerHTML={renderHTML(section.content, section.type)}>
                                                    </div>
                                                    <RichTextEditor
                                                        value={section.content}
                                                        onChange={(value) => updateSection(section.id, { content: value })}
                                                        className="mt-2"
                                                        sectionType="header"
                                                    />
                                                </div>
                                            )}

                                            {section.type === "text" && (
                                                <div>
                                                    <div
                                                        className="mb-2 prose-headings:m-0 prose-p:m-0"
                                                        style={{ fontSize: '16px' }}
                                                        dangerouslySetInnerHTML={renderHTML(section.content, section.type)}>
                                                    </div>
                                                    <RichTextEditor
                                                        value={section.content}
                                                        onChange={(value) => updateSection(section.id, { content: value })}
                                                        className="mt-2"
                                                        sectionType="text"
                                                    />
                                                </div>
                                            )}

                                            {section.type === "button" && (
                                                <div>
                                                    <Button className="mb-2">{section.content}</Button>
                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                        <Input
                                                            value={section.content}
                                                            onChange={(e) => updateSection(section.id, { content: e.target.value })}
                                                            placeholder="Button text"
                                                        />
                                                        <Input
                                                            value={section.link || ''}
                                                            onChange={(e) => updateSection(section.id, { link: e.target.value })}
                                                            placeholder="Button link"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {section.type === "footer" && (
                                                <div>
                                                    <div
                                                        className="text-sm text-gray-500 mb-2 prose-headings:m-0 prose-p:m-0"
                                                        style={{ fontSize: '14px' }}
                                                        dangerouslySetInnerHTML={renderHTML(section.content, section.type)}>
                                                    </div>
                                                    <RichTextEditor
                                                        value={section.content}
                                                        onChange={(value) => updateSection(section.id, { content: value })}
                                                        className="mt-2"
                                                        sectionType="footer"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
} 