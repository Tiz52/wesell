import { ClientId } from '../value-objects/client-id.value';
import { Dni } from '../value-objects/dni.value';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Client } from './client.entity';
import { ClientType } from '../enums/client-type.enum';
import { PersonRegistered } from '../events/person-registered.event';

export class Person extends Client {
  private name: PersonName;
  private dni: Dni;

  public constructor(name: PersonName, dni: Dni, auditTrail: AuditTrail) {
    super(ClientType.PERSON, auditTrail);
    this.name = name;
    this.dni = dni;
  }

  public register() {
    const event = new PersonRegistered(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.dni.getValue(),
    );
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): PersonName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeName(name: PersonName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}
