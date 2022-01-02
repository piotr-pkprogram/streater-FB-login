import React from 'react';
import { ModalWrapper } from './Modal.styled';

type HandleCloseFn = (isModalOpen: boolean) => void;

type Props = {
  handleClose: HandleCloseFn;
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
};

const Modal = ({ handleClose, isOpen, children }: Props) => {
  return (
    <ModalWrapper
      appElement={document.getElementById('root')}
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      {children}
    </ModalWrapper>
  );
};

export default Modal;
