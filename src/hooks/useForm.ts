import { Reducer, useReducer } from 'react';
import {
  RegisterState,
  ActionTypes,
  ChangeInputEvent,
  ReducerAction,
  LoginState,
  SubmitFormEvent,
  FnSendForm,
  ContactFormState,
  BasicInfoType
} from 'types/FormTypes';
import { useValidators } from './useValidators';

// @ts-ignore
const formReducer: Reducer<RegisterState | ContactFormState | LoginState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionTypes.inputChange:
      return {
        ...state,
        [action.field]: action.value
      };
    case ActionTypes.clearValues:
      return {
        ...action.initialValues
      };
    case ActionTypes.throwError:
      return {
        ...state,
        errorsInputs: {
          ...state.errorsInputs,
          [action.field]: action.errorValue
        }
      };
    default:
      return state;
  }
};

export const useForm = (
  initialValues: RegisterState | ContactFormState | LoginState | BasicInfoType
) => {
  const [formValues, dispatch] = useReducer(formReducer, initialValues);

  const handleThrowError = (inputName: string, errorMessage: string) => {
    dispatch({
      type: ActionTypes.throwError,
      field: inputName,
      errorValue: errorMessage
    });
  };

  const { validateEmpty, validateEmail, validatePasswd } = useValidators(handleThrowError);

  const handleInputChange = (e: ChangeInputEvent) => {
    if (e.target.getAttribute('data-required') === 'true') {
      validateEmpty(e.target);
      if (e.target.type === 'email') validateEmail(e.target);
      if (e.target.type === 'password') validatePasswd(e.target);
    }

    dispatch({
      type: ActionTypes.inputChange,
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleClearForm = (initialValues: RegisterState) => {
    dispatch({ type: ActionTypes.clearValues, initialValues });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmitForm = (e: SubmitFormEvent, callbackSendForm: FnSendForm) => {
    e.preventDefault();
    let isFormValid;
    const formInputs = e.target.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input, textarea'
    );

    formInputs.forEach((input) => {
      if (input.getAttribute('data-required') === 'true') {
        validateEmpty(input);
        if (input.type === 'email') validateEmail(input);
        if (input.type === 'password') validatePasswd(input);
      }
    });

    const errorsMessages = e.target.querySelectorAll('p');
    errorsMessages.forEach((msg) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isFormValid = msg.innerHTML === '';
    });

    // const formState = {
    //   ...formInputs
    // };
    // console.log(formState);
    //
    // if (isFormValid) {
    //   callbackSendForm(formState);
    // }
  };

  return {
    formValues,
    handleInputChange,
    handleClearForm,
    handleThrowError,
    handleSubmitForm
  };
};
