import { Field, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeliveryItem } from "../delivery_item/delivery_item.entity";
import { DeliveryStatus } from "../enums/delivery.status";

@Entity({name: 'deliveries'})
@ObjectType()
export class Delivery {
    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    timeExpected: string

    @Column({
        type: "enum",
        enum: DeliveryStatus,
        default: DeliveryStatus.NOT_CONFIRMED
    })
    @Field()
    status: DeliveryStatus;

    @Field(()=> Boolean)
    hasToBeRescheduled: Boolean;

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // #region Associations
    @OneToMany(() => DeliveryItem, (item) => item.deliveryConnection)
    @Field(()=> [DeliveryItem])
    items: Promise<DeliveryItem[]>;

    // #endregion
}