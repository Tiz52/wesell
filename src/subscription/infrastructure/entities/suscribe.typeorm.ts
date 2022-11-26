import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SuscriptionNumberTypeORM } from '../value-objects/suscribe-number.typeorm';
import { SuscriberIdTypeORM } from '../value-objects/suscriber-id.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/value-objects/audit-trail.typeorm';
import { TypeSuscriptionTypeORM } from '../value-objects/type-suscription.typeorm';

@Entity('suscriptions')
export class SuscriptionTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column((type) => SuscriptionNumberTypeORM, { prefix: false })
  public number: SuscriptionNumberTypeORM;

  @Column((type) => SuscriberIdTypeORM, { prefix: false })
  public clientId: SuscriberIdTypeORM;

  @Column((type) => TypeSuscriptionTypeORM, { prefix: false })
  public typo: TypeSuscriptionTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
