export interface Notification {
  id: number;
  title: string;
  body: string;
  data: any | null;
  type: string;
  channel: string;
  senderId: number;
  isRead: boolean;
  targetRole: string;
  targetUserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  data: Notification[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}
