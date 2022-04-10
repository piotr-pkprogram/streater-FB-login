import React from 'react';
import { Response } from 'components/atoms/ResponseP/ResponseP.styles';
import { ResError } from 'types/FormTypes';
import check from 'assets/icons/check.png';
import cancel from 'assets/icons/cancel.png';

type Props = {
  isSuccess: boolean;
  message: string;
  error?: ResError;
};

const ResponseP = ({
  isSuccess,
  error,
  message,
  ...props
}: Props & React.HTMLAttributes<HTMLParagraphElement>) => {
  if (isSuccess)
    return (
      <Response id="response" {...props}>
        <img className={'w-4'} src={check} alt={''} />
        {message}
      </Response>
    );
  else if (error?.isOfflineError)
    return (
      <Response id="response" className={`!text-red-500 !border-red-500`} {...props}>
        <img className={'w-4'} src={cancel} alt={''} />
        Brak połączenia. Prosimy połączyć się z internetem i wysłać kontakt ponownie.
      </Response>
    );
  else
    return (
      <Response id="response" className={`!text-red-500 !border-red-500`} {...props}>
        <img className={'w-4'} src={cancel} alt={''} />
        Wystąpił błąd {error?.status ? error.status : 500}. Proszę sprubować wysłać kontakt później.
      </Response>
    );
};

export default ResponseP;
