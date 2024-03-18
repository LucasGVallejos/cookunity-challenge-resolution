import { createContext, useState, useCallback } from "react";
import { Deliveries } from "../graphql/delivery/dtos/delivery.output";
import { ConfirmDeliveryInput, RescheduleDeliveryInput } from "../graphql/delivery/dtos/delivery.input";
import { confirmDelivery, rescheduleDelivery, fetchAllDeliveries } from "../services/deliveryService";

class DeliveriesContextValue {
    deliveries: Deliveries[];
    fetchDeliveries: () => Promise<Deliveries[]>;
    selectedDelivery : Deliveries;
    selectDelivery: (delivery: Deliveries) => void;
    onConfirmDelivery: ()=> Promise<Number>;
    onRescheduleDelivery: ()=> Promise<Number>
}

const DeliveriesContext = createContext<DeliveriesContextValue>({
    deliveries: [],
    fetchDeliveries: () => Promise.resolve([]),
    selectedDelivery: new Deliveries(),
    selectDelivery: () => {},
    onConfirmDelivery: ()=> Promise.resolve(1),
    onRescheduleDelivery: ()=> Promise.resolve(1),
});

export const DeliveriesProvider = ({ children }) => {
    const [deliveries, setDeliveries] = useState<Deliveries[]>([]);
    const [selectedDelivery, setSelectedDelivery] = useState<Deliveries>(new Deliveries());

    const fetchDeliveries = useCallback(async (): Promise<Deliveries[]> => {
        const deliveriesFetched = await fetchAllDeliveries();
        setDeliveries(deliveriesFetched);
        setSelectedDelivery(deliveriesFetched[0])
        return deliveriesFetched;
    }, []);

    const selectDelivery = useCallback((delivery: Deliveries) => {
        setSelectedDelivery(delivery);
    }, [])

    const onConfirmDelivery = useCallback(async () : Promise<number>=> {
        try {
            const confirmDeliveryInput = new ConfirmDeliveryInput(selectedDelivery.id)
            const data = await confirmDelivery(confirmDeliveryInput);
            alert('Confirmed');
            return data;
        } catch (error) {
            throw error
        }

    }, [selectedDelivery])

    const onRescheduleDelivery = useCallback(async () : Promise<number> => {
        try {
            const { timeExpected, id } = selectedDelivery
            const currentDate = new Date(timeExpected);
            currentDate.setDate(currentDate.getDate() + 1);
            const rescheduleDeliveryInput = new RescheduleDeliveryInput(id, currentDate.toISOString());
            const data = await rescheduleDelivery(rescheduleDeliveryInput);
            alert('Rescheduled');
            return data
        } catch (error) {
            throw error;
        }
       
    }, [selectedDelivery])

    const contextValue = {
        deliveries,
        fetchDeliveries,
        selectedDelivery,
        selectDelivery, 
        onConfirmDelivery,
        onRescheduleDelivery
    };

    return (
        <DeliveriesContext.Provider value={contextValue}>
            {children}
        </DeliveriesContext.Provider>
    );
};

export default DeliveriesContext;
