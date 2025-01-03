export interface Activity {
    _id: string;
    user: {
      googleId: string;
      email: string;
      username: string;
    };
    type: 'GUEST_CREATED' | 'COMPLAINT_CREATED' | 'GUEST_UPDATED' | 'COMPLAINT_UPDATED';
    description: string;
    createdAt: string;
  }