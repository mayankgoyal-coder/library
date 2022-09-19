import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from './model/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { hasRoles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }


@hasRoles('Admin')
@UseGuards(JwtAuthGuard,RolesGuard)
 @Get()
 findAll():Observable<User[]>{
    return this .userService.findAll();
 }

 @Delete(':id')
 deleteOne(@Param('id')id:string):Observable<User>{
    return this.userService.deleteOne(id)
 }


 @Put(':id')
 updateOne(@Param('id')id:string,@Body()user:User):Observable<any>{
    return this.userService.updateOne(id,user)
 }
    
}
