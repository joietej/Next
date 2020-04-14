import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { importSchema } from "graphql-import";
import resolvers from "./resolvers";
import * as PostService from "../services/post";

const typeDefs = importSchema("src/graphql/schema.gql");
const schema = makeExecutableSchema({ typeDefs, resolvers });
const context = {
  service: PostService,
};

const server = new ApolloServer({ schema, context });

export default server;
