import { Column, Unique } from 'typeorm';

export class PersonEmailTypeORM {
  @Column('varchar', { name: 'email', length: 75, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PersonEmailTypeORM {
    return new PersonEmailTypeORM(value);
  }
}
