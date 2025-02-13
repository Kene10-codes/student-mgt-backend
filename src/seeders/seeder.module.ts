import { Module } from '@nestjs/common';
import { SeederService } from './service/seeders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../models/Teacher';

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    providers: [SeederService],
    controllers: []
})
export class SeederModule {
    constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    // Call the run method on service to populate data
    await this.seederService.signup()
  }
}
