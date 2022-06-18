export interface Input {
  name: string
  messageFlowId: number 
  email: string
}

export interface Output<T> {
  status: number,
  data?: T
}