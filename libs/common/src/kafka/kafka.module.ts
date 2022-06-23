import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface KafkaModuleOptions {
  name: string;
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class KafkaClientsModule {
  static register({ name }: KafkaModuleOptions): DynamicModule {
    return {
      module: KafkaClientsModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: configService.get<string>('CLIENT_ID'),
                  brokers: [configService.get<string>('BROKERS')],
                },
                consumer: {
                  groupId: configService.get<string>('GROUP_ID'),
                },
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
