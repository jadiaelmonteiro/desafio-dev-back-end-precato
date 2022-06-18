import { Output } from '../dto/output';

export interface UseCaseBase<I, O> {
  run: (input: I) => Promise<Output<O>>
}