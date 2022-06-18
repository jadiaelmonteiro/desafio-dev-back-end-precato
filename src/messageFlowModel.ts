import { Sequelize, Model, ModelAttributes, DataTypes } from 'sequelize';
import { subscriptionModelInit } from './subscriptionModel';


export interface IMessageFlowModel {
  id: number
  templateName: string
  position: number
}

export class MessageFlowModel extends Model {

}

const messageFlowModelAttributes: ModelAttributes<MessageFlowModel> = {
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
}

export function messageFlowModelInit(sequelize: Sequelize): typeof MessageFlowModel {
  return MessageFlowModel.init(messageFlowModelAttributes, {
    sequelize, tableName: "message_flow", timestamps: false
  });
}