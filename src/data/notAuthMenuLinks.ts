import login from 'assets/icons/login.svg';
import register from 'assets/icons/register.svg';
import events from 'assets/icons/events.svg';
import contact from 'assets/icons/contact.svg';
import about from 'assets/icons/about.svg';
import { v4 as uuidv4 } from 'uuid';

export const notAuthMenuLinks = [
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
