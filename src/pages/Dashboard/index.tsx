import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/james_logo.svg';
import EstablishmentImg from '../../assets/establishment_img.svg';

import { Header, Establishments } from './styles';

/*
 * Only using the common data between the API and Figma Screenshots.
 */

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
      /*
       * Sometimes API stops responding. So I use this https://api.jsonbin.io/b/5f6785857243cd7e824006d3
       */
      api
        .get(
          'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments',
        )
        .then((response) => {
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
    /*
     * Updating localStorage whenever establishments is modified.
     */
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
        {establishments.map((establishment) => (
          <Link
            key={establishment.id}
            to={`/establishment/${establishment.index}`}
          >
            {/*
             * I preferred to use the Figma images to make the page more beautiful 🏄
             */}
            <img src={EstablishmentImg} alt="Establishment Logo" />
            <div>
              <div>
                <strong>{establishment.name}</strong>
                <span>{establishment.index}</span>
              </div>
              <div>
                <p>{establishment.city}</p>
                <span>|</span>
                <span>{establishment.address}</span>
              </div>
            </div>
          </Link>
        ))}
      </Establishments>
    </>
  );
};
export default Dashboard;
