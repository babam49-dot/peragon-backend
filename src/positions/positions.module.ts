import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { Position } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionsController],
  providers: [PositionsService],
  exports: [PositionsService, TypeOrmModule],
})
export class PositionsModule {}
