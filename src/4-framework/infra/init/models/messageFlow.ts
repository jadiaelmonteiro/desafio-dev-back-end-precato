import { Service, Container, Token } from 'typedi';
import { Sequelize, DataTypes } from 'sequelize';
import { MessageFlowModel, MessageFlowModelToken } from '../../../../1-domain/model/messageFlow';

@Service({ transient: false, id: 'models', multiple: true })
export class SubscriptionsModelDefine {
  constructor (private readonly sequelize: Sequelize) {
    MessageFlowModel.init({
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      templateName: {
        field: "template_name",
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.NUMBER,
      }
    }, {
      sequelize: this.sequelize,
      modelName: 'message_flow',
      tableName: 'messages_flow',
      timestamps: false
    });
    Container.set(MessageFlowModelToken, MessageFlowModel);
  }
}