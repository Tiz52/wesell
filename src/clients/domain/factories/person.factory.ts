import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../value-objects/dni.value';
import { Person } from '../entities/person.entity';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';
import { Email } from '../value-objects/email.value';

export class PersonFactory {
  public static createFrom(
    name: PersonName,
    dni: Dni,
    email: Email,
    auditTrail: AuditTrail,
  ): Person {
    return new Person(name, dni, email, auditTrail);
  }
}
