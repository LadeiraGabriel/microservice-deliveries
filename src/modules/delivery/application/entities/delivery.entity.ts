import { randomUUID } from 'crypto';
import { Optional } from 'src/helpers/optional';

type DeliveryProps = {
  orderId: string;
  userId: string;
  productId: string;
  quantityProduct: number;
  district: string;
  street: string;
  hourseNumber: number;
  reference: string | null;
  createdAt: Date;
  startAt: Date | null;
  endAt: Date | null;
};
export class Delivery {
  private _id: string;
  private props: DeliveryProps;
  constructor(
    props: Optional<
      DeliveryProps,
      'startAt' | 'endAt' | 'createdAt' | 'reference'
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      reference: props.reference ?? null,
      createdAt: props.createdAt ?? new Date(),
      startAt: props.startAt ?? null,
      endAt: props.endAt ?? null,
    };
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get orderId() {
    return this.props.orderId;
  }
  get userId() {
    return this.props.userId;
  }

  get productId() {
    return this.props.productId;
  }
  get quantityProduct() {
    return this.props.quantityProduct;
  }

  get district() {
    return this.props.district;
  }

  get street() {
    return this.props.street;
  }
  get hourseNumber() {
    return this.props.hourseNumber;
  }

  get reference(): string | null {
    return this.props.reference;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  get startAt() {
    return this.props.startAt;
  }
  set startAt(startAt: Date) {
    this.props.startAt = startAt;
  }
  get endAt() {
    return this.props.endAt;
  }
  set endAt(endAt) {
    this.props.endAt = endAt;
  }
}
