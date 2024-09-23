### The wrapper for LavinMQ in Nestjs
### This support for both sync/async module
### Usage:
```typescript
import { LavinMQMessageBreakerModule } from 'nestjs-lavinmq'

@Module({
  imports: [
    ConfigModule.forRoot({
      ...
    }),
    LavinMQMessageBreakerModule.forRootAsync({
      inject: [ConfigService]
      useFactory: (configService: ConfigService) => {
        return {
          url: configService.get("LAVINMQ_URL")
        }
      }
    })
  ]
})
export class AppModule {}
```