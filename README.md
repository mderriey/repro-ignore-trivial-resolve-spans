# Repro for `ignoreTrivialResolveSpans`

This repository is a minimal reproducible example of a case where the GraphQL instrumentation's `ignoreTrivialResolveSpans` configuration property appears to be not respected.

The example is set up as an Express.js web application using Apollo Server.

## Steps

1. Install npm packages: `npm install`.
2. Start the application: `npm start`.
3. Execute the following GraphQL operation to <http://localhost:8181/graphql>:

   ```graphql
   query Me {
     me {
       name
     }
   }
   ```
   
   ```bash
   curl --location 'http://localhost:8181/graphql' \
     --header 'Content-Type: application/json' \
     --data '{"query":"query me { me { name } }","variables":{}}'
   ```
   
4. Observe in the console a span named `graphql.resolve me.name`.
