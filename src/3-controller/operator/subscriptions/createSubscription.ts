import { OperatorBase } from '../operatorBase';
import { Input, Output } from '../../serializers/subscriptions';
import { Output as OutputUseCase } from '../../../2-business/useCase/subscriptions/dto/createSubscription';
import { CreateSubscriptionUseCase, createSubscriptionUseCaseToken } from '../../../2-business/useCase/subscriptions/createSubscription';
import { Service, Inject } from 'typedi';

@Service({ transient: false })
export class CreateSubscriptionOperator implements OperatorBase<Input, OutputUseCase> {
  @Inject(createSubscriptionUseCaseToken)
  private readonly useCase!: CreateSubscriptionUseCase

  async run (input: Input): Promise<Output<OutputUseCase>> {
    const { data } = await this.useCase.run({
      subscription: {
        ...input,
        subscriptionDate: new Date()
      }
    });
    return {
      status: 200,
      data
    }
  }

}