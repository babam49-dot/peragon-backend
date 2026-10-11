import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { PhotoEntity } from './entities/photo.entity';
import { PositionsModule } from './positions/positions.module';
import { Position } from './positions/entities/position.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'ep-bold-firefly-b4es658e.c-6.us-east-2.aws.neon.tech',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'neondb_owner',
      password: process.env.DB_PASSWORD || 'npg_uG7abRpBi9ot',
      database: process.env.DB_DATABASE || 'baba',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Position, UserEntity, PhotoEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PositionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    if (dataSource.isInitialized) {
      console.log('✅ Successfully connected to Neon PostgreSQL database!');
    }
  }
}
