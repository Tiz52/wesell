import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'wesell',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        process.env.ENVIRONMENT == 'prod'
          ? '**/infrastructure/entities/*{.ts,.js}'
          : 'dist/**/infrastructure/entities/*{.ts,.js}',
      ],
      subscribers: [],
      migrations: [
        process.env.ENVIRONMENT == 'prod'
          ? 'common/infrastructure/migrations/*{.ts,.js}'
          : 'dist/common/infrastructure/migrations/*{.ts,.js}',
      ],
      migrationsTableName: 'migrations',
    }),
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
