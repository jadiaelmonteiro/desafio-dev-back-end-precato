import { Sequelize, Model, ModelAttributes, DataTypes } from 'sequelize';
import { MessageFlowModel } from './messageFlowModel';

export interface IMessageModel {
    id: number
    subject?: string
    createdAt: Date
    messageFlowId?: number
}

export class MessageModel extends Model {

}

const messageModelAttributes: ModelAttributes<MessageModel> = {
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
}

export function messageModelInit(sequelize: Sequelize): typeof MessageModel {
    return MessageModel.init(messageModelAttributes, {
        sequelize, tableName: "messages", createdAt: true, updatedAt: false,
        indexes: [{
            name: 'fk_message_flow_id_idx',
            fields: ['message_flow_id']
        }]
    });
}

export function initMessageRelations() {
    MessageModel.belongsTo(MessageFlowModel, {
        foreignKey: 'message_flow_id',
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
    });
}
