import { gql } from "@apollo/client";

const CONFIRM_DELIVERY_MUTATION = gql`
mutation ConfirmDelivery($data: ConfirmDeliveryInput!) {
    confirmDelivery(data: $data) {
        id
    }
}
`

const RESCHEDULE_DELIVERY_MUTATION = gql`mutation Mutation($data: RescheduleDeliveryInput!) {
    rescheduleDelivery(data: $data) {
        id
    }
}`

export {
    CONFIRM_DELIVERY_MUTATION,
    RESCHEDULE_DELIVERY_MUTATION
}