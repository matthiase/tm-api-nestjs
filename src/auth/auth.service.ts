import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { CredentialsDto } from './dto/credentials.dto'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async createUser(credentialsDto: CredentialsDto): Promise<JwtPayload> {
    const user = await this.userRepository.createUser(credentialsDto)
    const jwtPayload: JwtPayload = {
      id: user.id,
      username: user.username
    }
    return jwtPayload
  }

  async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    const user: User = await this.userRepository.validateCredentials(credentialsDto)
    if (user) {
      const jwtPayload: JwtPayload = { id: user.id, username: user.username }
      const accessToken = this.jwtService.sign(jwtPayload)
      return { accessToken }
    }
    throw new UnauthorizedException('Invalid credentials')
  }
}
