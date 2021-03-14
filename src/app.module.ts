import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TasksModule } from "./tasks/tasks.module"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST", "localhost"),
        port: configService.get<number>("DATABASE_PORT", 5432),
        username: configService.get("DATABASE_USER", "postgres"),
        password: configService.get("DATABASE_PASSWORD", null),
        database: configService.get("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV === "development"
      })
    }),
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}
