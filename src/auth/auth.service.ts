import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { CredentialsDto } from './dto/credentials.dto'
import { JwtPayload } from './jwt-payload.interface'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async createUser(credentialsDto: CredentialsDto): Promise<void> {
    return this.userRepository.createUser(credentialsDto)
  }

  async signIn(
    credentialsDto: CredentialsDto
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateCredentials(
      credentialsDto
    )
    if (username) {
      const jwtPayload: JwtPayload = { username: username }
      const accessToken = this.jwtService.sign(jwtPayload)
      return { accessToken }
    }
    throw new UnauthorizedException('Invalid credentials')
  }
}
