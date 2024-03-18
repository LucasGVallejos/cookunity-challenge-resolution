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

    return { deliveries, fetchDeliveries, selectedDelivery, selectDelivery, onConfirmDelivery, onRescheduleDelivery}
}

export default useDeliveries