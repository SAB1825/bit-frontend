import { AdminComplaintStats } from "@/components/admin-complaint-stats";
import { AdminGuestStats } from "@/components/admin-guest-stats";
import { TodayCheckInTable } from "@/components/today-check-in";
import { TodayComplaintsTable } from "@/components/today-complaints";
import React from "react";

const AdminPageContent = () => {
  return (
    <div>
      <AdminGuestStats />
      <AdminComplaintStats />
      <div className="p-6">
        <p className="font-semibold">Today Check-In Details </p>
        <TodayCheckInTable />
      </div>
      <div className="p-6">
        <p className=" font-extrabold">Complaints should solved by today</p>
        <TodayComplaintsTable />
      </div>
    </div>
  );
};

export default AdminPageContent;
