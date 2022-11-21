import { Column } from 'typeorm';

export class TypeSuscriptionTypeORM {
  @Column('varchar', { name: 'type', length: 15, nullable: true })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): TypeSuscriptionTypeORM {
    return new TypeSuscriptionTypeORM(value);
  }
}
