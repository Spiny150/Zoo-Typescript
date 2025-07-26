import { Controller, Get, Post, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { EnclosService } from './enclos.service';
import { CreateEnclosDto } from './dto/create-enclos.dto';
import { EnclosDto } from './dto/enclos.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('enclos')
export class EnclosController {
  constructor(private readonly enclosService: EnclosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  @ApiOperation({ summary: 'Create a new enclosure' })
  @ApiResponse({ status: 201, description: 'The enclosure has been successfully created.', type: EnclosDto })
  create(@Body() createEnclosDto: CreateEnclosDto): Promise<EnclosDto> {
    return this.enclosService.create(createEnclosDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enclosures' })
  @ApiResponse({ status: 200, description: 'Return all enclosures.', type: [EnclosDto] })
  findAll(): Promise<EnclosDto[]> {
    return this.enclosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get enclosure by ID' })
  @ApiResponse({ status: 200, description: 'Return the enclosure by ID.', type: EnclosDto })
  @ApiResponse({ status: 404, description: 'Enclosure not found.' })
  findOne(@Param('id') id: number): Promise<EnclosDto | undefined> {
    return this.enclosService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gardien')
  @ApiOperation({ summary: 'Delete an enclosure by ID' })
  @ApiResponse({ status: 200, description: 'The enclosure has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Enclosure not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.enclosService.remove(+id);
  }
}
