'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Clock, CheckCircle, PlusCircle } from 'lucide-react'
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import ComplaintForm from "@/components/create-complaint"
import { fetchComplaintStats } from "@/lib/queries"
import { motion } from 'framer-motion'

export const ComplaintStats = () => {
    const { data: stats, isLoading, error, isError } = useQuery({
        queryKey: ['complaintStats'],
        queryFn: fetchComplaintStats,
    })

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <CardHeader className="animate-pulse bg-gray-200 h-8" />
                        <CardContent className="animate-pulse bg-gray-200 h-16" />
                    </Card>
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center">
                Error loading stats: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        )
    }

    if (!stats) {
        return <div className="text-gray-500 text-center">No data available</div>
    }

    if (stats.total === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800">No complaints yet</h2>
                    <p className="text-gray-500">Create your first complaint to get started.</p>
                </div>
                <ComplaintForm>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Complaint
                    </Button>
                </ComplaintForm>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                title="Total Complaints"
                value={stats.total}
                subtext="All submitted complaints"
                icon={ClipboardList}
                delay={0.1}
            />
            <StatCard
                title="In Progress"
                value={stats.inProgress}
                subtext="Complaints being processed"
                icon={Clock}
                delay={0.2}
            />
            <StatCard
                title="Resolved"
                value={stats.resolved}
                subtext="Completed complaints"
                icon={CheckCircle}
                delay={0.3}
            />
        </div>
    )
}

const StatCard = ({ title, value, subtext, icon: Icon, delay }: { title: string, value: number, subtext: string, icon: React.ElementType, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
                <p className="text-xs text-gray-500 mt-1">
                    {subtext}
                </p>
            </CardContent>
        </Card>
    </motion.div>
)

