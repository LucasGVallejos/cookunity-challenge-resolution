import { useContext } from "react";
import DeliveriesContext from "../context/DeliveriesContext";

const useDeliveries = () => {
    const {
        deliveries,
        fetchDeliveries,
        selectedDelivery,
        selectDelivery,
        onConfirmDelivery,
        onRescheduleDelivery
    } = useContext(DeliveriesContext)

    const getDeliveryAction = () => {
        return {
            buttonText: selectedDelivery.hasToBeRescheduled ? 'Reschedule' : 'Confirm',
            title: selectedDelivery.hasToBeRescheduled ? 'Reschedule your order' : 'Confirm your order',
            processDelivery: !selectedDelivery.hasToBeRescheduled ? onConfirmDelivery : onRescheduleDelivery
        }
    }

    return { deliveries, fetchDeliveries, selectedDelivery, selectDelivery, getDeliveryAction}
}

export default useDeliveries