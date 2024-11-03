import express, {json} from 'express'
import * as http from "node:http";
import {ApolloServer, BaseContext} from "@apollo/server";
import {loadFilesSync} from "@graphql-tools/load-files";
import * as path from "node:path";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {expressMiddleware} from "@apollo/server/express4";

async function run() {
  const app = express()

  const port = 8181
  const server = http.createServer(app)
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })

  const apollo = new ApolloServer({
    schema: getSchema(),
    introspection: true,
  })
  await apollo.start()

  app.use('/graphql', json(), expressMiddleware(apollo))
}

function getSchema() {
  const resolvers = loadFilesSync(path.join(__dirname, "./resolvers.{ts,js}"))
  const typeDefs = loadFilesSync(path.join(__dirname, "./schema.graphql"))

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  })
}

run().catch((e) => {
  console.error('Unhandled error', e)
})
