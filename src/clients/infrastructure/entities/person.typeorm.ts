import { ChildEntity, Column, Unique } from 'typeorm';
import { ClientTypeORM } from './client.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { PersonNameTypeORM } from '../value-objects/person-name.typeorm';
import { ClientType } from '../../domain/enums/client-type.enum';
import { PersonEmailTypeORM } from '../value-objects/person-email.typeorm';

@ChildEntity(ClientType.PERSON)
export class PersonTypeORM extends ClientTypeORM {
  @Column((type) => PersonNameTypeORM, { prefix: false })
  public name: PersonNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;

  @Column((type) => PersonEmailTypeORM, { prefix: false })
  public email: PersonEmailTypeORM;
}
