import { Model } from 'sequelize';
import { MessageFlow } from '../entity/messageFlow';
import { Token } from 'typedi';

export const MessageFlowModelToken = new Token<typeof MessageFlowModel>('MessageFlowModel');

export class MessageFlowModel extends Model<Required<MessageFlow>> { }