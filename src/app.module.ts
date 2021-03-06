import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { config } from './configs/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './core/guard/roles.guard';
import { SessionModule } from './modules/session/session.module';
import { FilesModule } from './modules/files/files.module';
import { OrderModule } from './modules/order/order.module';
import { LinkModule } from './modules/link/link.module';
import { ItemModule } from './modules/item/item.module';
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    ProductModule,
    UserModule,
    AuthModule,
    SessionModule,
    FilesModule,
    OrderModule,
    LinkModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesGuard,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class AppModule {}
