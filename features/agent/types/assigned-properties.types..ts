import { PropertyType } from "@/features/owner/types/property.type";

export interface AssignedPropertyRes {
  data: PropertyType[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}
