import React, { useEffect, useState } from 'react';
import Dashboard from 'views/Dashboard/Dashboard';
import { userMenuLinks } from 'data/userMenuLinks';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Guest from 'views/Guest/Guest';
import axios from 'axios';

export type UserData = {
  name: string;
  token: string;
  email: string;
};

const SimpleUser = () => {
  const [cookies] = useCookies(['user-token']);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    if (!cookies['user-token']) navigate('/app/login');
    else {
      (async () => {
        await axios
          .post('http://77.55.217.106:1235/api/Auth/login', {
            Username: 'string',
            Password: 'string'
          })
          .then((res) => setUserData(res.data))
          .catch((err) => console.log(err));
      })();
    }
  }, [cookies['user-token']]);

  if (cookies['user-token']) return <Dashboard menuLinks={userMenuLinks} userData={userData} />;
  else return <Guest />;
};

export default SimpleUser;
