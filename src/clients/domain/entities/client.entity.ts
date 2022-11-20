import { AggregateRoot } from '@nestjs/cqrs';
import { ClientId } from '../value-objects/client-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { ClientType } from '../enums/client-type.enum';

export class Client extends AggregateRoot {
  protected id: ClientId;
  protected type: ClientType;
  protected readonly auditTrail: AuditTrail;

  public constructor(type: ClientType, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }

  public getId(): ClientId {
    return this.id;
  }

  public getType(): ClientType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: ClientId) {
    this.id = id;
  }
}
