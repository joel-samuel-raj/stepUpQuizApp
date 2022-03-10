import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleModule } from './google/google.module';
import { LocalModule } from './local/local.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [GoogleModule, LocalModule]
})
export class AuthModule {}
