import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CredentialsDto } from './dto/credentials.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async createUser(credentialsDto: CredentialsDto): Promise<void> {
    return this.userRepository.createUser(credentialsDto)
  }

  async signIn(credentialsDto: CredentialsDto): Promise<string> {
    const username = await this.userRepository.validateCredentials(
      credentialsDto
    )
    if (username) {
      return username
    }
    throw new UnauthorizedException('Invalid credentials')
  }
}
