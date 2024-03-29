import { ListDeliveryByStatusUseCase } from '@modules/delivery/application/useCases/list-delivery-by-status-use-case/list-delivery-by-status.use-case';
import { FinalizeDeliveryUseCase } from '@modules/delivery/application/useCases/finalize-delivery-use-case/finalize-delivery.use-case';
import { StartDeliveryUseCase } from '@modules/delivery/application/useCases/start-delivery-use-case/start-delivery.use-case';
import { ResourceNotFoundError } from '@shared/core/errors/generics/resource-not-found.error';
import { ResourceConflictError } from '@shared/core/errors/generics/resource-conflict.error';
import { Controller, Get, Param, Patch, Query, Res } from '@nestjs/common';
import { Role, Roles } from '@shared/infra/http/decorator/role.decorator';
import { DeliveryViewModel } from '../view-models/delivery.view-model';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { DeliveryDataDto } from '../dto/delivery-data.dto';
import { Response } from 'express';

@Controller('delivery')
@ApiTags('Deliveries')
@ApiSecurity('bearerAuth')
@Roles(Role.DELIVERYMAN)
export class HttpDeliveryController {
  constructor(
    private startDeliveryUseCase: StartDeliveryUseCase,
    private finalizeDeliveryUseCase: FinalizeDeliveryUseCase,
    private listDeliveryByStatusUseCase: ListDeliveryByStatusUseCase,
  ) {}
  @Patch(':id/start')
  async start(@Param() deliveryDataDto: DeliveryDataDto, @Res() res: Response) {
    const responseUseCase = await this.startDeliveryUseCase.execute({
      deliveryId: deliveryDataDto.id,
    });

    if (responseUseCase.isFailure()) {
      const message = responseUseCase.value.message;
      if (responseUseCase.value.constructor === ResourceNotFoundError) {
        res.status(404).json({
          status: 'error',
          error: 'code.not_found',
          message,
        });
      }

      if (responseUseCase.value.constructor === ResourceConflictError) {
        res.status(409).json({
          status: 'error',
          error: 'code.conflict_error',
          message,
        });
      }

      res.status(503).json({
        status: 'error',
        error: 'code.service_unavailable',
        message,
      });
    }

    return res.send();
  }
  @Patch(':id/finalize')
  async finalize(
    @Param() deliveryDataDto: DeliveryDataDto,
    @Res() res: Response,
  ) {
    const responseUseCase = await this.finalizeDeliveryUseCase.execute({
      deliveryId: deliveryDataDto.id,
    });
    if (responseUseCase.isFailure()) {
      const message = responseUseCase.value.message;
      if (responseUseCase.value.constructor === ResourceNotFoundError) {
        res.status(404).json({
          status: 'error',
          error: 'code.not_found',
          message,
        });
      }

      if (responseUseCase.value.constructor === ResourceConflictError) {
        res.status(409).json({
          status: 'error',
          error: 'code.conflict_error',
          message,
        });
      }

      res.status(503).json({
        status: 'error',
        error: 'code.service_unavailable',
        message,
      });
    }

    return res.send();
  }

  @Get()
  @ApiQuery({ name: 'status' })
  async listDeliveries(
    @Query('status') listDeliveryQuery,
    @Res() res: Response,
  ) {
    const responseUseCase = await this.listDeliveryByStatusUseCase.execute({
      status: listDeliveryQuery,
    });
    const deliveriesViewModel = responseUseCase.value.map(
      DeliveryViewModel.toHttp,
    );
    res.json({ deliveries: deliveriesViewModel });
  }
}
