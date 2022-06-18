import { Service, Container } from 'typedi';
import { Sequelize, DataTypes } from 'sequelize';
import { SubscriptionModel, SubscriptionModelToken } from '../../../../1-domain/model/subscriptions';

@Service({ transient: false, id: 'models', multiple: true })
export class SubscriptionsModelDefine {
  constructor (private readonly sequelize: Sequelize) {
    SubscriptionModel.init({
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
    }, {
      sequelize: this.sequelize,
      modelName: 'subscription',
      tableName: 'subscriptions',
      timestamps: false,
      indexes: [{
        name: 'fk_subscription_message_flow_idx',
        fields: ['message_flow_id']
      }, {
        name: 'fk_last_message_idx',
        fields: ['last_message']
      }]
    });
    Container.set(SubscriptionModelToken, SubscriptionModel);
  }
}