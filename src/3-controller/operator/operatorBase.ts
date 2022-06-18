import { Output } from '../serializers/subscriptions';

export interface OperatorBase<I, O> {
  run (input: I): Promise<Output<O>>
}