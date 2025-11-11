import { PropertyType } from "./property.type";

export interface EnquiryProperty {
  id: number;
  date: string;
  user_id: number;
  property_id: number;
  agentId: number;
  ownerId: number;
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  isVerified: boolean;
  isSubmitted: boolean;
  createdAt: string;
  updatedAt: string;
  Property: PropertyType;
  User: {
    first_name: string;
    last_name: string;
  };
}

export interface PaginationEnquiryProperty {
  data: EnquiryProperty[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}
