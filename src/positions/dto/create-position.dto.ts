import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty({
    description: 'Name/title of the position',
    example: 'CEO',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the role and responsibilities',
    example: 'Chief Executive Officer - Leading overall company strategy',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Parent position UUID (reports to). Leave null or empty for root position.',
    example: null,
    nullable: true,
  })
  parentId?: string | null;
}
