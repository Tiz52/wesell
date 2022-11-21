import { Column } from 'typeorm';

export class SuscriberIdTypeORM {
  @Column('bigint', { name: 'client_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): SuscriberIdTypeORM {
    return new SuscriberIdTypeORM(value);
  }
}
