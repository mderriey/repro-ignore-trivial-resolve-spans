# Repro for `ignoreTrivialResolveSpans`

This repository is a minimal reproducible example of a case where the GraphQL instrumentation's `ignoreTrivialResolveSpans` configuration property appears to be not respected.

The example is set up as an Express.js web application using Apollo Server.

> [!NOTE]
> The problem was found to lie in Apollo Server which wraps fields resolvers when it finds a plugin that defines the `willResolveField` hook.
> Apollo's internal cache control plugin does this.
> Disabling this plugin fixed the problem, and no resolve spans for `me.name` were emitted anymore.
>
> See <https://github.com/open-telemetry/opentelemetry-js-contrib/issues/2514#issuecomment-2466109964>.

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

   ```console
   {
     resource: {
     instrumentationScope: {
       name: '@opentelemetry/instrumentation-graphql',
       version: '0.44.0',
       schemaUrl: undefined
     },
     traceId: '141e775d40e7a5b4f0d9d1484da835fb',
     parentId: '817fca783974fbeb',
     traceState: undefined,
     name: 'graphql.resolve me.name',
     id: 'fd4c468acb830e1f',
     kind: 0,
     timestamp: 1730669920179000,
     duration: 133.9,
     attributes: {
       'graphql.field.name': 'name',
       'graphql.field.path': 'me.name',
       'graphql.field.type': 'String!',
       'graphql.source': 'name'
     },
     status: { code: 0 },
     events: [],
     links: []
   }
   ```
