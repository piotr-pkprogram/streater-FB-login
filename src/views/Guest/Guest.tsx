import React, { useEffect } from 'react';
import Dashboard from 'views/Dashboard/Dashboard';
import { notAuthMenuLinks } from 'data/notAuthMenuLinks';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Guest = () => {
  const [cookies] = useCookies(['user-token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies['user-token']) {
      if (cookies['user-token'].userType === 'simple-user') navigate('/app/user-simple-dashboard');
      else navigate('/app/foodtrucker-dashboard');
    }
  }, [cookies['user-token']]);

  return <Dashboard menuLinks={notAuthMenuLinks} />;
};

export default Guest;
