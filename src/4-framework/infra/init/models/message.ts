import { Service, Container } from 'typedi';
import { Sequelize, DataTypes } from 'sequelize';
import { MessageModel, MessageModelToken } from '../../../../1-domain/model/message';

@Service({ transient: false, id: 'models', multiple: true })
export class SubscriptionsModelDefine {
  constructor (private readonly sequelize: Sequelize) {
    MessageModel.init({
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      subject: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
      },
      messageFlowId: {
        type: DataTypes.NUMBER,
        field: "message_flow_id"
      }
    }, {
      sequelize: this.sequelize,
      modelName: 'message',
      tableName: 'messages',
      createdAt: true,
      updatedAt: false,
      indexes: [{
        name: 'fk_message_flow_id_idx',
        fields: ['message_flow_id']
      }]
    });
    Container.set(MessageModelToken, MessageModel);
  }
}