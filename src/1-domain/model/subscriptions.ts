import { Model } from 'sequelize';
import { Subscription } from '../entity/subscriptions';
import { Token } from 'typedi';

export const SubscriptionModelToken = new Token<typeof SubscriptionModel>('SubscriptionModel');

export class SubscriptionModel extends Model<Required<Subscription>, Omit<Subscription, 'id' | 'active'>> { }