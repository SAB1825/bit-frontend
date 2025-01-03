export interface Complaint {
  _id: string
  complaintId: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'resolved'
  availableDate: string
  availableTime: string
  imageUrl?: string
  createdAt: string
  user: {
    googleId: string
    username: string
    email: string
  }
}

export interface ComplaintFormData {
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'resolved'
  availableDate: string
  availableTime: string
}


export interface ComplaintStats {
  total: number
  inProgress: number
  resolved: number
}
