import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Controller,
  Get,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LevelAssessmentModule } from './level-assessment/level-assessment.module';
import { LearnModule } from './learn/learn.module';
import { LoggerMiddleware } from './middleware';
import { QuizModule } from './quiz/quiz.module';
import { LevelUpTestModule } from './level-up-test/level-up-test.module';
import { ProfileModule } from './profile/profile.module';
import { DevModule } from './dev/dev.module';
import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('db')
  checkDatabaseConnection() {
    const isConnected = this.connection.readyState === 1;
    return {
      database: {
        status: isConnected ? 'connected' : 'disconnected',
        readyState: this.connection.readyState,
        host: this.connection.host,
        port: this.connection.port,
        name: this.connection.name,
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  checkHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'WordSage API',
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('✅ Database connected successfully');
          console.log(
            `📍 Connected to: ${connection.host}:${connection.port}/${connection.name}`,
          );
        });

        connection.on('disconnected', () => {
          console.log('❌ Database disconnected');
        });

        connection.on('error', (error) => {
          console.error('❌ Database connection error:', error.message);
        });

        connection.on('reconnected', () => {
          console.log('🔄 Database reconnected');
        });

        return connection;
      },
    }),
    AuthModule,
    LevelAssessmentModule,
    LearnModule,
    QuizModule,
    LevelUpTestModule,
    ProfileModule,
    DevModule,
  ],
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware, DelayMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
