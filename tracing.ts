import {NodeSDK} from "@opentelemetry/sdk-node";
import {ConsoleSpanExporter, SimpleSpanProcessor} from "@opentelemetry/sdk-trace-base";
import {GraphQLInstrumentation} from "@opentelemetry/instrumentation-graphql";

const sdk = new NodeSDK({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  instrumentations: [
    new GraphQLInstrumentation({
      ignoreTrivialResolveSpans: true,
    })
  ]
})

sdk.start()
