import { FC } from 'react';
import { SubHeader } from './SubHeader/SubHeader';
import { DeliveryItems } from '../../../graphql/delivery/dtos/delivery.output';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import useDeliveries from '../../../hooks/useDeliveries';

export const Main: FC = () => {
  const { selectedDelivery } = useDeliveries();
  const { items } = selectedDelivery;

  return (
    <main className="page__main">
      <SubHeader />
      <div className="products-grid page__horizontal-space page__vertical-space" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items?.map((item: DeliveryItems, index: number) => (
          <Card key={index} className="product-card" data-test-id="product-card" style={{ minWidth: '300px', margin: '8px' }}>
            <CardMedia component="img" height="240" image={item.product.image} alt={item.product.name} />
            <CardContent>
              <Typography variant="h6">{item.product.name}</Typography>
              <Typography variant="body1" color="text.secondary">{item.product.description}</Typography>
              <Typography variant="body1" color="text.secondary">${item.price}</Typography>
            </CardContent>
        </Card>
        ))}
      </div>
    </main>
  );
};
