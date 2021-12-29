import { ExpressContext } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';

export interface Context {
  req: any;
  pubsub: PubSub;
}
