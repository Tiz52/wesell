import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetSuscribeDto } from '../../dtos/queries/get-suscriptions.dto';
import { GetSubscriptionsByIdQuery } from '../../queries/get-subscriptions-by-id.query';

@QueryHandler(GetSubscriptionsByIdQuery)
export class GetSuscribeByIdHandler
  implements IQueryHandler<GetSubscriptionsByIdQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute(query: GetSubscriptionsByIdQuery) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      (SELECT CASE WHEN type = "1" THEN "NORMAL" ELSE "PREMIUM" END) AS type,
      a.client_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      suscriptions a
    WHERE
      a.client_id = ?;`;
    const ormSuscriptions = await manager.query(sql, [query.SuscriptionId]);
    if (ormSuscriptions.length <= 0) {
      return {};
    }
    const ormSuscription = ormSuscriptions[0];
    const suscriptionDto = new GetSuscribeDto();
    suscriptionDto.id = Number(ormSuscription.id);
    suscriptionDto.number = ormSuscription.number;
    suscriptionDto.clientId = Number(ormSuscription.client_id);
    suscriptionDto.type = ormSuscription.type;
    suscriptionDto.createdAt = ormSuscription.created_at;
    suscriptionDto.createdBy = ormSuscription.created_by;
    suscriptionDto.updatedAt = ormSuscription.updated_at;
    suscriptionDto.updatedBy = ormSuscription.updated_by;
    return suscriptionDto;
  }
}
