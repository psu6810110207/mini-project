import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get('movie/:movieId')
  findAllByMovie(@Param('movieId') movieId: number) {
    return this.seatsService.findByMovie(movieId);
  }
}