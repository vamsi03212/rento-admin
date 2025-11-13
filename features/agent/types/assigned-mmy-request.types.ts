export interface AgentMyRequest {
  id: number;
  userId: number;
  propertyId: number;
  fullName: string;
  phoneNumber: string;
  emailId: string;
  profession: string;
  address: string;
  fatherName: string;
  motherName: string;
  uploadDocument: string;
  dateOfBirth: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  Property: {
    id: number;
    agentId: number;
    project_name: string;
  };
  User: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

export interface AgentMyRequestRes {
  data: AgentMyRequest[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}
