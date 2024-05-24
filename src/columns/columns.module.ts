import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { UsersModule } from 'src/users/users.module';
import { OwnershipInterceptor } from 'src/auth/ownership.interceptor';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
  imports: [TypeOrmModule.forFeature([Column]), UsersModule],
})
export class ColumnsModule {}
