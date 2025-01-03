export interface Inmate {
    inmateId: string;
    name: string;
    relation: string;
    age: number;
    createdAt: Date;
  }
  export interface Session {
    deviceId: string;
    deviceName: string;
    browser: string;
    os: string;
    lastActive: Date;
    ip: string;
    isActive: boolean;
  }
  
  export interface UserProfile {
    googleId: string;
    username: string;
    email: string;
    profileImage: string;
    firstName: string;
    lastName: string;
    bloodGroup: string;
    aadharNumber: string;
    vehicleNumber: string;
    dateOfBirth: Date;
    department: string;
    permanentAddress: string;
    age: number;
    profileCompleted: boolean;
    phoneNumber: string;
    quarterNumber: string;
    quarterName: string;
    inmates: Inmate[];
    sessions: Session[];
  }
  
 