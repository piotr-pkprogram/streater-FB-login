import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import SimpleViewsLayout from 'components/templates/SimpleViewsLayout/SimpleViewsLayout';
import foodtruckProblems from 'assets/icons/foodtruck-problems.svg';
import { ContactFormState } from 'types/FormTypes';
import { useForm } from 'hooks/useForm';
import { StyledForm } from 'views/Contact/Contact.styles';
import { StyledInput } from './ProblemsContact.styles';
import { ErrorP } from 'views/Login/Login.styles';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';
import { Title } from 'components/atoms/Title/Title';

const InitialState: ContactFormState = {
  name: '',
  email: '',
  topic: '',
  message: ''
};

const ProblemsContact = () => {
  const {
    // @ts-ignore
    formValues: { name, email, topic, message, errorsInputs },
    handleInputChange,
    handleSubmitForm
  } = useForm(InitialState);
  const [cookies] = useCookies(['user-token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies['user-token']) navigate('/app/login');
  }, [cookies['user-token']]);

  return (
    <SimpleViewsLayout>
      <StyledForm onSubmit={handleSubmitForm}>
        <div className="justify-self-center my-5 grid gap-3 justify-items-center">
          <img src={foodtruckProblems} alt="" />
          <Title>Zgłoś Problem</Title>
        </div>
        <StyledInput
          type="text"
          name="name"
          placeholder="Imię"
          value={name}
          onChange={handleInputChange}
          data-required="true"
        />
        <ErrorP id="error-email">{errorsInputs?.name}</ErrorP>
        <StyledInput
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          data-required="true"
        />
        <ErrorP id="error-email">{errorsInputs?.email}</ErrorP>
        <StyledInput
          type="text"
          name="topic"
          placeholder="Temat"
          value={topic}
          onChange={handleInputChange}
        />
        <ErrorP id="error-email">{errorsInputs?.topic}</ErrorP>
        <StyledInput
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
    </SimpleViewsLayout>
  );
};

export default ProblemsContact;
