import { Field, InputType, Int } from "type-graphql";

@InputType()
export class RescheduleDeliveryInput {

    @Field(()=> Int)
    readonly idDelivery: number

    @Field()
    readonly rescheduledDate: string
}