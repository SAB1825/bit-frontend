"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchGuestStats } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query"
import { ClipboardList, LogOut, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export const GuestStats = () => {
    const { data: stats, isLoading, error, isError } = useQuery({
        queryKey: ['guests-stats'],
        queryFn: fetchGuestStats,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 1000,
    });

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map(key => (
                    <Card key={key} className="overflow-hidden">
                        <CardHeader className="animate-pulse bg-gray-200 h-8" />
                        <CardContent className="animate-pulse bg-gray-200 h-16" />
                    </Card>
                ))}
            </div>
        )
    }

    if(!stats) {
        return <div className="text-gray-500 text-center">No data available</div>
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center">
                Error loading stats: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                title="Today's Check-ins"
                value={stats.data.todayCheckIns.totalGuests}
                subtext={`${stats.data.todayCheckIns.bookingsCount} bookings today`}
                icon={ClipboardList}
                delay={0.1}
            />
            <StatCard
                title="Today's Check-outs"
                value={stats.data.todayCheckOuts.totalGuests}
                subtext={`${stats.data.todayCheckOuts.bookingsCount} departures today`}
                icon={LogOut}
                delay={0.2}
            />
            <StatCard
                title="Monthly Guests"
                value={stats.data.monthlyStats.totalGuests}
                subtext={`${stats.data.monthlyStats.bookingsCount} bookings this month`}
                icon={Users}
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

