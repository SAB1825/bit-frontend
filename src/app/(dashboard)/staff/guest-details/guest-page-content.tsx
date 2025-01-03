"use client"

import { GuestsTable } from "@/components/guests-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchGuestStats } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query"
import { ClipboardList, LogOut, Users } from "lucide-react"



export const GuestPageContent = () => {
    const { data: stats, isLoading, error, isError } = useQuery({
        queryKey: ['guests-stats'],
        queryFn: fetchGuestStats,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 1000,
      });
    console.log("Data from Pge" , stats)
    console.log('Guest render state:', { stats, isLoading, error }) // Debug log

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    {[1, 2, 3].map(key => (
                        <Card key={key}>
                            <CardHeader className="animate-pulse bg-gray-200 h-8" />
                            <CardContent className="animate-pulse bg-gray-200 h-16" />
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if(!stats) {
        return <div>No data available</div>
    }
    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Error loading stats: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        )
    }
    return (
        <div className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
                {/* Today's Check-ins */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today's Check-ins
                        </CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.data.todayCheckIns.totalGuests}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.data.todayCheckIns.bookingsCount} bookings today
                        </p>
                    </CardContent>
                </Card>

                {/* Today's Check-outs */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today's Check-outs
                        </CardTitle>
                        <LogOut className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.data.todayCheckOuts.totalGuests}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.data.todayCheckOuts.bookingsCount} departures today
                        </p>
                    </CardContent>
                </Card>

                {/* Monthly Guests */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Guests
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.data.monthlyStats.totalGuests}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.data.monthlyStats.bookingsCount} bookings this month
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="py-6">
                <GuestsTable />
            </div>

        </div>
    )
}