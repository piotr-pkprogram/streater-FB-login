import React, { useRef, useState } from 'react';
import LoginViewWrapper from 'components/templates/LoginViewWrapper/LoginViewWrapper';
import { useForm } from 'hooks/useForm';
import { RegisterState } from 'types/FormTypes';
import { Input } from 'components/atoms/Input/Input';
import { ErrorP } from 'views/Register/Register.styles';
import { InputsWrapper } from './FoodtruckerRegister.styles';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';
import { useValidators } from 'hooks/useValidators';

const InitialState: RegisterState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  foodtruckName: '',
  city: '',
  contactPhone: '',
  errorsInputs: {}
};

const FoodtruckerRegister = () => {
  const {
    // @ts-ignore
    formValues: { name, surname, email, password, foodtruckName, city, contactPhone, errorsInputs },
    handleInputChange,
    handleSubmitForm,
    handleThrowError
  } = useForm(InitialState);
  const { validateEmpty, validateEmail, validatePasswd } = useValidators(handleThrowError);
  const firstStep = useRef<HTMLDivElement>(null);
  const nextStep = useRef<HTMLDivElement>(null);
  const [isFirstStepVisible, setIsFirstStepVisible] = useState(true);

  const handleSwitchInputs = () => {
    const sectionFirstStep = firstStep.current as HTMLDivElement;
    const sectionNextStep = nextStep.current as HTMLDivElement;

    if (isFirstStepVisible) {
      const formInputs = sectionFirstStep.querySelectorAll('input');

      formInputs.forEach((input) => {
        if (input.getAttribute('data-required') === 'true') {
          validateEmpty(input);
          if (input.type === 'email') validateEmail(input);
          if (input.type === 'password') validatePasswd(input);
        }
      });

      if (
        errorsInputs?.name === '' &&
        errorsInputs?.surname === '' &&
        errorsInputs?.email === '' &&
        errorsInputs?.password === ''
      ) {
        sectionFirstStep.classList.add('hidden');
        sectionNextStep.classList.remove('hidden');
        setIsFirstStepVisible(false);
      }
    } else {
      sectionNextStep.classList.add('hidden');
      sectionFirstStep.classList.remove('hidden');
      setIsFirstStepVisible(true);
    }
  };

  return (
    <LoginViewWrapper
      title={`Rejestracja ${isFirstStepVisible ? 1 : 2}/2`}
      loginLink="foodtruck-register"
      className="gap-6"
      handleGoToBack={isFirstStepVisible ? () => history.back() : handleSwitchInputs}
      handleSubmitForm={handleSubmitForm}
    >
      <InputsWrapper ref={firstStep}>
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
      </InputsWrapper>
      <InputsWrapper className="hidden" ref={nextStep}>
        <Input
          type="text"
          name="foodtruckName"
          placeholder="Nazwa Foodtrucka"
          value={foodtruckName}
          onChange={handleInputChange}
          data-required="true"
        />
        <ErrorP id="error-name">{errorsInputs?.foodtruckName}</ErrorP>
        <Input
          type="text"
          name="city"
          placeholder="Miasto"
          value={city}
          onChange={handleInputChange}
          data-required="true"
        />
        <ErrorP id="error-surname">{errorsInputs?.city}</ErrorP>
        <Input
          type="phone"
          name="contactPhone"
          placeholder="Telefon Konatktowy"
          value={contactPhone}
          onChange={handleInputChange}
          data-required="true"
        />
        <ErrorP id="error-surname">{errorsInputs?.contactPhone}</ErrorP>
        <p className="w-full text-sm font-normal mb-2">
          Resztę danych możesz podać po rejestracji.
        </p>
      </InputsWrapper>
      <TextButton
        classNames={isFirstStepVisible ? '' : 'hidden'}
        isDark
        type={BtnTypes.Button}
        onClick={handleSwitchInputs}
      >
        Dalej
      </TextButton>
      <TextButton classNames={isFirstStepVisible ? 'hidden' : ''} isDark type={BtnTypes.SUBMIT}>
        Zarejestruj
      </TextButton>
    </LoginViewWrapper>
  );
};

export default FoodtruckerRegister;
