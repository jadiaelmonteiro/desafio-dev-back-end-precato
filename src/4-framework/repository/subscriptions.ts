import { ISubscriptionsRepository, SubscriptionsRepositoryToken } from '../../2-business/repository/subscriptions';
import { SubscriptionModelToken, SubscriptionModel } from '../../1-domain/model/subscriptions';
import { Input, Output } from '../../2-business/repository/dto/subscriptions'
import { Service, Inject } from 'typedi';

@Service({ transient: false, id: SubscriptionsRepositoryToken })
export class SubscriptionsRepository implements ISubscriptionsRepository {
  @Inject(SubscriptionModelToken)
  private readonly subscriptionModel!: typeof SubscriptionModel

  async createSubscription (input: Input): Promise<Output> {
    const model = await this.subscriptionModel.create(input)
    return model.get()
  }
}