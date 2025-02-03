import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_INFOS } from './database';
import entities from './typeorm/entities';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
      max: 100,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: DB_INFOS.type,
      host: DB_INFOS.host,
      database: DB_INFOS.database,
      port: DB_INFOS.port,
      username: DB_INFOS.username,
      password: DB_INFOS.password,
      entities,
      synchronize: true
    }), StudentModule, TeacherModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
