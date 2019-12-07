import DomainMapper from '../Domain';
import { UserEntity } from '../../persistence/UserEntity';
import User from '../User';

export class UserMapper implements DomainMapper<User, UserEntity> {
  fromEntity(userEntity: UserEntity): User {
    const user: User = new User();
    user.id = userEntity.id;
    user.firstName = userEntity.firstName;
    user.firstSurname = userEntity.firstSurname;
    user.secondSurname = userEntity.secondSurname;
    user.email = userEntity.email;

    return user;
  }

  toEntity(domain: User): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.id = domain.id;
    userEntity.firstName = domain.firstName;
    userEntity.firstSurname = domain.firstSurname;
    userEntity.secondSurname = domain.secondSurname;
    userEntity.email = domain.email;

    return userEntity;
  }

  fromRequest(request: any): User {
    const user: User = new User();
    user.id = request.id;
    user.firstName = request.firstName;
    user.firstSurname = request.firstSurname;
    user.secondSurname = request.secondSurname;
    user.email = request.email;

    return user;
  }

  toResponse(domain: User): object {
    return {
      id: domain.id,
      firstName: domain.firstName,
      firstSurname: domain.firstSurname,
      secondSurname: domain.secondSurname,
      email: domain.email,
    };
  }
}
