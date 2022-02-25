import React, { useEffect } from 'react';
import Dashboard from 'views/Dashboard/Dashboard';
import { authMenuLinks } from 'data/authMenuLinks';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Guest from 'views/Guest/Guest';

const SimpleUser = () => {
  const [cookies] = useCookies(['user-token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies['user-token']) navigate('/app/register');
  }, []);

  if (cookies['user-token']) return <Dashboard menuLinks={authMenuLinks} />;
  else return <Guest />;
};

export default SimpleUser;
