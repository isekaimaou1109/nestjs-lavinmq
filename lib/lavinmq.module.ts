import {
  DynamicModule,
  Module,
  Provider
} from "@nestjs/common";
import {
  LavinMQConfig,
  LavinMQAsyncConfig
} from "./lavinmq.interface";
import { AMQPClient } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";
import { LAVINMQ_CONNECTION } from "./lavinmq.constant";

@Module({})
export class LavinMQMessageBreakerModule {
  static forRoot(options: LavinMQConfig): DynamicModule {
    return {
      module: LavinMQMessageBreakerModule,
      providers: [
        {
          provide: LAVINMQ_CONNECTION,
          useFactory: async () => {
            try {
              const connection: AMQPClient = new AMQPClient(
                options.url
              );
              const client: AMQPBaseClient =
                await connection.connect();
              return !client.closed ? connection : {};
            } catch (error) {
              return {};
            }
          }
        }
      ]
    };
  }

  static forRootAsync(
    options: LavinMQAsyncConfig
  ): DynamicModule {
    const provider: Provider<AMQPClient | object> = {
      provide: LAVINMQ_CONNECTION,
      ...(options.useFactory
        ? {
            useFactory: async (...args: Array<any>) => {
              try {
                const config: LavinMQConfig =
                  await options.useFactory(...args);
                const connection: AMQPClient =
                  new AMQPClient(config.url);
                const client: AMQPBaseClient =
                  await connection.connect();
                return !client.closed ? connection : {};
              } catch (error) {
                return {};
              }
            }
          }
        : {})
    } as Provider;

    return {
      module: LavinMQMessageBreakerModule,
      providers: [provider]
    };
  }
}
