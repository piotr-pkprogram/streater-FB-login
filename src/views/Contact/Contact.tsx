import React from 'react';
import ReactDOM from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { menuLinks } from 'data/menulinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import { StyledIcon, Wrapper, StyledForm } from './Contact.styles';
import logo from 'assets/img/icon.svg';
import contactIcon from 'assets/img/contactIcon.svg';
import { Title } from 'components/atoms/Title/Title';
import { useForm } from 'hooks/useForm';
import { ContactFormState } from 'types/FormTypes';
import { Input } from 'components/atoms/Input/Input';
import { ErrorP } from 'views/Login/Login.styles';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';

const InitialState: ContactFormState = {
  name: '',
  email: '',
  message: ''
};

const Contact = () => {
  const {
    formValues: { name, email, message, errorsInputs },
    handleInputChange,
    handleSubmitForm
  } = useForm(InitialState);

  const body = document.querySelector('body') as HTMLBodyElement;

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <PhoneMenu>
            {menuLinks.map(({ id, to, text, svg }) => (
              <MenuLink key={id} to={to} text={text} svg={svg} />
            ))}
          </PhoneMenu>
          <StyledIcon svg={logo} isRouterLink to="/" />
        </>,
        body
      )}
      <Wrapper>
        <img src={contactIcon} alt="" />
        <Title>Pogadajmy</Title>
        <StyledForm onSubmit={handleSubmitForm}>
          <Input
            type="text"
            name="name"
            placeholder="Imię"
            value={name}
            onChange={handleInputChange}
            data-required="true"
          />
          <ErrorP id="error-email">{errorsInputs?.name}</ErrorP>
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
            as="textarea"
            type="text"
            name="message"
            placeholder="Wiadomość"
            value={message}
            onChange={handleInputChange}
            data-required="true"
          />
          <ErrorP id="error-message">{errorsInputs?.message}</ErrorP>
          <TextButton isDark type={BtnTypes.SUBMIT}>
            Wyślij
          </TextButton>
        </StyledForm>
      </Wrapper>
    </>
  );
};

export default Contact;
