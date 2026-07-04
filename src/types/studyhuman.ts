export type UserRole = "student" | "helper" | "admin";

export type RequestStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "quoted"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}

export interface Helper {
  id: string;
  profile_id: string | null;
  display_name: string;
  title: string | null;
  bio: string | null;
  specialties: string[];
  expertise_tags: string[];
  rating: number;
  sessions_completed: number;
  response_time: string | null;
  is_verified: boolean;
  is_online: boolean;
  accepts_urgent_requests: boolean;
  hourly_rate: number | null;
  created_at: string;
  updated_at: string;
}

export interface StudyRequest {
  id: string;
  user_id: string;
  helper_id: string | null;
  service_category_id: string | null;
  subject: string | null;
  academic_level: string;
  deadline: string;
  quantity_type: string;
  quantity: number;
  description: string | null;
  estimated_min_price: number | null;
  estimated_max_price: number | null;
  final_price: number | null;
  status: RequestStatus;
  ethical_support_confirmed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  request_id: string | null;
  student_id: string;
  helper_id: string | null;
  support_admin_id: string | null;
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  message_body: string;
  attachment_url: string | null;
  is_read: boolean;
  created_at: string;
}
