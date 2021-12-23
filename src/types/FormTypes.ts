import { ChangeEvent } from 'react';

interface ErrorsInputs extends Object {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}

export type RegisterState = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  errorsInputs?: ErrorsInputs;
};

export type LoginState = {
  email?: string;
  password?: string;
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
