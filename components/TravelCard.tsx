'use client'

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/Accordion"
import { Skeleton } from "./ui/Skeleton"
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert"
import { AlertCircle } from "lucide-react"

interface TravelCardProps {
    numberOfDays: number;
    timeOfYear: string;
    typeOfTransport: string;
    priceRange: string;
}

export default function TravelCard({ numberOfDays, timeOfYear, typeOfTransport, priceRange }: TravelCardProps) {
    const [travelContent, setTravelContent] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
                setError('An error occurred while fetching travel content. Please try again later.')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTravelContent()
    }, [numberOfDays, timeOfYear, typeOfTransport, priceRange])

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
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Travel Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
                {travelContent && (
                    <ReactMarkdown
                        components={{
                            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-4" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
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
        </Card>
    )
}