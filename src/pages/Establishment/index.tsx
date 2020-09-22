import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, Redirect } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import logoImg from '../../assets/james_logo.svg';
import EstablishmentImg from '../../assets/establishment_img.svg';

import { Header, Details, DataInput } from './styles';

interface InitialValues {
  index: string;
  name: string;
  city: string;
  address: string;
}

/*
 * InitialValues are decomposed in a Establishment (address -> city + (street, state, houseNumber))
 */

interface Establishment {
  id: string;
  name: string;
  index: string;
  city: string;
  address: string;
}
const Establishment: React.FC = () => {
  const { params } = useRouteMatch(); // Taking the index of the chosen establishment

  const [redirect, setRedirect] = useState(false); // Redirect after submit form?
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
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
                <select id="bank">
                  <option value="brasil">Banco do Brasil</option>
                  <option value="bradesco">Caixa</option>
                  <option value="itau">Itaú</option>
                </select>
              </div>
              <div>
                <label htmlFor="type">Tipo de Conta</label>
                <select name="type" id="type">
                  <option value="cc" label="Conta Corrente" />
                  <option value="cp" label="Conta Poupança" />
                </select>
              </div>
              <div>
                <label htmlFor="cpf">CPF/CNPJ</label>
                <input id="cpf" name="code" placeholder="18.986.066/0001-68" />
              </div>
              <div>
                <label htmlFor="agency">Agência</label>
                <input id="agency" name="agency" placeholder="0010-4" />
              </div>
              <div>
                <label htmlFor="account">Conta</label>
                <input id="account" name="account" placeholder="25256-2" />
              </div>
              <div>
                <label htmlFor="sAutomatic">Saque automático?</label>
                <select name="sAutomatic" id="sAutomatic">
                  <option value="y" label="Sim" />
                  <option value="n" label="Não" />
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
