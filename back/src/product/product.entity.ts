import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeliveryItem } from "../delivery_item/delivery_item.entity";

@Entity({name: 'products'})
@ObjectType()
export class Product {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({nullable: true})
    @Field({nullable: true})
    description?: string;

    @Column({nullable: true})
    @Field({nullable: true})
    image?: string;

    @Column({type: 'float'})
    @Field(() => Float)
    price: number;

    @Field()
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    // #region Associations
    @OneToMany(() => DeliveryItem, (item) => item.productConnection)
    items: Promise<DeliveryItem[]>;

    // #endregion
}