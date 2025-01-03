
export interface guestFormData {
    count: string
    phoneNo : string
    checkIn: string
    checkOut: string

}
export interface GuestStats {
    success: boolean;
    data: {
        todayCheckIns: {
            totalGuests: number;
            bookingsCount: number;
        };
        todayCheckOuts: {
            totalGuests: number;
            bookingsCount: number;
        };
        monthlyStats: {
            totalGuests: number;
            bookingsCount: number;
        };
    }
}

export interface Guest {
    _id: string
    guestId: string
    count: string
    checkIn: string
    checkOut: string
    phoneNo: string
    createdAt: string
    user: {
      email: string
      googleId: string
    }
  }