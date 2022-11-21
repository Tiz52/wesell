export class OpenSuscribeResponse {
  constructor(
    public id: number,
    public number: string,
    public type: string,
    public createdAt: string,
    public createdBy: number,
    public updatedAt: string,
    public updatedBy: number,
    public clientId: number,
  ) {}
}
