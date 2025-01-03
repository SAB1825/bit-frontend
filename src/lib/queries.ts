import { createGuestSchema } from "@/schemas/guest-schema";
import {
  Complaint,
  ComplaintFormData,
  ComplaintStats,
} from "@/types/complaints";
import { Guest, GuestStats } from "@/types/guests";
import { Inmate, Session, UserProfile } from "@/types/staff";
import { z } from "zod";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL;
interface UserStats {
  total: number;
  staff: number;
  admin: number;
}
export const deleteGuest = async (guestId: string) => {
  const response = await fetch(`${API_BASE_URL}/guests/${guestId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to delete guest");
  return response.json();
};

export const fetchGuestStats = async (): Promise<GuestStats> => {
  try {
    const res = await fetch(`${API_BASE_URL}/guests/stats`, {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch stats");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};
export const fetchAllGuestStats = async (): Promise<GuestStats> => {
  try {
    const res = await fetch(`${API_BASE_URL}/guests/all-stats`, {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch stats");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};
export const fetchGuests = async (): Promise<Guest[]> => {
  const response = await fetch(`${API_BASE_URL}/guests`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch guests");
  }
  const result = await response.json();
  return result.data;
};
export const fetchAllGuests = async (): Promise<Guest[]> => {
  const response = await fetch(`${API_BASE_URL}/guests/all-guest`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch guests");
  }
  const result = await response.json();
  return result.data;
};
export const fetchGuestById = async (guestId: string) => {
  const response = await fetch(`${API_BASE_URL}/guests/${guestId}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch guest");
  return response.json();
};
export const fetchComplaint = async (complaintId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/complaints/${complaintId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Failed to fetch complaint");
  return response.json();
};
export const deleteComplaint = async (complaintId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/complaints/${complaintId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Failed to delete complaint");
  return response.json();
};
export const createGuest = async (data: z.infer<typeof createGuestSchema>) => {
  const response = await fetch(`${API_BASE_URL}/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      count: data.count,
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
      phoneNo: data.phoneNo,
    }),
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Please login first");
    }
    const error = await response.json();
    throw new Error(error.message || "Failed to create guest");
  }
  return response.json();
};
export const fetchTodayCheckInGuests = async (): Promise<Guest[]> => {
  const response = await fetch(`${API_BASE_URL}/guests/today-check-in`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch today's check-in guests");
  const data = await response.json();
  return data.data;
};
export const fetchTodayCreatedComplaints = async (): Promise<Complaint[]> => {
  const response = await fetch(`${API_BASE_URL}/complaints/today-created`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch today's created complaints");
  const data = await response.json();
  return data.data;
};
export const fetchTodayComplaints = async (): Promise<Complaint[]> => {
  const response = await fetch(`${API_BASE_URL}/complaints/today`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch today's complaints");
  const data = await response.json();
  return data.data;
};
export const fetchAllComplaints = async (): Promise<Complaint[]> => {
  
  const response = await fetch(`${API_BASE_URL}/complaints/all-complaints`, {
    credentials: "include", 
  })
  if (!response.ok) {
    throw new Error('Failed to fetch complaints')
  }
  return response.json()
}
export const fetchComplaints = async (): Promise<Complaint[]> => {
  
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    credentials: "include", 
  })
  if (!response.ok) {
    throw new Error('Failed to fetch complaints')
  }
  return response.json()
}
export const updateComplaint = async (
  complaintId: string,
  data: ComplaintFormData
): Promise<Complaint> => {
  const response = await fetch(
    `${API_BASE_URL}/complaints/${complaintId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Failed to update complaint");
  return response.json();
};
export const createComplaint = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Please login first");
    }
    throw new Error("Failed to create complaint");
  }
  return response.json();
};
export const fetchComplaintStats = async (): Promise<ComplaintStats> => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/stats`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }
    const data = await response.json();
    console.log("Fetched stats:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};
export const fetchAllComplaintStats = async (): Promise<ComplaintStats> => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/all-stats`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }
    const data = await response.json();
    console.log("Fetched stats:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};
export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}/staff/profile`, {
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error("Please login first");
    throw new Error("Failed to fetch profile");
  }
  return response.json();
};
export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};
export const addInmate = async (data: Omit<Inmate, "inmateId" | "createdAt">): Promise<Inmate> => {
  const response = await fetch(`${API_BASE_URL}/staff/inmates`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add inmate");
  return response.json();
};
export const removeInmate = async (inmateId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/staff/inmates/${inmateId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to remove inmate");
};
export const updateInmate = async (
  inmateId: string, 
  data: Partial<Inmate>
): Promise<Inmate> => {
  const response = await fetch(`${API_BASE_URL}/staff/inmates/${inmateId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update inmate");
  return response.json();
};
export const fetchActiveSessions = async (): Promise<Session[]> => {
  const response = await fetch(`${API_BASE_URL}/staff/sessions`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch sessions");
  return response.json();
};
export const terminateSession = async (deviceId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/staff/sessions/${deviceId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to terminate session");
};
export const handleLogout = async () => {
  try {
    await fetch(`${API_AUTH_BASE_URL}/logout`, {
      credentials: 'include'
    });
    window.location.href = '/sign-in';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
export const fetchActivities = async () => {
  const res = await fetch(`${API_BASE_URL}/activities/today`, {
    credentials: 'include'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch activities');
  }
  const responseData = await res.json();
  return responseData;
}
export const fetchUserById = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};
export const deleteUser = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to delete user");
  return response.json();
};
export const updateUser = async (userId: string, data: Partial<UserProfile>) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};
export const fetchUserStats = async (): Promise<UserStats> => {
  const res = await fetch(`${API_BASE_URL}/users/stats`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Failed to fetch user stats');
  return res.json();
};
export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/all`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}
