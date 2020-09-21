import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, Redirect } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import logoImg from '../../assets/james_logo.svg';
import EstablishmentImg from '../../assets/establishment_img.svg';

import { Header, Details, DataInput } from './styles';

interface EstablishmentParams {
  index: string;
}

interface InitialValues {
  index: string;
  name: string;
  city: string;
  address: string;
}

interface Establishment {
  id: string;
  name: string;
  index: string;
  city: string;
  address: string;
}
const Establishment: React.FC = () => {
  const [redirect, setRedirect] = useState(false);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const { params } = useRouteMatch();
  const { register, handleSubmit } = useForm<InitialValues>();
  const [initialEstablishment, setInitialEstablishment] = React.useState<
    Establishment
  >({
    id: '',
    name: '',
    index: '',
    city: '',
    address: '',
  });

  useEffect(() => {
    const storageEstablishments: string | null = localStorage.getItem(
      '@JamesDelivery:establishments',
    );
    if (storageEstablishments) {
      setEstablishments(JSON.parse(storageEstablishments));
    }
  }, []);

  useEffect(() => {
    establishments.map(establishment => {
      if (params.index == establishment.index) {
        setInitialEstablishment(establishment);
      }
    });

    localStorage.removeItem('@JamesDelivery:establishments');

    localStorage.setItem(
      '@JamesDelivery:establishments',
      JSON.stringify(establishments),
    );
  }, [establishments]);

  const changeState = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const { name } = e.currentTarget;
    setInitialEstablishment({
      ...initialEstablishment,
      [name]: value,
    });
  };

  const onSubmit = (data: InitialValues) => {
    establishments.map(establishment => {
      if (initialEstablishment.index == establishment.index) {
        const tempEstablishement = {
          id: initialEstablishment.id,
          name: data.name,
          index: initialEstablishment.index,
          city: data.city,
          address: data.address,
        };
        const temporary = establishments;
        temporary[establishments.indexOf(establishment)] = tempEstablishement;
        console.log(temporary);
        setEstablishments(temporary);
        localStorage.setItem(
          '@JamesDelivery:establishments',
          JSON.stringify(establishments),
        );
        setRedirect(true);
      }
    });
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <Header>
        <img src={logoImg} alt="James Delivery" />
      </Header>

      <Details>
        <div>
          <Link to="/">
            <FiArrowLeft size={16} />
          </Link>

          <img src={EstablishmentImg} alt="Establishment Logo" />
          <div>
            <strong>{initialEstablishment.name}</strong>
            <p>ID: {initialEstablishment.index}</p>
          </div>
        </div>

        <DataInput>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Informações Básicas</p>
            <hr />
            <section>
              <div>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  name="name"
                  value={initialEstablishment.name}
                  onChange={changeState}
                  ref={register}
                />
              </div>
              <div>
                <label htmlFor="city">Cidade</label>
                <input
                  id="city"
                  name="city"
                  value={initialEstablishment.city}
                  onChange={changeState}
                  ref={register}
                />
              </div>
              <div>
                <label htmlFor="address">Endereço</label>
                <input
                  id="address"
                  name="address"
                  value={initialEstablishment.address}
                  onChange={changeState}
                  ref={register}
                />
              </div>
            </section>
            <p>Financeiro</p>
            <hr />
            <section>
              <div>
                <label htmlFor="bank">Banco</label>
                <input id="bank" name="bank" />
              </div>
              <div>
                <label htmlFor="type">Tipo de Conta</label>
                <select name="type" id="type">
                  <option value="" label="Conta Corrente" />
                  <option value="" label="Conta Poupança" />
                </select>
              </div>
              <div>
                <label htmlFor="cpf">CPF/CNPJ</label>
                <input id="cpf" name="code" />
              </div>
              <div>
                <label htmlFor="agency">Agência</label>
                <input id="agency" name="agency" placeholder="XXXX-X" />
              </div>
              <div>
                <label htmlFor="account">Conta</label>
                <input id="account" name="account" placeholder="XXXXX-X" />
              </div>
              <div>
                <label htmlFor="sAutomatic">Saque automático?</label>
                <select name="sAutomatic" id="sAutomatic">
                  <option value="" label="Sim" />
                  <option value="" label="Não" />
                </select>
              </div>
            </section>
            <button type="submit">SALVAR</button>
          </form>
        </DataInput>
      </Details>
    </>
  );
};

export default Establishment;
