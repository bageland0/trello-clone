import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { UsersModule } from 'src/users/users.module';
import { ColumnRepository } from './column.repository';
import { DataSource } from 'typeorm';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService,
    {
      provide: ColumnRepository,
      useFactory: (dataSource: DataSource) => ColumnRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [ColumnsService],
  imports: [TypeOrmModule.forFeature([Column]), UsersModule],
})
export class ColumnsModule {}
