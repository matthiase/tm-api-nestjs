import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CredentialsDto } from './dto/credentials.dto'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(credentialsDto: CredentialsDto): Promise<void> {
    const { username, password } = credentialsDto
    const user = new User()
    user.username = username
    user.salt = bcrypt.genSalt()
    user.password = await bcrypt.hash(password, user.salt)

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
}
