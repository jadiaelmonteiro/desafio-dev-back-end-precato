import { RequestHandler } from 'express';
import { Container } from 'typedi';
import { CreateSubscriptionOperator } from '../../../3-controller/operator/subscriptions/createSubscription';
import initializeDI from '../../infra/initializeDI';

export const handler: RequestHandler = async function (request, response, next) {
  await initializeDI();
  const { body } = request;
  if(!body.email || !body.name || !body.messageFlowId) {
    response.status(400).json({ success: false})
    return next(new Error('bad request'));
  }
  const operator = Container.get(CreateSubscriptionOperator);

  try {
    const res = await operator.run(body);
    response.status(res.status).json(res.data);
    return next();
  } catch(error) {
    console.error(`PostSubscriptions :: error`, error);
    response.status(400).json({ success: false });
    return next(error);
  }
}