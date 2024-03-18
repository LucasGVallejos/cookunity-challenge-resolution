import { FC, useState } from 'react';
import './Header.scss';
import useDeliveries from '../../../hooks/useDeliveries';

export const Header: FC = () => {
  const { deliveries , selectedDelivery, selectDelivery, onConfirmDelivery, onRescheduleDelivery} = useDeliveries();
  const buttonText = selectedDelivery.hasToBeRescheduled ? 'Reschedule' : 'Confirm';

  const onClick = !selectedDelivery.hasToBeRescheduled ? onConfirmDelivery : onRescheduleDelivery;

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
  
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number, deliveryId: number) => {
    setActiveTab(index);
    const delivery = deliveries.find((delivery) => delivery.id == deliveryId);
    selectDelivery(delivery!)
  };

  return (
    <header className="header-container">
      <div className="page__horizontal-space header">
        <div className="tabs-container">
          <div className="tabs">
            {deliveries.map((delivery, index) => (
                <button
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => handleTabClick(index, delivery.id)}
                  key={delivery.id}
                >
                  <span className="date">{formatDate(delivery.timeExpected)}</span>
                </button>
              ))}
          </div>
        </div>
        <button
          className="btn-primary btn-buy"
          data-test-id="header-cta"
          onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </header>
  );
};
