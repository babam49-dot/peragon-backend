import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new position' })
  @ApiResponse({ status: 201, description: 'Position created successfully' })
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all positions with parent and children hierarchy' })
  @ApiResponse({ status: 200, description: 'List of all positions' })
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single position by UUID' })
  @ApiParam({ name: 'id', description: 'Position UUID' })
  @ApiResponse({ status: 200, description: 'Position found' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing position by UUID' })
  @ApiParam({ name: 'id', description: 'Position UUID' })
  @ApiResponse({ status: 200, description: 'Position updated successfully' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a position by UUID' })
  @ApiParam({ name: 'id', description: 'Position UUID' })
  @ApiResponse({ status: 200, description: 'Position deleted successfully' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }
}
