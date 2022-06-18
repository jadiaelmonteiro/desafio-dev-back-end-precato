import { SubscriptionModel } from './subscriptions';
import { MessageFlowModel } from './messageFlow';
import { MessageModel } from './message';

export function associateModel() {
  SubscriptionModel.belongsTo(MessageFlowModel, {
    foreignKey: 'message_flow_id',
    as: 'MessageFlow',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
  });
  SubscriptionModel.hasOne(MessageModel, {
    foreignKey: 'last_message',
    as: 'Message',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
  });
  MessageModel.belongsTo(MessageFlowModel, {
    foreignKey: 'message_flow_id',
    as: 'MessageFlow',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
  });
}