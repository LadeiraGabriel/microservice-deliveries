import { Delivery } from '@modules/delivery/application/entities/delivery.entity';
import { DeliveryRespositoryInterface } from 'src/modules/delivery/application/repositories/delivery.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { DeliveryPrismaMapper } from '../mappers/delivery-prisma.mapper';
@Injectable()
export class DeliveryPrismaRepository implements DeliveryRespositoryInterface {
  constructor(private prisma: PrismaService) {}
  async create(delivery: Delivery): Promise<void> {
    const rawDelivery = DeliveryPrismaMapper.toPrisma(delivery);
    await this.prisma.delivery.create({
      data: rawDelivery,
    });
  }

  async save(delivery: Delivery): Promise<void> {
    const rawDelivery = DeliveryPrismaMapper.toPrisma(delivery);
    await this.prisma.delivery.update({
      where: { id: delivery.id },
      data: rawDelivery,
    });
  }
  async findById(id: string): Promise<Delivery | undefined> {
    const rawDelivery = await this.prisma.delivery.findFirst({
      where: {
        id,
      },
    });
    if (!rawDelivery) return undefined;
    return DeliveryPrismaMapper.toDomain(rawDelivery);
  }
  async findByOrderId(orderId: string): Promise<Delivery | undefined> {
    const rawDelivery = await this.prisma.delivery.findFirst({
      where: {
        order_id: orderId,
      },
    });
    if (!rawDelivery) return undefined;
    return DeliveryPrismaMapper.toDomain(rawDelivery);
  }
  async findAll(): Promise<Delivery[]> {
    const rawDeliveries = await this.prisma.delivery.findMany({});
    return rawDeliveries.map(DeliveryPrismaMapper.toDomain);
  }
}
