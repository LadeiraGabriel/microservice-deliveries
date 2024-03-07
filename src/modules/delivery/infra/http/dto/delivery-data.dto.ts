import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class DeliveryDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class ListAllDeliveryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
}
