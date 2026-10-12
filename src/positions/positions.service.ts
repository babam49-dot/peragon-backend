import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const positionData = {
      ...createPositionDto,
      parentId: createPositionDto.parentId ? createPositionDto.parentId : null,
    };
    const position = this.positionRepository.create(positionData);
    return await this.positionRepository.save(position);
  }

  async findAll(): Promise<Position[]> {
    return await this.positionRepository.find({
      relations: ['parent', 'children'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Position> {
    const position = await this.positionRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return position;
  }

  async update(id: string, updatePositionDto: UpdatePositionDto): Promise<Position> {
    const position = await this.findOne(id);
    const updateData = {
      ...updatePositionDto,
      ...(updatePositionDto.parentId !== undefined && {
        parentId: updatePositionDto.parentId ? updatePositionDto.parentId : null,
      }),
    };
    Object.assign(position, updateData);
    return await this.positionRepository.save(position);
  }

  async remove(id: string): Promise<Position> {
    const position = await this.findOne(id);
    return await this.positionRepository.remove(position);
  }
}
