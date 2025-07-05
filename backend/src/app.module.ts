import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TwofaModule } from './twofa/twofa.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [AuthModule, TwofaModule, SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
