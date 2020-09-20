import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/james_logo.svg';
import EstablishmentImg from '../../assets/establishment_img.svg';

import { Header, Establishments } from './styles';

// Usando uma const posso definir a tipagem

interface Establishment {
  id: string;
  index: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  registered: string;
  latitude: number;
  longitude: number;
}

const Dashboard: React.FC = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  useEffect(() => {
    const storageEstablishments = localStorage.getItem(
      '@JamesDelivery:establishments',
    );

    if (storageEstablishments) {
      // Se já tiver no local storage não vai requisitar pra api
      setEstablishments(JSON.parse(storageEstablishments));
    } else {
      api
        .get(
          'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments',
        )
        .then(response => {
          setEstablishments(response.data);

          localStorage.setItem(
            '@JamesDelivery:establishments',
            JSON.stringify(response.data),
          );
        });
    }
  }, []);

  return (
    <>
      <Header>
        <img src={logoImg} alt="James Delivery" />
      </Header>

      <Establishments>
        {establishments.length === 0 && <div>Loading...</div>}
        {establishments.map(establishment => (
          <Link
            key={establishment.id}
            to={`/establishment/${establishment.name}`}
          >
            <img src={EstablishmentImg} alt="Establishment Logo" />
            <div>
              <strong>{establishment.name}</strong>
              <span>{establishment.index}</span>
              <p>{establishment.address}</p>
            </div>
          </Link>
        ))}
      </Establishments>
    </>
  );
};
export default Dashboard;
