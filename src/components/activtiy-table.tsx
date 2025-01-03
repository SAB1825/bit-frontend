import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';
import { Activity } from '@/types/activity';
import { Loader2 } from 'lucide-react';
import { fetchActivities } from '@/lib/queries';

interface ActivityResponse {
  success: boolean;
  data: Activity[];
}

const ActivityTable = () => {
  const { data, isLoading, error } = useQuery<ActivityResponse>({
    queryKey: ['todayActivities'],
    queryFn: fetchActivities,
    refetchInterval: 5000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0, 
    retry: 1
  });


  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading activities</div>;
  }

  if (!data?.data.length) {
    return <div className="text-center p-4">No activities today</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Activity</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((activity: Activity) => (
          <TableRow key={activity._id}>
            <TableCell>{activity.description}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActivityTable;