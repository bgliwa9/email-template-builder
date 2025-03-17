// Define the template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  lastModified?: string;
  category?: string;
  thumbnail: string;
  createdAt?: string;
  author?: string;
  subject: string;
  sections?: Section[];
}

// Define the section interface
export interface Section {
  id: number;
  type: string;
  content: string;
  backgroundColor: string;
  textAlign: 'left' | 'center' | 'right';
  padding: string;
  margin: string;
  link?: string;
  buttonColor?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'custom';
  buttonSize?: string;
  height?: string;
  alt?: string;
  contentId?: string;
  eventId?: string;
  customButtonColor?: string;
  buttonAlign?: 'left' | 'center' | 'right';
  imageHeight?: string;
  imageAlt?: string;
  linkIcon?: string;
  description?: string;
  image?: string;
  date?: string;
  location?: string;
  ctaText?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: string;
  resourceId?: string;
  resourceType?: string;
  capacity?: string;
  price?: string;
}

// Shared template data
export const templateData: Template[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'A warm welcome email for new users',
    lastModified: '2 days ago',
    category: 'Onboarding',
    thumbnail: '📧',
    createdAt: '2023-12-15',
    author: 'John Smith',
    subject: 'Welcome to our community!',
    sections: [
      { id: 101, type: "header", content: "<h1 style='color: #4a86e8; font-weight: bold;'>Welcome to our community!</h1>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 102, type: "text", content: "We're <strong>thrilled</strong> to have you join us. Here's everything you need to know to <em>get started</em>.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 103, type: "button", content: "Get Started", link: "#", backgroundColor: 'transparent', textAlign: 'center', padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'default' },
      { id: 104, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' }
    ]
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Announce important news or updates',
    lastModified: '1 week ago',
    category: 'Newsletter',
    thumbnail: '📢',
    createdAt: '2023-11-01',
    author: 'Sarah Johnson',
    subject: 'Important announcement',
    sections: [
      { id: 201, type: "header", content: "<h2 style='color: #e74c3c; font-weight: bold;'>Important Announcement</h2>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 202, type: "text", content: "We have some <strong>exciting news</strong> to share with you! Our <span style='color: #27ae60;'>new feature</span> is now available.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 203, type: "button", content: "Learn more", link: "#", backgroundColor: 'transparent', textAlign: 'center', padding: '1rem', margin: '0', buttonColor: 'secondary', buttonSize: 'default' },
      { id: 204, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' }
    ]
  },
  {
    id: 'newsletter',
    name: 'Monthly Newsletter',
    description: 'Regular updates and news for your subscribers',
    lastModified: '3 days ago',
    category: 'Newsletter',
    thumbnail: '📰',
    createdAt: '2024-01-10',
    author: 'Michael Brown',
    subject: 'Your monthly newsletter',
    sections: [
      { id: 301, type: "header", content: "<h1 style='color: #9b59b6; font-weight: bold;'>Your Monthly Newsletter</h1>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 302, type: "text", content: "<h3>This Month's Highlights:</h3><ul><li><strong>New Feature Launch</strong>: We've released our new dashboard.</li><li><strong>Community Spotlight</strong>: Meet our most active members.</li><li><strong>Upcoming Events</strong>: Don't miss our webinar next week.</li></ul>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 303, type: "button", content: "Read full newsletter", link: "#", backgroundColor: 'transparent', textAlign: 'center', padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'lg' },
      { id: 304, type: "footer", content: "© 2025 Your Company. All rights reserved.<br>You're receiving this email because you subscribed to our newsletter.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' }
    ]
  },
  {
    id: 'template4',
    name: 'Product Announcement',
    description: 'Announce new products or features',
    lastModified: '5 days ago',
    category: 'Marketing',
    thumbnail: '🚀',
    createdAt: '2024-02-05',
    author: 'Emily Davis',
    subject: 'Introducing our new product',
    sections: [
      { id: 401, type: "header", content: "<h1 style='color: #3498db; font-weight: bold;'>Introducing Our New Product</h1>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 402, type: "text", content: "We're excited to announce our latest product that will revolutionize how you work.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 403, type: "button", content: "Learn More", link: "#", backgroundColor: 'transparent', textAlign: 'center', padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'default' },
      { id: 404, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' }
    ]
  },
  {
    id: 'template5',
    name: 'Thank You Email',
    description: 'Express gratitude to your users',
    lastModified: '1 day ago',
    category: 'Engagement',
    thumbnail: '🙏',
    createdAt: '2024-02-20',
    author: 'David Wilson',
    subject: 'Thank you for your support',
    sections: [
      { id: 501, type: "header", content: "<h1 style='color: #e67e22; font-weight: bold;'>Thank You!</h1>", backgroundColor: 'transparent', textAlign: 'center', padding: '1rem', margin: '0' },
      { id: 502, type: "text", content: "We wanted to take a moment to express our sincere gratitude for your continued support.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 503, type: "button", content: "View Your Rewards", link: "#", backgroundColor: 'transparent', textAlign: 'center', padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'default' },
      { id: 504, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' }
    ]
  },
  {
    id: 'template6',
    name: 'Feedback Request',
    description: 'Ask users for their feedback',
    lastModified: '4 days ago',
    category: 'Engagement',
    thumbnail: '📝',
    createdAt: '2024-03-01',
    author: 'Lisa Martinez',
    subject: 'We value your feedback',
    sections: [
      { id: 601, type: "header", content: "<h1 style='color: #2ecc71; font-weight: bold;'>We Value Your Feedback</h1>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 602, type: "text", content: "Your opinion matters to us. Please take a moment to share your thoughts on your recent experience.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 603, type: "button", content: "Take Our Survey", link: "#", backgroundColor: 'transparent', textAlign: 'center', padding: '1rem', margin: '0', buttonColor: 'primary', buttonSize: 'default' },
      { id: 604, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' }
    ]
  }
];

// Function to create a default template with basic sections
export function createDefaultTemplate(templateId: string): Template {
  return {
    id: templateId,
    name: 'New Template',
    description: 'A custom template',
    subject: 'New Email Template',
    thumbnail: '✉️',
    sections: [
      { id: 1, type: "header", content: "<h1>Your Email Header</h1>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 2, type: "text", content: "<p>Your email content goes here.</p>", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' },
      { id: 3, type: "footer", content: "© 2025 Your Company. All rights reserved.", backgroundColor: 'transparent', textAlign: 'left', padding: '1rem', margin: '0' }
    ]
  };
} 