import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetSubscriptionsQuery } from '../../queries/get-subscriptions.query';
import { GetSuscribeDto } from '../../dtos/queries/get-suscriptions.dto';

@QueryHandler(GetSubscriptionsQuery)
export class GetSuscriptionsHandler
  implements IQueryHandler<GetSubscriptionsQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute(query: GetSubscriptionsQuery) {
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
    ORDER BY
      a.created_at DESC;`;
    const ormSuscriptions = await manager.query(sql);
    if (ormSuscriptions.length <= 0) {
      return [];
    }
    const suscriptions: GetSuscribeDto[] = ormSuscriptions.map(function (
      ormSuscription,
    ) {
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
    });
    return suscriptions;
  }
}
