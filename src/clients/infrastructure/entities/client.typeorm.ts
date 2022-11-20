import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  Unique,
} from 'typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/value-objects/audit-trail.typeorm';
import { ClientType } from '../../domain/enums/client-type.enum';

@Entity('clients')
@TableInheritance({ column: 'type' })
export class ClientTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ClientType,
    default: ClientType.PERSON,
  })
  readonly type: ClientType;
}
