import { ClientId } from '../../../clients/domain/value-objects/client-id.value';
import { AggregateRoot } from '@nestjs/cqrs';
import { SuscriptionId } from '../value-objects/suscription-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { SuscriptionNumber } from '../value-objects/suscription-number.value';
import { SuscriptionOpened } from '../events/suscription-opened.event';
import { TypeSuscription } from '../value-objects/type-suscription.value';

export class Suscription extends AggregateRoot {
  private id: SuscriptionId;
  private readonly number: SuscriptionNumber;
  private readonly clientId: ClientId;
  private readonly typo: TypeSuscription;
  private readonly auditTrail: AuditTrail;

  public constructor(
    number: SuscriptionNumber,
    clientId: ClientId,
    typo: TypeSuscription,
    auditTrail: AuditTrail,
  ) {
    super();
    this.number = number;
    this.clientId = clientId;
    this.typo = typo;
    this.auditTrail = auditTrail;
  }

  public open() {
    const event = new SuscriptionOpened(
      this.id.getValue(),
      this.number.getValue(),
      this.clientId.getValue(),
      this.typo.getValue(),
    );
    this.apply(event);
  }

  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }

  public doesNotExist(): boolean {
    return !this.exist();
  }

  public hasIdentity(): boolean {
    return this.number.getValue().trim().length > 0;
  }

  public getId(): SuscriptionId {
    return this.id;
  }

  public getNumber(): SuscriptionNumber {
    return this.number;
  }

  public getClientId(): ClientId {
    return this.clientId;
  }

  public getTypeSuscription(): TypeSuscription {
    return this.typo;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: SuscriptionId) {
    this.id = id;
  }
}
