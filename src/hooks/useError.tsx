import React, { useCallback, useContext, useState } from 'react';

const ErrorContext = React.createContext({});

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState(null);

  const dispatchError = useCallback((message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 7000);
  }, []);

  return <ErrorContext.Provider value={{ error, dispatchError }}>{children}</ErrorContext.Provider>;
};

export const useError = () => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw Error('useError needs to be used inside ErrorContext');
  }

  return errorContext;
};
