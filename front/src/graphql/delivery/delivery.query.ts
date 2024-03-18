import { gql } from "@apollo/client"

export const FIND_ALL_DELIVERIES_QUERY = gql `
query {
    findAllDeliveries {
        id
        timeExpected
        status
        hasToBeRescheduled
        items {
            price
            product {
                name
                image
                description
                id
            }
        }
    }
}
`