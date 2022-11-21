export class SuscriptionOpened {
  constructor(
    public readonly id: number,
    public readonly number: string,
    public readonly clientId: number,
    public readonly type: string,
  ) {}
}
