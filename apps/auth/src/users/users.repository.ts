import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
    @InjectPinoLogger(UsersRepository.name)
    protected readonly logger: PinoLogger,
  ) {
    super(userModel, connection, logger);
  }
}
