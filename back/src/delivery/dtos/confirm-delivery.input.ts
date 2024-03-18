import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ConfirmDeliveryInput {
    @Field(()=> Int)
    readonly idDelivery: number
}