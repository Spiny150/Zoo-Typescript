import { Controller, Get, Post, Param, Body, Query, UseGuards, Delete } from '@nestjs/common';
import { AnimauxService } from './animaux.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnimalDto } from './dto/animal.dto';

@Controller('animaux')
export class AnimauxController {
  constructor(private readonly service: AnimauxService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  async create(@Body() dto: CreateAnimalDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'List all animals' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of all animals',
    type: [AnimalDto],
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get animal by ID (accessible by any authenticated user)' })
  @ApiResponse({ status: 200, description: 'Returns the animal by ID', type: AnimalDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt')) // Accessible by any authenticated user
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('search/name')
  findByName(@Query('name') name: string) {
    return this.service.findByName(name);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  deleteWithId(@Param('id') id: number) {
    return this.service.deleteWithId(id);
  }

  @ApiOperation({ summary: 'Heal animal by ID (accessible only by veterinarians)' })
  @ApiResponse({ status: 200, description: 'Animal health restored to 100', type: AnimalDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires veterinarian role' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('veterinaire') // Accessible only by veterinarians
  @Get('soigner/:id')
  soignerAnimal(@Param('id') id: number) {
    return this.service.soignerAnimal(id);
  }
}
