'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, UserCog } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { AllUserTable } from "@/components/all-user-table";
import { fetchUserStats } from "@/lib/queries";



export const UserPageContent = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['userStats'],
    queryFn: fetchUserStats,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="animate-pulse bg-gray-200 h-8" />
              <CardContent className="animate-pulse bg-gray-200 h-16" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading stats</div>;
  }

  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Users</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.staff || 0}</div>
            <p className="text-xs text-muted-foreground">
              Staff members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.admin || 0}</div>
            <p className="text-xs text-muted-foreground">
              Administrators
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <AllUserTable />
      </div>
    </div>
  );
};