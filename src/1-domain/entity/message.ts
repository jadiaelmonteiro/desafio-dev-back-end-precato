export interface Message {
  id: number
  subject?: string
  createdAt: Date
  messageFlowId?: number
}