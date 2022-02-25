import whiteHeart from 'assets/img/white-awesome-heart.png';
import account from 'assets/img/account.png';
import events from 'assets/img/events.svg';
import contact from 'assets/img/contact.svg';
import about from 'assets/img/about.svg';
import { v4 as uuidv4 } from 'uuid';

export const authMenuLinks = [
  {
    id: uuidv4(),
    to: '/app/favorites-foodtrucks',
    text: 'Ulubione Foodtrucki',
    svg: whiteHeart
  },
  {
    id: uuidv4(),
    to: '/app/my-account',
    text: 'Moje Konto',
    svg: account
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
