import { Field, Float, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Delivery } from "../delivery/delivery.entity";
import { Product } from "../product/product.entity";

@Entity({name: 'delivery_items'})
@ObjectType()
export class DeliveryItem {
    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'float'})
    @Field(()=> Float)
    price: number

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({name: 'product_id'})
    @Field(()=> Int)
    productId: number

    @Column({name: 'delivery_id'})
    @Field(()=> Int)
    deliveryId: number

    @Field(()=> Product)
    product: Product

    //#region Associations
    @ManyToOne(() => Delivery, delivery => delivery.items)
    @JoinColumn({name: 'delivery_id'})
    deliveryConnection: Promise<Delivery>;

    @ManyToOne(() => Product, product => product.items)
    @JoinColumn({name: 'product_id'})
    productConnection: Promise<Product>;

  //#endregion

}