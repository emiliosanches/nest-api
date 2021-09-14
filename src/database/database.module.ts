import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export function DatabaseConnectionFactory() {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): PostgresConnectionOptions => ({
      type: configService.get('DATABASE_DRIVER'),
      host: configService.get('DATABASE_HOST'),
      port: Number(configService.get('DATABASE_PORT')),
      username: configService.get('DATABASE_USER'),
      database: configService.get<string>('DATABASE_NAME'),
      password: configService.get<string>('DATABASE_PASS'),
      entities: [__dirname + '/../**/*.entity.{ts,js}']
    }),
    inject: [ConfigService]
  })
}
