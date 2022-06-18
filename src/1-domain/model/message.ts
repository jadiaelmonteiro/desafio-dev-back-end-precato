import { Model } from 'sequelize';
import { Message } from '../entity/message';
import { Token } from 'typedi';

export const MessageModelToken = new Token<typeof MessageModel>('MessageModel');

export class MessageModel extends Model<Required<Message>> { }