import React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/james_logo.svg';
import EstablishmentImg from '../../assets/establishment_img.svg';

import { Header, Details, DataInput } from './styles';

interface EstablishmentParams {
  name: string;
}

interface MyFormValues {
  firstName: string;
}

const Establishment: React.FC = () => {
  const { params } = useRouteMatch<EstablishmentParams>();
  const initialValues: MyFormValues = { firstName: '' };

  return (
    <>
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
            <strong>Subway</strong>
            <p>ID: 2</p>
          </div>
        </div>

        <DataInput>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            <Form>
              <p>Informações Básicas</p>
              <hr />
              <section>
                <div>
                  <label htmlFor="name">Nome</label>
                  <select name="name" id="name">
                    <option value="xxx" label="Conta Corrente" />
                    <option value="xxx" label="Conta Poupança" />
                  </select>
                </div>
                <div>
                  <label htmlFor="city">Cidade</label>
                  <select name="city" id="city">
                    <option value="xxx" label="Conta Corrente" />
                    <option value="xxx" label="Conta Poupança" />
                  </select>
                </div>
                <div>
                  <label htmlFor="address">Endereço</label>
                  <Field id="address" name="address" />
                </div>
              </section>
              <p>Financeiro</p>
              <hr />
              <section>
                <div>
                  <label htmlFor="bank">Banco</label>
                  <Field id="bank" name="bank" />
                </div>
                <div>
                  <label htmlFor="type">Tipo de Conta</label>
                  <select name="type" id="type">
                    <option value="xxx" label="Conta Corrente" />
                    <option value="xxx" label="Conta Poupança" />
                  </select>
                </div>
                <div>
                  <label htmlFor="code">CPF/CNPJ</label>
                  <Field id="code" name="code" />
                </div>
                <div>
                  <label htmlFor="agency">Agência</label>
                  <Field id="agency" name="agency" placeholder="XXXX-X" />
                </div>
                <div>
                  <label htmlFor="account">Conta</label>
                  <Field id="account" name="account" placeholder="XXXXX-X" />
                </div>
                <div>
                  <label htmlFor="sAutomatic">Saque automático?</label>
                  <select name="sAutomatic" id="sAutomatic">
                    <option value="xxx" label="Sim" />
                    <option value="xxx" label="Não" />
                  </select>
                </div>
              </section>
              <button type="submit">SALVAR</button>
            </Form>
          </Formik>
        </DataInput>
      </Details>
    </>
  );
};

export default Establishment;
