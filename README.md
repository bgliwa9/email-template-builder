# Email Template Builder

A modern, user-friendly email template builder with rich text editing, drag-and-drop sections, and customizable templates.

> **Note:** This project has been updated to fix build issues on Vercel.

## Features

- **Rich Text Editor**: Format text with various styling options including font family, size, color, and alignment
- **Drag-and-Drop Interface**: Easily rearrange sections of your email template
- **Pre-built Templates**: Start with professionally designed templates or create your own from scratch
- **Content Elements**: Add text, buttons, images, spacers, content links, and event links
- **Customizable Styling**: Adjust colors, spacing, and alignment for each section
- **Content & Event Integration**: Select from existing content and events with automatic data population
- **Responsive Design**: Create emails that look great on all devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bgliwa9/modern-email-builder.git
cd modern-email-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000/experience-manager/communications/template-builder](http://localhost:3000/experience-manager/communications/template-builder) in your browser to see the template builder in action.

## Usage

1. **Select a Template**: Choose from pre-built templates or start from scratch
2. **Add Elements**: Use the "Add elements" panel to insert new sections
3. **Edit Content**: Click on any section to edit its content and styling
4. **Rearrange Sections**: Drag and drop sections to change their order
5. **Preview**: See how your email will look to recipients
6. **Save or Send**: Save your template or send a test email

## Components

### Textarea Component

The project includes a custom Textarea component that provides consistent styling with the rest of the UI:

```tsx
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 ${className || ''}`}
                ref={ref}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Remix Icons for the beautiful icon set
- Shadcn UI for the component library
