import { UseCaseBase } from '../useCaseBase';
import { Input, Output as O } from './dto/createSubscription';
import { SubscriptionsRepositoryToken, ISubscriptionsRepository } from '../../repository/subscriptions';
import { Output } from '../../dto/output';
import { Service, Inject, Token } from 'typedi';

export const createSubscriptionUseCaseToken = new Token<CreateSubscriptionUseCase>('createSubscriptionUseCaseToken');

@Service({ transient: false, id: createSubscriptionUseCaseToken  })
export class CreateSubscriptionUseCase implements UseCaseBase<Input, O> {
  @Inject(SubscriptionsRepositoryToken)
  private readonly subscriptionsRepository!: ISubscriptionsRepository;

  async run (input: Input): Promise<Output<O>> {
    const data = await this.subscriptionsRepository.createSubscription({
      ...input.subscription
    });
    console.debug(`CreateSubscriptionUseCase :: createSubscription :: data`, data);
    return {
      data: {
        success: true
      }
    }
  }
}