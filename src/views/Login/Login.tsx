import React from 'react';
import { useForm } from 'hooks/useForm';
import { LoginState } from 'types/FormTypes';
import LoginViewWrapper from 'components/templates/LoginViewWrapper/LoginViewWrapper';
import { ErrorP } from './Login.styles';
import { Input } from 'components/atoms/Input/Input';
import { BtnTypes } from 'types/BtnTypes';
import TextButton from 'components/atoms/TextButton/TextButton';

const InitialState: LoginState = {
  email: '',
  password: ''
};

const Login = () => {
  const {
    formValues: { email, errorsInputs, password },
    handleInputChange,
    handleSubmitForm
  } = useForm(InitialState);

  const loginLink = location.pathname.includes('foodtruck') ? 'foodtruck-register' : 'register';

  return (
    <LoginViewWrapper
      className="gap-4"
      title="Logowanie"
      handleSubmitForm={handleSubmitForm}
      loginLink={loginLink}
    >
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
        Zaloguj
      </TextButton>
    </LoginViewWrapper>
  );
};

Login.propTypes = {};

export default Login;
