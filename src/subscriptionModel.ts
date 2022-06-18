import { Sequelize, Model,DataTypes, ModelAttributes } from 'sequelize';
import { MessageFlowModel } from './messageFlowModel';
import { MessageModel } from './messageModel';

export interface ISubscriptionModel {
    id: number
    subscriptionDate?: Date
    name?: string
    lastMessage?: number
    active: boolean
    messageFlowId?: number 
    email?: string
}

export class SubscriptionModel extends Model { }

export const subscriptionModelAtributes: ModelAttributes<SubscriptionModel> = {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    subscriptionDate: {
        type: DataTypes.DATE,
        field: 'subscription_date',
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastMessage: {
        type: DataTypes.INTEGER,
        field: 'last_message',
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    messageFlowId: {
        type: DataTypes.NUMBER,
        field: 'message_flow_id',
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: {
                msg: "Por favor digite um email válido!"
            }
        },
        unique: true
    }
}

export function subscriptionModelInit(sequelize: Sequelize): typeof SubscriptionModel {
    return SubscriptionModel.init(subscriptionModelAtributes, { 
        sequelize, tableName: "subscriptions", timestamps: false,
        indexes: [{
            name: 'fk_subscription_message_flow_idx',
            fields: ['message_flow_id']
        }, {
            name: 'fk_last_message_idx',
            fields: ['last_message']
        }]
    });
}

export function initSubscriptionsRelations() {
    SubscriptionModel.belongsTo(MessageFlowModel, {
        foreignKey: 'message_flow_id',
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
    });
    SubscriptionModel.hasOne(MessageModel, {
        foreignKey: 'last_message',
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
    });
}