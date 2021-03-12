import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: config.get('database.type'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.user'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  autoLoadEntities: true,
  synchronize: config.get('database.synchronize') || false
}
