export interface LatestPropertyImage {
  id: number;
  image: string; // path to image
  originalFileName: string;
  filename: string;
  propertyId: number;
  createdAt: string;
  updatedAt: string;
}

interface LatestPropertyOwner {
  id?: number;
  first_name: string;
  last_name: string;
}
export interface PropertyType {
  id: number;
  amenities: string[];
  rentType: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  totalFloors: number;
  floorNo: number;
  facing: string;
  nearbySchool: string;
  nearbyHospital: string;
  nearbyParks: string;
  nearbyMalls: string;
  projectName: string;
  description: string;
  advanceAmount: string;
  monthsAdvance: number;
  maintenance: string;
  rentAmount: string;
  country: string;
  location: string;
  area: string;
  isVerified: boolean;
  propertyStatus: string;
  propertyAge: number;
  propertyLength: string;
  latitude: number;
  longitude: number;
  isAssigned: boolean;
  agentId: number;
  ownerId: number;
  reason?: string | null;
  is_listed: boolean;
  createdAt: string;
  updatedAt: string;
  images: LatestPropertyImage[];
  Owner: LatestPropertyOwner;
  Agent?: {
    first_name: string;
    last_name: string;
  };
}

export interface PropertyPaginationResponse {
  data: PropertyType[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
