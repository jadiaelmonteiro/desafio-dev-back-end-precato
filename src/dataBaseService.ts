import { Sequelize } from 'sequelize';
import { ISubscriptionModel, SubscriptionModel, subscriptionModelInit, initSubscriptionsRelations } from './subscriptionModel';
import { IMessageFlowModel, MessageFlowModel, messageFlowModelInit } from './messageFlowModel';
import { IMessageModel, MessageModel, messageModelInit, initMessageRelations } from './messageModel'

export class DataBaseService {
    private sequelize: Sequelize;
    private subscriptionModel: typeof SubscriptionModel;
    private messageFlowModel: typeof MessageFlowModel;
    private messageModel: typeof MessageModel;
    constructor() {
        this.sequelize = new Sequelize({
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            database: 'precato',
            password: '123456',
            username: 'root'
        })

        this.subscriptionModel = subscriptionModelInit(this.sequelize);
        this.messageFlowModel =  messageFlowModelInit(this.sequelize);
        this.messageModel = messageModelInit(this.sequelize);
        this.initRelations()
    };

    private initRelations() {
        initSubscriptionsRelations();
        initMessageRelations();
    }

    public async createSubscription(subscription: Omit<ISubscriptionModel, 'id' | 'active'>) {
        const newModel = await this.subscriptionModel.create({
            ...subscription
        });
        return await newModel.save();
    }

    public async createMessageFlow(messageFlow: Omit<IMessageFlowModel, 'id'>) {
        const newModel = await this.messageFlowModel.create({
            ...messageFlow
        });
        return await newModel.save()
    }

    public async createMessage(message: Omit<IMessageModel, 'id' | 'createdAt'>){
        const newModel = await this.messageModel.create({
            ...message
        });
        return await newModel.save()
    }


    public async closeConnection() {
        await this.sequelize.close();
    }
}
