"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Textarea } from "@/components/Textarea"
import { RiArrowLeftLine, RiMailLine, RiNotification3Line } from "@remixicon/react"

// Simple RadioGroup implementation until we create the proper component
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

const RadioGroupItem = ({ value, id }: { value: string; id: string }) => (
  <input 
    type="radio" 
    id={id} 
    value={value} 
    checked={false} 
    onChange={() => {}} 
    className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
  />
);

export default function CreateMessage() {
  const router = useRouter()
  const [messageType, setMessageType] = useState<"push" | "email" | "both">("push")
  const [pushLink, setPushLink] = useState<"home" | "content" | "event">("home")
  const [contentId, setContentId] = useState("")
  const [eventId, setEventId] = useState("")
  const [audience, setAudience] = useState("all-users")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [sendTime, setSendTime] = useState<"now" | "scheduled">("now")
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)

  const handleBack = () => {
    router.back()
  }

  const handleContinue = () => {
    if (messageType === "email" || messageType === "both") {
      router.push("/experience-manager/communications/template-builder")
    } else {
      // Handle push notification submission
      console.log("Push notification submitted", {
        pushLink,
        contentId: pushLink === "content" ? contentId : undefined,
        eventId: pushLink === "event" ? eventId : undefined,
        audience,
        title,
        body,
        sendTime,
        scheduledDate: sendTime === "scheduled" ? scheduledDate : undefined
      })
      router.push("/experience-manager/communications")
    }
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
          <RadioGroup 
            value={messageType} 
            onValueChange={(value: string) => setMessageType(value as "push" | "email" | "both")}
            className="flex flex-col space-y-4"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="push" id="push" />
              <div className="flex flex-col">
                <Label htmlFor="push" className="font-medium flex items-center">
                  <RiNotification3Line className="mr-2 h-5 w-5" />
                  Push Notification
                </Label>
                <p className="text-sm text-gray-500">Send a notification to users' devices</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="email" id="email" />
              <div className="flex flex-col">
                <Label htmlFor="email" className="font-medium flex items-center">
                  <RiMailLine className="mr-2 h-5 w-5" />
                  Email
                </Label>
                <p className="text-sm text-gray-500">Send an email using the template builder</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="both" id="both" />
              <div className="flex flex-col">
                <Label htmlFor="both" className="font-medium flex items-center">
                  <RiNotification3Line className="mr-2 h-5 w-5" />
                  <RiMailLine className="mr-2 h-5 w-5" />
                  Both
                </Label>
                <p className="text-sm text-gray-500">Send both a push notification and an email</p>
              </div>
            </div>
          </RadioGroup>
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
              <Label htmlFor="audience">Audience</Label>
              <Select 
                value={audience} 
                onValueChange={setAudience}
              >
                <SelectTrigger id="audience">
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
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter notification title" 
              />
            </div>

            <div>
              <Label htmlFor="body">Body</Label>
              <Textarea 
                id="body" 
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
                placeholder="Enter notification body" 
                rows={3}
              />
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
          <RadioGroup 
            value={sendTime} 
            onValueChange={(value: string) => setSendTime(value as "now" | "scheduled")}
            className="flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="now" id="send-now" />
              <Label htmlFor="send-now" className="font-medium">Send immediately</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="scheduled" id="send-scheduled" />
              <Label htmlFor="send-scheduled" className="font-medium">Schedule for later</Label>
            </div>
          </RadioGroup>

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