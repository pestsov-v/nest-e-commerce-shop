import { Module } from '@nestjs/common';
import { SessionService } from './session.service';

@Module({
  controllers: [],
  providers: [SessionService],
})
export class SessionModule {}
