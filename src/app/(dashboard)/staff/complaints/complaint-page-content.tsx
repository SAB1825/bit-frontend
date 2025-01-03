'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Clock, CheckCircle } from "lucide-react"
import { ComplaintsTable } from "@/components/complaints-table"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import ComplaintForm from "@/components/create-complaint"
import { fetchComplaintStats } from "@/lib/queries"



export const ComplaintPageContent = () => {
    const { data: stats, isLoading, error, isError } = useQuery({
        queryKey: ['complaintStats'],
        queryFn: fetchComplaintStats,
    })

    console.log('Component render state:', { stats, isLoading, error }) // Debug log

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="animate-pulse bg-gray-200 h-8" />
                            <CardContent className="animate-pulse bg-gray-200 h-16" />
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Error loading stats: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        )
    }

    if (!stats) {
        return <div className="p-6">No data available</div>
    }

    if (stats.total === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">No complaints yet</h2>
                    <p className="text-muted-foreground">Create your first complaint to get started.</p>
                </div>
                <ComplaintForm>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Complaint
                    </Button>
                </ComplaintForm>
            </div>
        )
    }

    return (
        <>
            <div className="p-6">
                

                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Complaints
                            </CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">
                                All submitted complaints
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                In Progress
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.inProgress}</div>
                            <p className="text-xs text-muted-foreground">
                                Complaints being processed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Resolved
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.resolved}</div>
                            <p className="text-xs text-muted-foreground">
                                Completed complaints
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="px-6">
                <ComplaintsTable />
            </div>
        </>
    )
}