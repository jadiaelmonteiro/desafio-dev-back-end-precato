import { Input, Output } from './dto/subscriptions';
import { Token } from 'typedi';

export const SubscriptionsRepositoryToken = new Token<ISubscriptionsRepository>('ISubscriptionsRepository');

export interface ISubscriptionsRepository {
  createSubscription: (input: Input) => Promise<Output>
}