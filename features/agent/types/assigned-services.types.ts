export interface ServiceDetails {
  price: string;
}

export interface AssignedProperties {
  id: number;
  firstName: string;
  lastName: string;
  serviceType: string;
  timeslot: string;
  date: string;
  email: string;
  phoneNumber: string;
  address: string;
  ownerId: number;
  isAssigned: boolean;
  agentId: number;
  serviceStatus: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  serviceDetails: ServiceDetails;
}

export interface AssignedServiceRes {
  data: AssignedProperties[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}
