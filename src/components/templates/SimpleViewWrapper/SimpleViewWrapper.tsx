import React from 'react';
import ReactDOM from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { notAuthMenuLinks } from 'data/notAuthMenuLinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import logo from 'assets/img/icon.svg';
import { StyledIcon, ImageWrapper, Wrapper } from './SimpleViewWrapper.styles';

type Props = {
  children: JSX.Element | JSX.Element[];
  img: string;
};

const SimpleViewWrapper = ({ children, img }: Props) => {
  const body = document.querySelector('body') as HTMLBodyElement;

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <PhoneMenu>
            {notAuthMenuLinks.map(({ id, to, text, svg }) => (
              <MenuLink key={id} to={to} text={text} svg={svg} />
            ))}
          </PhoneMenu>
          <StyledIcon svg={logo} isRouterLink to="/" />
        </>,
        body
      )}
      <ImageWrapper
        style={{
          backgroundImage: `url(${img})`
        }}
      />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default SimpleViewWrapper;
