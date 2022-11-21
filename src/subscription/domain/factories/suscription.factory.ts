import { ClientId } from '../../../clients/domain/value-objects/client-id.value';
import { Suscription } from '../entities/suscription.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { SuscriptionNumber } from '../value-objects/suscription-number.value';
import { SuscriptionId } from '../value-objects/suscription-id.value';
import { TypeSuscription } from '../value-objects/type-suscription.value';

export class SuscriptionFactory {
  public static createFrom(
    number: SuscriptionNumber,
    clientId: ClientId,
    type: TypeSuscription,
    auditTrail: AuditTrail,
  ): Suscription {
    return new Suscription(number, clientId, type, auditTrail);
  }

  public static withId(
    accountId: SuscriptionId,
    number: SuscriptionNumber,
    clientId: ClientId,
    type: TypeSuscription,
    auditTrail: AuditTrail,
  ): Suscription {
    const account: Suscription = new Suscription(
      number,
      clientId,
      type,
      auditTrail,
    );
    account.changeId(accountId);
    return account;
  }
}
