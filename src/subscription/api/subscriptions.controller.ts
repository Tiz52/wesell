import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { OpenSuscribeRequest } from '../application/dtos/request/open-suscriptions-request.dto';
import { OpenSuscribeResponse } from '../application/dtos/response/open-suscriptions-response.dto';
import { SubscriptionApplicationService } from '../application/services/subscriptions-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetSubscriptionsByIdQuery } from '../application/queries/get-subscriptions-by-id.query';
import { GetSubscriptionsQuery } from '../application/queries/get-subscriptions.query';
import { ApiTags } from '@nestjs/swagger';

@Controller('Subscription')
@ApiTags('subscription')
export class SubscriptionController {
  constructor(
    private readonly accountsApplicationService: SubscriptionApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async open(
    @Body() openAccountRequest: OpenSuscribeRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenSuscribeResponse> =
        await this.accountsApplicationService.open(openAccountRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getAccounts(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetSubscriptionsQuery(),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(
    @Param('id') accountId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetSubscriptionsByIdQuery(accountId),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
