import React from 'react';
import LoginViewWrapper from 'components/templates/LoginViewWrapper/LoginViewWrapper';
import { Input } from 'components/atoms/Input/Input';
import { RegisterState } from 'types/FormTypes';
import { useForm } from 'hooks/useForm';
import { ErrorP } from './Register.styles';
import { BtnTypes } from 'types/BtnTypes';
import TextButton from 'components/atoms/TextButton/TextButton';
import { useNavigate } from 'react-router-dom';

const InitialState: RegisterState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  errorsInputs: {}
};

const Register = () => {
  const {
    // @ts-ignore
    formValues: { email, errorsInputs, name, password, surname },
    handleInputChange,
    handleSubmitForm
  } = useForm(InitialState);
  const navigate = useNavigate();
  return (
    <LoginViewWrapper
      className="gap-6"
      title="Rejestracja"
      handleSubmitForm={handleSubmitForm}
      loginLink="login"
      handleGoToBack={() => navigate('/app/choose-login')}
    >
      <Input
        type="text"
        name="name"
        placeholder="Imię"
        value={name}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-name">{errorsInputs?.name}</ErrorP>
      <Input
        type="text"
        name="surname"
        placeholder="Nazwisko"
        value={surname}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-surname">{errorsInputs?.surname}</ErrorP>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-email">{errorsInputs?.email}</ErrorP>
      <Input
        type="password"
        name="password"
        placeholder="Hasło"
        value={password}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-password">{errorsInputs?.password}</ErrorP>
      <TextButton isDark type={BtnTypes.SUBMIT}>
        Zarejestruj
      </TextButton>
    </LoginViewWrapper>
  );
};

Register.propTypes = {};

export default Register;
