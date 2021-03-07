import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CredentialsDto } from './dto/credentials.dto'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(credentialsDto: CredentialsDto): Promise<void> {
    const { username, password } = credentialsDto
    const salt = await bcrypt.genSalt()
    const user = new User()
    user.username = username
    user.password = await bcrypt.hash(password, salt)

    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async validateCredentials(credentialsDto: CredentialsDto): Promise<string> {
    const { username, password } = credentialsDto
    const user = await this.findOne({ username: username })
    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username
    }
    return null
  }
}
