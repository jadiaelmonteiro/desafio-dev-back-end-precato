import { Subscription } from '../../../../1-domain/entity/subscriptions';

export interface Input {
  subscription: Omit<Subscription, 'id' | 'active'>
}

export interface Output {
  success: boolean
}