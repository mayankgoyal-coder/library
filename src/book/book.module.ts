import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookEntity} from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[(TypeOrmModule.forFeature([BookEntity])),
AuthModule,
 forwardRef(() => UserModule),
],
  controllers: [BookController],
  providers: [BookService],
  exports:[BookService]
})
export class BookModule {}
