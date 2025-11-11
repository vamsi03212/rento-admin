export interface ServiceType {
  id: number;
  upload_document: string;
  originalFileName: string;
  filename: string;
  service_name: string;
  price: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  currency: string | null;
}

export interface PostServiceTypes {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  date: number;
  time: string;
  ownerId: number;
  description: string;
  serviceType: string;
}

export interface ExistingServiceType {
  id: number;
  serviceType: string;
  date: string;
  timeslot: string;
  description: string;
  serviceStatus: ServiceStatus;
  serviceDetails: {
    price: string;
  };
}

export enum ServiceStatus {
  COMPLETE = "complete",
  CANCELLED = "cancelled",
  ASSIGNED = "assigned",
  IN_PROGRESS = "in progress",
}

export interface ExistingServiceResponse {
  data: ExistingServiceType[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}
