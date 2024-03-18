import { DeliveriesPage } from './pages/deliveries/DeliveriesPage';
import './styles/normalize.css';
import './styles/theme.css';
import './styles/layout.css';
import useDeliveries from './hooks/useDeliveries';
import { useEffect } from 'react';

export function App() {
const { fetchDeliveries } = useDeliveries();

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const data = await fetchDeliveries()
        console.log("data: ", data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  // Lets say here's a router
  return (
      <DeliveriesPage />
  );
}
