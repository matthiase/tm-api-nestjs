import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CredentialsDto } from './dto/credentials.dto'
import { JwtPayload } from './jwt-payload.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<JwtPayload> {
    return this.authService.createUser(credentialsDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentialsDto)
  }
}
