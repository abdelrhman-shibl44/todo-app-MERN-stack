import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LinkedinModule } from './linkedin/linkedin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TodoModule,
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    LinkedinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
