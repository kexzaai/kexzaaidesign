export type TaskStatus = 'Pending' | 'In-Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  client_id?: string;
  client_name: string;
  title: string;
  description: string;
  deadline: string; // ISO date string
  status: TaskStatus;
  priority: TaskPriority;
}

export interface AIPrioritySuggestion {
  id: string;
  taskId: string;
  suggestedPriority: TaskPriority;
  reason: string;
}

export interface DigitalClerkSuggestion {
  id: string;
  type: 'Message' | 'Task' | 'Reminder' | 'Insight' | 'Action' | 'Update';
  title: string;
  description: string;
  confidence: number;
  priority: TaskPriority;
  prefilledData?: any;
  timestamp?: string;
}

export type ClerkSuggestion = DigitalClerkSuggestion;

export type ClientStatus = 'Active' | 'Inactive' | 'Onboarding';
export type ClientPriority = 'High' | 'Medium' | 'Low';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  status: ClientStatus;
  priority: ClientPriority;
  complianceScore: number;
  openTasks: number;
  pendingFilings: number;
}

export type DocumentType = 'PDF' | 'IMAGE' | 'DOC' | 'SHEET';

export interface DocumentData {
  id: string;
  user_id?: string;
  client_id?: string;
  filename: string;
  type: DocumentType;
  sizeKb: number;
  priority: 'Urgent' | 'Normal' | 'Archived';
  uploadDate: string;
  url?: string;
  storage_path?: string;
}

export interface MessageData {
  id: string;
  senderName: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  isAIDraft?: boolean;
}

export interface ChannelData {
  id: string;
  name: string;
  type: 'Client' | 'Internal';
  unread: number;
}
