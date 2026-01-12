
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'Phone' | 'Email' | 'AppUser';
}

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  lastCheckIn: Date | null;
  emergencyContacts: EmergencyContact[];
  locationConsent: boolean;
  notificationConsent: boolean;
  batteryLevel: number; // Percentage 0-100
  lastLocation: { lat: number; lng: number } | null;
}

export interface CheckInLog {
  timestamp: Date;
  location: { lat: number; lng: number } | null;
  batteryLevel: number;
}

export type ViewState = 'dashboard' | 'contacts' | 'architecture' | 'legal';
