import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log(`DatabaseModule`);
        console.log(__dirname);
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<string>('DB_PORT') ? parseInt(configService.get<string>('DB_PORT')) : 3306,
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          logging: configService.get<string>('TYPEORM_LOGGING') === 'true',
          synchronize: configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
          migrationsRun: configService.get<string>('TYPEORM_MIGRATIONSRUN') === 'true',
          migrationsTableName: 'history',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/../migrations/*{.ts,.js}'],
          seeds: [__dirname + '/../seeds/**/*{.ts,.js}'],
          factories: [__dirname + '/../factories/**/*{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
