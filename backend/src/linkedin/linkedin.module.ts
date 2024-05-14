import { Module } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { LinkedinController } from './linkedin.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [LinkedinService],
  controllers: [LinkedinController],
})
export class LinkedinModule {}
