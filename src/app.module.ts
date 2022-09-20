import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { IssueModule } from './issue/issue.module';


@Module({
  imports: [
    // ConfigModule.forRoot({isGlobal: true}),
   
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'manku@511',
      database: 'library',
      autoLoadEntities: true,
      synchronize: true

    }),
    UserModule,
    BookModule,
    AuthModule,
    IssueModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
