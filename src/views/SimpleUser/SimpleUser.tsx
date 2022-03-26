import React, { useEffect } from 'react';
import Dashboard from 'views/Dashboard/Dashboard';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Guest from 'views/Guest/Guest';

export type UserData = {
  name: string;
  token: string;
  email: string;
};

const SimpleUser = () => {
  const [cookies] = useCookies(['user-token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies['user-token']) navigate('/app/login');
  }, [cookies['user-token']]);

  if (cookies['user-token']) return <Dashboard />;
  else return <Guest />;
};

export default SimpleUser;
