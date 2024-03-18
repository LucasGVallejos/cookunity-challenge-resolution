import { FC } from 'react';
import './SubHeader.scss';
import { Cart } from '../../../../components/Cart';
import useDeliveries from '../../../../hooks/useDeliveries';

export const SubHeader: FC = () => {
  const { selectedDelivery, getDeliveryAction } = useDeliveries();
  const { buttonText, title, processDelivery } = getDeliveryAction()
  const { items } = selectedDelivery
  const amountOfItems = items?.length;

  return (
    <div className="subheader-container">
      <div className="subheader page__horizontal-space">
        <h1 data-test-id="subheader-title">{title}</h1>
        <Cart amountOfItems={amountOfItems} buttonText={buttonText} onClick={processDelivery}/>
      </div>
    </div>
  );
};
