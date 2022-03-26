import React from 'react';
import { StyledForm, StyledInput } from './BasicInfo.styles';
import { ErrorP } from 'views/Login/Login.styles';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';
import { BasicInfoType } from 'types/FormTypes';
import { useForm } from 'hooks/useForm';

const InitialState: BasicInfoType = {
  name: '',
  contactPhone: '',
  city: '',
  kitchen: '',
  desc: ''
};

const BasicInfo = () => {
  const {
    // @ts-ignore
    formValues: { name, contactPhone, city, kitchen, desc, errorsInputs },
    handleInputChange,
    handleSubmitForm
  } = useForm(InitialState);

  return (
    <StyledForm onSubmit={handleSubmitForm}>
      <label className="col-start-1 w-max" htmlFor="name">
        Nazwa
      </label>
      <StyledInput
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-name" className="col-start-1 col-end-3 !px-0">
        {errorsInputs?.name}
      </ErrorP>
      <label className="col-start-1 w-max" htmlFor="contactPhone">
        Telefon
      </label>
      <StyledInput
        id="contactPhone"
        type="tel"
        name="contactPhone"
        value={contactPhone}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-phone" className="col-start-1 col-end-3 !px-0">
        {errorsInputs?.contactPhone}
      </ErrorP>
      <label className="col-start-1 w-max" htmlFor="city">
        Miasto
      </label>
      <StyledInput
        id="city"
        type="text"
        name="city"
        value={city}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-city" className="col-start-1 col-end-3 !px-0">
        {errorsInputs?.city}
      </ErrorP>{' '}
      <label className="col-start-1 w-max" htmlFor="kitchen">
        Kuchnia
      </label>
      <StyledInput
        id="kitchen"
        type="text"
        name="kitchen"
        value={kitchen}
        onChange={handleInputChange}
        data-required="true"
      />
      <ErrorP id="error-kitchen" className="col-start-1 col-end-3 !px-0">
        {errorsInputs?.kitchen}
      </ErrorP>{' '}
      <label className="col-start-1 w-max self-start" htmlFor="desc">
        Opis
      </label>
      <StyledInput
        as="textarea"
        id="desc"
        type="text"
        name="desc"
        value={desc}
        onChange={handleInputChange}
      />
      <ErrorP id="error-desc" className="col-start-1 col-end-3 !px-0">
        {errorsInputs?.desc}
      </ErrorP>
      <TextButton
        type={BtnTypes.SUBMIT}
        isRouterLink
        classNames="text-white bg-gold font-medium col-start-1 col-end-3 w-full"
        to="/app/my-foodtrucks"
      >
        Zapisz
      </TextButton>
    </StyledForm>
  );
};

export default BasicInfo;
