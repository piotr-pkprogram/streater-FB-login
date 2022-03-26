import whiteHeart from 'assets/icons/white-awesome-heart.png';
import account from 'assets/icons/account.png';
import events from 'assets/icons/events.svg';
import contact from 'assets/icons/contact.svg';
import about from 'assets/icons/about.svg';
import foodtruck from 'assets/icons/foodtruck.svg';
import whiteLocation from 'assets/icons/Icon-metro-location.svg';
import star from 'assets/icons/star.svg';
import { v4 as uuidv4 } from 'uuid';

export const foodtruckerMenuLinks = [
  {
    id: uuidv4(),
    to: '/app/my-account-foodtrucker',
    text: 'Moje Konto',
    svg: account
  },
  {
    id: uuidv4(),
    to: '/app/my-foodtrucks',
    text: 'Moje Foodtrucki',
    svg: foodtruck
  },
  {
    id: uuidv4(),
    to: '/app/foodtruckId/location',
    text: 'Edytuj lokalizację foodtrucka',
    svg: whiteLocation
  },
  {
    id: uuidv4(),
    to: '/app/foodtruckId/reviews',
    text: 'Moje Konto',
    svg: star
  },
  {
    id: uuidv4(),
    to: '/app/favorites-foodtrucks',
    text: 'Ulubione Foodtrucki',
    svg: whiteHeart
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
