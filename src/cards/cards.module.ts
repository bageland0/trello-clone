import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { UsersModule } from 'src/users/users.module';
import { CardRepository } from './card.repository';
import { DataSource } from 'typeorm';
@Module({
  controllers: [CardsController],
  providers: [
    CardsService,
    {
      provide: CardRepository,
      useFactory: (dataSource: DataSource) => CardRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [CardsService],
  imports: [TypeOrmModule.forFeature([Card]), UsersModule],
})
export class CardsModule {}
