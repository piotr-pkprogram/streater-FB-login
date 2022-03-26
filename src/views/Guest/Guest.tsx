import React, { useEffect } from 'react';
import Dashboard from 'views/Dashboard/Dashboard';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Guest = () => {
  const [cookies] = useCookies(['user-token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies['user-token']) {
      if (cookies['user-token'].userType === 'simple-user') navigate('/app/user-simple-dashboard');
      else if (cookies['user-token'].userType === 'foodtrucker')
        navigate('/app/foodtrucker-dashboard');
    }
  }, [cookies['user-token']]);

  return <Dashboard />;
};

export default Guest;
