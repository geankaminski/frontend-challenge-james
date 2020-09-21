import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/james_logo.svg';
import EstablishmentImg from '../../assets/establishment_img.svg';

import { Header, Establishments } from './styles';

interface Response {
  id: string;
  index: string;
  name: string;
  address: string;
}

interface Establishment {
  id: string;
  name: string;
  index: string;
  city: string;
  address: string;
}

const Dashboard: React.FC = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  useEffect(() => {
    const storageEstablishments = localStorage.getItem(
      '@JamesDelivery:establishments',
    );
    if (storageEstablishments) {
      setEstablishments(JSON.parse(storageEstablishments));
    } else {
      api
        .get('https://api.jsonbin.io/b/5f6785857243cd7e824006d3')
        .then(response => {
          response.data.map((resp: Response) => {
            const [street, state, city, houseNumber] = resp.address.split(',');
            const address = `${street}, ${houseNumber}, ${state}`;
            const establishment: Establishment = {
              id: resp.id,
              name: resp.name,
              index: resp.index,
              city,
              address,
            };
            setEstablishments(establishments => [
              ...establishments,
              establishment,
            ]);
          });
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      '@JamesDelivery:establishments',
      JSON.stringify(establishments),
    );
  }, [establishments]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="James Delivery" />
      </Header>

      <Establishments>
        {establishments.length === 0 && <div>Carregando...</div>}
        {establishments.map(establishment => (
          <Link
            key={establishment.id}
            to={`/establishment/${establishment.index}`}
          >
            <img src={EstablishmentImg} alt="Establishment Logo" />
            <div>
              <strong>{establishment.name}</strong>
              <span>{establishment.index}</span>
              <p>{establishment.city}</p>
              <span>{establishment.address}</span>
            </div>
          </Link>
        ))}
      </Establishments>
    </>
  );
};
export default Dashboard;
