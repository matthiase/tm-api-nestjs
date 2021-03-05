import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'meder',
  database: 'taskmanagement',
  autoLoadEntities: true,
  synchronize: true
}
