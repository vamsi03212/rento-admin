import { PropertyType } from "@/features/owner/types/property.type";

export interface AgentProofOfVisit {
  id: number;
  image: string;
  description: string;
  date: string;
  agentId: number;
  propertyId: number;
  createdAt: string;
  updatedAt: string;
  Property: PropertyType;
}
export interface AgentProofOfVisitRes {
  data: AgentProofOfVisit[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}
