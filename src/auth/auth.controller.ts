import { Body, Controller, Logger, Post, ValidationPipe } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CredentialsDto } from "./dto/credentials.dto"
import { JwtPayload } from "./jwt-payload.interface"

@Controller("auth")
export class AuthController {
  private logger = new Logger("AuthController")
  constructor(private authService: AuthService) {}

  @Post("/signup")
  createUser(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<JwtPayload> {
    this.logger.verbose(`/signup${JSON.stringify({ ...credentialsDto, password: "xxxxxx" })}`)
    return this.authService.createUser(credentialsDto)
  }

  @Post("/signin")
  signIn(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    this.logger.verbose(`/signin ${JSON.stringify({ ...credentialsDto, password: "xxxxxx" })}`)
    return this.authService.signIn(credentialsDto)
  }
}
