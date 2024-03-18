import { FC } from 'react';
import './SubHeader.scss';
import { Cart } from '../../../../components/Cart';
import useDeliveries from '../../../../hooks/useDeliveries';

export const SubHeader: FC = () => {
  const { onConfirmDelivery , onRescheduleDelivery, selectedDelivery } = useDeliveries();
  const { hasToBeRescheduled, items } = selectedDelivery
  const amountOfItems = items?.length;
  const title = hasToBeRescheduled ? 'Reschedule your order' : 'Confirm your order';
  const buttonText = hasToBeRescheduled ? 'Reschedule' : 'Confirm';

  const onClick = !hasToBeRescheduled ? onConfirmDelivery : onRescheduleDelivery;

  return (
    <div className="subheader-container">
      <div className="subheader page__horizontal-space">
        <h1 data-test-id="subheader-title">{title}</h1>
        <Cart amountOfItems={amountOfItems} buttonText={buttonText} onClick={onClick}/>
      </div>
    </div>
  );
};
