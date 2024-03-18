import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express'
import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ProductResolver } from './product/product.resolver';
import { Container } from 'typedi';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './product/product.service';
import { Product } from './product/product.entity';
import datasource from './db/config/database-ormconfig';
import { DeliveryService } from './delivery/delivery.service';
import { DeliveryItemService } from './delivery_item/delivery_item.service';
import { DeliveryResolver } from './delivery/delivery.resolver';
import { DeliveryItemResolver } from './delivery_item/delivery_item.resolver';
import { DeliveryRepository } from './repository/delivery.repository';
import { Delivery } from './delivery/delivery.entity';
import { DeliveryItemRepository } from './repository/delivery_item.repository';
import { DeliveryItem } from './delivery_item/delivery_item.entity';

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

Container.set([
  {id: 'product-repository', value: new ProductRepository(datasource.getRepository(Product))},
  {id: 'delivery-repository', value: new DeliveryRepository(datasource.getRepository(Delivery))},
  {id: 'delivery_item-repository', value: new DeliveryItemRepository(datasource.getRepository(DeliveryItem))}
])

Container.set([
  {id: 'product-service', value: new ProductService(Container.get('product-repository')) },
  {id: 'delivery_item-service', value: new DeliveryItemService(Container.get('delivery_item-repository'), Container.get('product-service')) },
  {id: 'delivery-service', value: new DeliveryService(Container.get('delivery-repository'), Container.get('delivery_item-service')) }
]);
Container.set([
  {id: 'product-resolver', value: new ProductResolver(Container.get('product-service')) },
  {id: 'delivery-resolver', value: new DeliveryResolver(Container.get('delivery-service')) },
  {id: 'delivery_item-resolver', value: new DeliveryItemResolver(Container.get('delivery_item-service')) }
]);

const createServer = async () => {

  await datasource.initialize().then(()=> {
    console.log(`🚀 Data Source has been initialized`)
  }).catch(()=> {
    console.error(' ❌ Error during Data Source initialization')
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, DeliveryResolver, DeliveryItemResolver],
      validate: false,
      container: Container
    })
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({app, path:'/graphql'})

  app.get("/", (req, res) => {
    res.send("Hello CookUnity!");
  });

  app.listen(port, () => {
    console.log(`🚀 Express ready at http://localhost:${port}`);
    console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
  });

  return app;
}

export { createServer };
