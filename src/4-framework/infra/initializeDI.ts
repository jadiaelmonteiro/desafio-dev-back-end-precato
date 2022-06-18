import { Sequelize } from 'sequelize';
import { Container } from 'typedi';
import { associateModel } from '../../1-domain/model/associations';

export default async () => {
  Container.set(Sequelize, new Sequelize({
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    database: 'precato',
    password: '123456',
    username: 'root'
  }));
  Container.getMany('models');
  associateModel();
}