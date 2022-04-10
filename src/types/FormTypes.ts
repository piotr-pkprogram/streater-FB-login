import { ChangeEvent } from 'react';

interface ErrorsInputs extends Object {
  name?: string;
  surname?: string;
  email?: string;
  topic?: string;
  password?: string;
  foodtruckName?: string;
  city?: string;
  contactPhone?: string;
  message?: string;
  kitchen?: string;
  desc?: string;
}

export type RegisterState = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  foodtruckName?: string;
  city?: string;
  contactPhone?: string;
  message?: string;
  errorsInputs?: ErrorsInputs;
};

export type LoginState = {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
  errorsInputs?: ErrorsInputs;
};

export type ContactFormState = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  password?: string;
  errorsInputs?: ErrorsInputs;
};

export type BasicInfoType = {
  name?: string;
  contactPhone?: string;
  city?: string;
  kitchen?: string;
  desc?: string;
  errorsInputs?: ErrorsInputs;
};

export enum ActionTypes {
  inputChange = 'INPUT CHANGE',
  clearValues = 'CLEAR VALUES',
  throwError = 'THROW ERROR'
}

export type ReducerAction = {
  type: ActionTypes;
  field?: string | number | symbol | any;
  value?: string;
  initialValues?: RegisterState;
  errorValue?: string;
};

export interface ChangeInputEvent extends ChangeEvent {
  target: HTMLInputElement;
}

export interface SubmitFormEvent extends SubmitEvent {
  target: HTMLFormElement;
}

export type FnSendForm = (formState: RegisterState | LoginState) => void;

export type HandleSubmitForm = (e: SubmitFormEvent, callbackSendForm: FnSendForm) => void;

export type ResError = {
  status: number;
  isOfflineError: boolean;
};
