import express from "express";
import { graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import bodyParser from "body-parser";
import cors from "cors";

const server = ({ schema: { types: typeDefs, resolvers }, context = req => ({}), port = 3002, endpoint = "/graphql" }) => {
  const app = express();

  app.use(cors({ origin: (_origin, cb) => cb(null, true), credentials: true }));
  app.use(
    endpoint,
    bodyParser.json(),
    graphqlExpress(req => ({ schema: makeExecutableSchema({ typeDefs, resolvers }), context: context(req) })),
  );

  const server = app.listen(port, () => console.log(`Running on http://localhost:${server.address().port}${endpoint}`));
};

export default server;
