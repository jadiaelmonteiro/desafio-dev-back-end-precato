import { Subscription } from '../../../1-domain/entity/subscriptions';

export interface Input extends Omit<Subscription, 'id' | 'active'> { }

export interface Output extends Subscription { }