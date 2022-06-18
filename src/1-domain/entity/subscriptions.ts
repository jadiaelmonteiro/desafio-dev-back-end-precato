export interface Subscription {
  id: number
  subscriptionDate?: Date
  name?: string
  lastMessage?: number
  active: boolean
  messageFlowId?: number 
  email?: string
}