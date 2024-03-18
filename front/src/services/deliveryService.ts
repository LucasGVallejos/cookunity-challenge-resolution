// deliveryService.ts
import { apolloClient } from '../graphql/client';
import { FIND_ALL_DELIVERIES_QUERY } from '../graphql/delivery/delivery.query';
import { CONFIRM_DELIVERY_MUTATION, RESCHEDULE_DELIVERY_MUTATION } from '../graphql/delivery/delivery.mutation';
import { handleGraphQLErrors } from '../helpers/errorHelper';
import { Deliveries } from '../graphql/delivery/dtos/delivery.output';
import { ConfirmDeliveryInput, RescheduleDeliveryInput } from '../graphql/delivery/dtos/delivery.input';

export const fetchAllDeliveries = async () : Promise<Deliveries[]> => {
    try {
        const { data, errors } = await apolloClient.query({ query: FIND_ALL_DELIVERIES_QUERY });
        
        if (errors) {
            handleGraphQLErrors(errors);
            throw new Error('Error fetching deliveries');
        }

    return data.findAllDeliveries;
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        throw error;
    }
};

export const confirmDelivery = async (confirmDeliveryInput: ConfirmDeliveryInput) : Promise<number> => {
    try {
        const { data, errors } = await apolloClient.mutate({
            mutation: CONFIRM_DELIVERY_MUTATION,
            variables: { data: confirmDeliveryInput },
        });

        if (errors) {
            handleGraphQLErrors(errors);
            throw new Error('Error confirming delivery');
        }

    return data.confirmDelivery.id;
    } catch (error) {
        console.error(`Error confirming delivery ${confirmDeliveryInput.idDelivery}: `, error);
        throw error;
    }
};

export const rescheduleDelivery = async (rescheduleDeliveryInput : RescheduleDeliveryInput) : Promise<number> => {
    try {
        const { data, errors } = await apolloClient.mutate({
            mutation: RESCHEDULE_DELIVERY_MUTATION,
            variables: {data : rescheduleDeliveryInput }
        });

        if (errors) {
            handleGraphQLErrors(errors);
            throw new Error('Error rescheduling delivery');
        }

        return data.rescheduleDelivery.id;
    } catch (error) {
        console.error(`Error on rescheduling delivery ${rescheduleDeliveryInput.idDelivery}: `, error);
        throw error;
    }
}