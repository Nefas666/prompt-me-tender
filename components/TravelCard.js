'use client'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/Card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/Accordion"
import { Skeleton } from "./ui/Skeleton"
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert"
import { AlertCircle, Save, Share2, List } from "lucide-react"
import { Button } from "./ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function TravelCard({ numberOfDays, timeOfYear, typeOfTransport, priceRange }) {
  const [travelContent, setTravelContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savedPlans, setSavedPlans] = useState([])

  useEffect(() => {
    const fetchTravelContent = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numberOfDays, timeOfYear, typeOfTransport, priceRange }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch travel content')
        }

        const data = await response.json()
        setTravelContent(data.generatedText)
      } catch (err) {
        setError(err)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTravelContent()
    loadSavedPlans()
  }, [numberOfDays, timeOfYear, typeOfTransport, priceRange])

  const loadSavedPlans = () => {
    const plans = JSON.parse(localStorage.getItem('travelPlans') || '[]')
    setSavedPlans(plans)
  }

  const handleSave = () => {
    const newPlan = {
      id: Date.now(),
      content: travelContent,
      parameters: { numberOfDays, timeOfYear, typeOfTransport, priceRange }
    }
    const updatedPlans = [...savedPlans, newPlan]
    localStorage.setItem('travelPlans', JSON.stringify(updatedPlans))
    setSavedPlans(updatedPlans)
    toast.success('Travel plan saved successfully!')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Travel Plan',
          text: `Check out my travel plan for ${numberOfDays} days in ${timeOfYear} using ${typeOfTransport} with a budget of ${priceRange}!`,
          url: window.location.href,
        })
        toast.success('Travel plan shared successfully!')
      } catch (error) {
        console.error('Error sharing:', error)
        toast.error('Failed to share travel plan. Please try again.')
      }
    } else {
      toast.info('Sharing is not supported on this browser. Try copying the URL manually.')
    }
  }

  const handleDelete = (id) => {
    const updatedPlans = savedPlans.filter(plan => plan.id !== id)
    localStorage.setItem('travelPlans', JSON.stringify(updatedPlans))
    setSavedPlans(updatedPlans)
    toast.success('Travel plan deleted successfully!')
  }

  const SavedPlansDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <List className="w-4 h-4" />
          Saved Plans
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Saved Travel Plans</DialogTitle>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto">
          {savedPlans.length === 0 ? (
            <p>No saved plans yet.</p>
          ) : (
            savedPlans.map((plan) => (
              <div key={plan.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{plan.parameters.timeOfYear} Trip</h3>
                <p>{plan.parameters.numberOfDays} days, {plan.parameters.typeOfTransport}, {plan.parameters.priceRange}</p>
                <Button onClick={() => handleDelete(plan.id)} variant="destructive" size="sm" className="mt-2">
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto overflow-scroll max-h-[580px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Travel Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          {travelContent && (
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-4" {...props} />,
                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
              }}
            >
              {travelContent}
            </ReactMarkdown>
          )}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="parameters">
              <AccordionTrigger>Travel Parameters</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6">
                  <li>Number of Days: {numberOfDays}</li>
                  <li>Time of Year: {timeOfYear}</li>
                  <li>Type of Transport: {typeOfTransport}</li>
                  <li>Price Range: {priceRange}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Plan
          </Button>
          <SavedPlansDialog />
          <Button onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Plan
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer position="bottom-right" />
    </>
  )
}