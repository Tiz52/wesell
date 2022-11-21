import { SuscriptionTypeORM } from '../../infrastructure/entities/suscribe.typeorm';
import { Suscription } from '../../domain/entities/suscription.entity';
import { SuscriptionNumberTypeORM } from '../../infrastructure/value-objects/suscribe-number.typeorm';
import { SuscriberIdTypeORM } from '../../infrastructure/value-objects/suscriber-id.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/value-objects/audit-trail.typeorm';
import { TypeSuscriptionTypeORM } from 'src/subscription/infrastructure/value-objects/type-suscription.typeorm';

export class SuscriptionMapper {
  public static toTypeORM(Suscription: Suscription): SuscriptionTypeORM {
    const suscriptionTypeORM: SuscriptionTypeORM = new SuscriptionTypeORM();
    suscriptionTypeORM.id =
      Suscription.getId() != null ? Suscription.getId().getValue() : 0;
    suscriptionTypeORM.number =
      Suscription.getNumber() != null
        ? SuscriptionNumberTypeORM.from(Suscription.getNumber().getValue())
        : null;
    suscriptionTypeORM.clientId =
      Suscription.getClientId() != null
        ? SuscriberIdTypeORM.from(Suscription.getClientId().getValue())
        : null;
    suscriptionTypeORM.typo =
      Suscription.getTypeSuscription() != null
        ? TypeSuscriptionTypeORM.from(
            Suscription.getTypeSuscription().getValue(),
          )
        : null;
    suscriptionTypeORM.auditTrail =
      Suscription.getAuditTrail() != null
        ? AuditTrailTypeORM.from(
            Suscription.getAuditTrail().getCreatedAt().format(),
            Suscription.getAuditTrail().getCreatedBy().getValue(),
            Suscription.getAuditTrail().getUpdatedAt().format(),
            Suscription.getAuditTrail().getUpdatedBy().getValue(),
          )
        : null;
    return suscriptionTypeORM;
  }
}
