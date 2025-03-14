"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Textarea } from "@/components/Textarea"
import { RiArrowLeftLine, RiArticleLine, RiCalendarEventLine, RiMailLine, RiNewspaperLine, RiNotification3Line } from "@remixicon/react"

// Functional RadioGroup implementation
const RadioGroup = ({ value, onValueChange, className, children }: { 
  value: string; 
  onValueChange: (value: string) => void; 
  className?: string; 
  children: React.ReactNode 
}) => (
  <div className={className}>
    {children}
  </div>
);

// Functional RadioGroupItem implementation
const RadioGroupItem = ({ value, id }: { value: string; id: string }) => {
  // Get the current message type from the parent component
  const currentValue = document.querySelector(`input[id="${id}"]`)?.getAttribute('data-current-value');
  const isChecked = currentValue === value;
  
  const handleChange = () => {
    // Find all radio buttons with the same name
    const radioButtons = document.querySelectorAll(`input[name="${id.split('-')[0]}"]`);
    
    // Get the onValueChange function from the parent
    const onValueChangeStr = document.querySelector(`div[data-radio-group="${id.split('-')[0]}"]`)?.getAttribute('data-on-value-change');
    if (onValueChangeStr) {
      // Call the function with the new value
      const event = new CustomEvent(onValueChangeStr, { detail: value });
      document.dispatchEvent(event);
    }
  };
  
  return (
    <input 
      type="radio" 
      id={id} 
      name={id.split('-')[0]}
      value={value} 
      checked={isChecked}
      onChange={handleChange}
      onClick={() => {
        // Directly update the state in the parent component
        const event = new CustomEvent('radioChange', { 
          detail: { id: id.split('-')[0], value } 
        });
        document.dispatchEvent(event);
      }}
      className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary cursor-pointer"
    />
  );
};

// Sample template data
const templates = [
  {
    id: "blank",
    name: "Blank Template",
    description: "Start with a clean slate",
    icon: RiArticleLine,
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Weekly newsletter template with sections for featured content",
    icon: RiNewspaperLine,
  },
  {
    id: "announcement",
    name: "Announcement",
    description: "Template for important announcements and updates",
    icon: RiMailLine,
  },
  {
    id: "event",
    name: "Event Invitation",
    description: "Template for event invitations with RSVP options",
    icon: RiCalendarEventLine,
  },
];

export default function CreateMessage() {
  const router = useRouter()
  const [messageType, setMessageType] = useState<"push" | "email" | "both">("push")
  
  // Push notification state
  const [pushLink, setPushLink] = useState<"home" | "content" | "event">("home")
  const [contentId, setContentId] = useState("")
  const [eventId, setEventId] = useState("")
  const [pushAudience, setPushAudience] = useState("all-users")
  const [pushTitle, setPushTitle] = useState("")
  const [pushBody, setPushBody] = useState("")
  
  // Email state
  const [emailSubject, setEmailSubject] = useState("")
  const [emailTemplate, setEmailTemplate] = useState<string>("blank")
  const [emailAudience, setEmailAudience] = useState("all-users")
  
  // Common state
  const [sendTime, setSendTime] = useState<"now" | "scheduled">("now")
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)

  // Set up event listeners for radio buttons
  useEffect(() => {
    const handleRadioChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { id, value } = customEvent.detail;
      
      if (id === 'messageType') {
        setMessageType(value as "push" | "email" | "both");
      } else if (id === 'sendTime') {
        setSendTime(value as "now" | "scheduled");
      }
    };
    
    document.addEventListener('radioChange', handleRadioChange as EventListener);
    
    return () => {
      document.removeEventListener('radioChange', handleRadioChange as EventListener);
    };
  }, []);

  const handleBack = () => {
    router.back()
  }

  const handleContinue = () => {
    if (messageType === "email" || messageType === "both") {
      // Pass email configuration as query parameters
      const params = new URLSearchParams()
      params.append("subject", emailSubject)
      params.append("template", emailTemplate)
      params.append("audience", emailAudience)
      params.append("sendTime", sendTime)
      if (sendTime === "scheduled" && scheduledDate) {
        params.append("scheduledDate", scheduledDate.toISOString())
      }
      
      router.push(`/experience-manager/communications/template-builder?${params.toString()}`)
    } else {
      // Handle push notification submission
      console.log("Push notification submitted", {
        pushLink,
        contentId: pushLink === "content" ? contentId : undefined,
        eventId: pushLink === "event" ? eventId : undefined,
        audience: pushAudience,
        title: pushTitle,
        body: pushBody,
        sendTime,
        scheduledDate: sendTime === "scheduled" ? scheduledDate : undefined
      })
      router.push("/experience-manager/communications")
    }
  }

  const selectTemplate = (templateId: string) => {
    setEmailTemplate(templateId);
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-2">
          <RiArrowLeftLine className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create Message</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Type</CardTitle>
          <CardDescription>Select the type of message you want to send</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-start space-x-3">
              <input 
                type="radio" 
                id="messageType-push" 
                name="messageType"
                value="push" 
                checked={messageType === "push"}
                onChange={() => setMessageType("push")}
                className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary cursor-pointer mt-1"
              />
              <div className="flex flex-col">
                <Label htmlFor="messageType-push" className="font-medium flex items-center cursor-pointer">
                  <RiNotification3Line className="mr-2 h-5 w-5" />
                  Push Notification
                </Label>
                <p className="text-sm text-gray-500">Send a notification to users' devices</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input 
                type="radio" 
                id="messageType-email" 
                name="messageType"
                value="email" 
                checked={messageType === "email"}
                onChange={() => setMessageType("email")}
                className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary cursor-pointer mt-1"
              />
              <div className="flex flex-col">
                <Label htmlFor="messageType-email" className="font-medium flex items-center cursor-pointer">
                  <RiMailLine className="mr-2 h-5 w-5" />
                  Email
                </Label>
                <p className="text-sm text-gray-500">Send an email using the template builder</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input 
                type="radio" 
                id="messageType-both" 
                name="messageType"
                value="both" 
                checked={messageType === "both"}
                onChange={() => setMessageType("both")}
                className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary cursor-pointer mt-1"
              />
              <div className="flex flex-col">
                <Label htmlFor="messageType-both" className="font-medium flex items-center cursor-pointer">
                  <RiNotification3Line className="mr-2 h-5 w-5" />
                  <RiMailLine className="mr-2 h-5 w-5" />
                  Both
                </Label>
                <p className="text-sm text-gray-500">Send both a push notification and an email</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {(messageType === "push" || messageType === "both") && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Push Notification Details</CardTitle>
            <CardDescription>Configure your push notification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="push-link">Link To</Label>
              <Select 
                value={pushLink} 
                onValueChange={(value: string) => setPushLink(value as "home" | "content" | "event")}
              >
                <SelectTrigger id="push-link">
                  <SelectValue placeholder="Select where the notification links to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home Screen</SelectItem>
                  <SelectItem value="content">Content Piece</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {pushLink === "content" && (
              <div>
                <Label htmlFor="content-id">Content ID</Label>
                <Input 
                  id="content-id" 
                  value={contentId} 
                  onChange={(e) => setContentId(e.target.value)} 
                  placeholder="Enter content ID" 
                />
              </div>
            )}

            {pushLink === "event" && (
              <div>
                <Label htmlFor="event-id">Event ID</Label>
                <Input 
                  id="event-id" 
                  value={eventId} 
                  onChange={(e) => setEventId(e.target.value)} 
                  placeholder="Enter event ID" 
                />
              </div>
            )}

            <div>
              <Label htmlFor="push-audience">Audience</Label>
              <Select 
                value={pushAudience} 
                onValueChange={setPushAudience}
              >
                <SelectTrigger id="push-audience">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-users">All Users</SelectItem>
                  <SelectItem value="active-users">Active Users</SelectItem>
                  <SelectItem value="inactive-users">Inactive Users</SelectItem>
                  <SelectItem value="premium-users">Premium Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="push-title">Title</Label>
              <Input 
                id="push-title" 
                value={pushTitle} 
                onChange={(e) => setPushTitle(e.target.value)} 
                placeholder="Enter notification title" 
              />
            </div>

            <div>
              <Label htmlFor="push-body">Body</Label>
              <Textarea 
                id="push-body" 
                value={pushBody} 
                onChange={(e) => setPushBody(e.target.value)} 
                placeholder="Enter notification body" 
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {(messageType === "email" || messageType === "both") && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Email Details</CardTitle>
            <CardDescription>Configure your email message</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email-subject">Subject Line</Label>
              <Input 
                id="email-subject" 
                value={emailSubject} 
                onChange={(e) => setEmailSubject(e.target.value)} 
                placeholder="Enter email subject" 
              />
            </div>

            <div>
              <Label htmlFor="email-audience">Audience</Label>
              <Select 
                value={emailAudience} 
                onValueChange={setEmailAudience}
              >
                <SelectTrigger id="email-audience">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-users">All Users</SelectItem>
                  <SelectItem value="active-users">Active Users</SelectItem>
                  <SelectItem value="inactive-users">Inactive Users</SelectItem>
                  <SelectItem value="premium-users">Premium Users</SelectItem>
                  <SelectItem value="newsletter-subscribers">Newsletter Subscribers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block mb-3">Select Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      emailTemplate === template.id 
                        ? 'border-primary bg-primary/5 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    onClick={() => selectTemplate(template.id)}
                  >
                    <div className="flex items-start mb-2">
                      <div className="p-2 rounded-md bg-primary/10 mr-3">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </div>
                    {emailTemplate === template.id && (
                      <div className="flex justify-end">
                        <div className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Delivery Options</CardTitle>
          <CardDescription>Choose when to send your message</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                id="sendTime-now" 
                name="sendTime"
                value="now" 
                checked={sendTime === "now"}
                onChange={() => setSendTime("now")}
                className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="sendTime-now" className="font-medium cursor-pointer">Send immediately</Label>
            </div>
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                id="sendTime-scheduled" 
                name="sendTime"
                value="scheduled" 
                checked={sendTime === "scheduled"}
                onChange={() => setSendTime("scheduled")}
                className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="sendTime-scheduled" className="font-medium cursor-pointer">Schedule for later</Label>
            </div>
          </div>

          {sendTime === "scheduled" && (
            <div className="pt-4">
              <Label htmlFor="scheduled-date" className="mb-2 block">Select Date and Time</Label>
              <Input 
                id="scheduled-date"
                type="datetime-local"
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  setScheduledDate(date);
                }}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={handleBack}>Cancel</Button>
          <Button onClick={handleContinue}>
            {messageType === "email" || messageType === "both" ? "Continue to Email Builder" : "Send Push Notification"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 