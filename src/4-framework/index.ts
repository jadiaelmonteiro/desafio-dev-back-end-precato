import 'reflect-metadata';
import express from 'express';
import { DataBaseService } from '../dataBaseService';
import { handler as postSubscriptionsHandler } from './functions/subscriptions/postSubscriptions';

//iniciando o express.
const app = express(); 

//metodo use, pegando os dados e convertendo pra Json.
app.use(express.json());

//metodo post, com a rota e uma função callback que recebe req e res.
app.post('/subcriptions', postSubscriptionsHandler);

app.post('/message-flow', async function (req, res, next) {
  const { body } = req;
  if (!body.templateName || !body.position ) {
    res.status(400).json({ success: false });
    return next(new Error('bad request'));
  }

  const service = new DataBaseService();
  try {
    await service.createMessageFlow(body);
  } catch(error) {
    res.status(400).json({ success: false });
    return next(error);
  } finally {
    await service.closeConnection();
  }

  res.status(200).json({ success: true });
  return next();
});

app.post('/messages', async function (req, res, next) {
  const { body } = req;
  if (!body.subject || !body.createdAt || !body.messageFlowId) {
    res.status(400).json({ success: false });
    return next(new Error('bad request'));
  }

  const service = new DataBaseService();
  try {
    await service.createMessage(body);
  } catch(error) {
    res.status(400).json({ success: false });
    return next(error);
  } finally {
    await service.closeConnection();
  }

  res.status(200).json({ success: true });
  return next();
});

//servidor local, passando a porta.
app.listen(3000, function () {
  console.log("estou conectado");
})
