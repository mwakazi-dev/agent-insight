export interface UserDataType {
  key: React.Key;
  title: string;
  uid: string;
  email: number;
  displayName: string;
  phoneNumber: string;
}

export interface Agent {
  id: string;
  category: string;
  description: string;
  feedback: string;
  nextAppointmentDate: string;
  productType: string;
  userEmail: string;
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
