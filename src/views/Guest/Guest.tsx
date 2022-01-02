import React from 'react';
import Modal from 'components/organisms/Modal/Modal';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import useModal from 'hooks/useModal';
import { StyledIcon } from './Guest.styles';
import logo from 'assets/img/logo-white.svg';

const Guest = () => {
  const { isOpen, handleCloseModal } = useModal(true);

  return (
    <>
      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        <SearchBar />
        <StyledIcon svg={logo} />
      </Modal>
    </>
  );
};

export default Guest;
