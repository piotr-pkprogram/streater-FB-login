import login from 'assets/img/login.svg';
import register from 'assets/img/register.svg';
import events from 'assets/img/events.svg';
import contact from 'assets/img/contact.svg';
import about from 'assets/img/about.svg';
import { v4 as uuidv4 } from 'uuid';

export const menuLinks = [
  {
    id: uuidv4(),
    to: '/app/login',
    text: 'Zaloguj',
    svg: login
  },
  {
    id: uuidv4(),
    to: '/app/choose-login',
    text: 'Zarejestruj',
    svg: register
  },
  {
    id: uuidv4(),
    to: '/app/events',
    text: 'Wydarzenia',
    svg: events
  },
  {
    id: uuidv4(),
    to: '/app/contact',
    text: 'Kontakt',
    svg: contact
  },
  {
    id: uuidv4(),
    to: '/app/about-us',
    text: 'O Aplikacji',
    svg: about
  }
];
