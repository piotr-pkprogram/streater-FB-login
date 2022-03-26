import React, { useEffect, useRef, useState } from 'react';
import SimpleViewsLayout from 'components/templates/SimpleViewsLayout/SimpleViewsLayout';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AddFoodTrucks, Foodtrucks, Wrapper } from './MyFoodtrucks.styles';
import plus from 'assets/icons/plus.svg';
import FoodtruckBox from 'components/molecules/FoodtruckBox/FoodtruckBox';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import CreateFoodtruckMenu from 'components/molecules/CreateFoodtruckMenu/CreateFoodtruckMenu';
import { FoodtruckState } from 'types/Foodtrucktypes';

const foodtruck = {
  id: uuidv4(),
  name: 'Bafra Kebab Smolec',
  description: 'Foodtruck z Kebabem Smolec',
  location: {
    coordinates: {
      longitude: 16.9068851,
      latitude: 51.0851009
    },
    address: {
      country: 'Poland',
      city: 'Smolec',
      street: 'Bukowa',
      zipcode: '55-080',
      houseNumber: 1,
      district: 'Dolnośląskie'
    }
  },
  openingTime: {
    openingHours: {
      openingHour: 10,
      openingMinute: 0,
      closingHour: 21,
      closingMinute: 0
    },
    openingWeekdays: [
      {
        isOpen: true,
        weekDay: 0
      },
      {
        isOpen: true,
        weekDay: 1
      },
      {
        isOpen: true,
        weekDay: 2
      },
      {
        isOpen: true,
        weekDay: 3
      },
      {
        isOpen: true,
        weekDay: 4
      },
      {
        isOpen: true,
        weekDay: 6
      }
    ]
  },
  menu: {
    dish: [
      {
        name: 'Kebab Tortila Mały',
        description: 'pomidory San Marzano D.O.P, mozzarella, świeża bazylia',
        prize: 13.0,
        weight: 20,
        volume: 2,
        quantity: 20,
        isAvailable: true
      },
      {
        name: 'Tortila Falafel',
        description: 'pomidory San Marzano D.O.P, mozzarella, salami napoli',
        prize: 16.0,
        weight: 20,
        volume: 2,
        quantity: 20,
        isAvailable: true
      },
      {
        name: 'Kebab w bułce',
        description: '',
        prize: 16.0,
        weight: 20,
        volume: 2,
        quantity: 20,
        isAvailable: true
      }
    ],
    kitchenType: [1, 2, 3]
  },
  pictures: ['string'],
  isOpen: true,
  comments: [
    {
      title: 'Is awesome climate',
      body: 'Lorem ipsum',
      author: 'Piotr Kułakowski',
      rating: 4,
      additionDate: new Date('2022-01-23T18:57:58.088Z')
    }
  ],
  rating: 4,
  link: 'befra-kebab-smolec'
};

const MyFoodtrucks = () => {
  const body = document.querySelector('body');
  const [cookies] = useCookies(['user-token']);
  const [currentFoodtruck, setCurrentFoodtruck] = useState<FoodtruckState | null>(null);
  const navigate = useNavigate();
  const creatMenu = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!cookies['user-token']) navigate('/app/login');
  }, [cookies['user-token']]);

  const onEditMenuOpen = () => {
    setCurrentFoodtruck(foodtruck);
    setTimeout(() => {
      const menu = creatMenu.current as HTMLDivElement;
      menu.classList.remove('translate-y-full');
      menu.classList.add('animate-down_to_top');
      setTimeout(() => {
        menu.classList.add('translate-y-0');
        menu.classList.remove('animate-down_to_top');
      }, 400);
    }, 200);
  };

  const onEditMenuClose = () => {
    const menu = creatMenu.current as HTMLDivElement;
    menu.classList.remove('translate-y-0');
    menu.classList.add('animate-top_to_down');
    setTimeout(() => {
      menu.classList.add('translate-y-full');
      menu.classList.remove('animate-top_to_down');
      setCurrentFoodtruck(null);
    }, 400);
  };

  return (
    <>
      <SimpleViewsLayout>
        <Wrapper>
          <Foodtrucks />
          <p className="font-semibold text-lg mb-20">Moje Foodtrucki</p>
          <div className="grid gap-8 justify-items-center">
            <FoodtruckBox foodtruck={foodtruck} onEditClick={onEditMenuOpen} />
            <AddFoodTrucks>
              <p className="text-center">Dodaj kolejnego foodtrucka</p>
              <img src={plus} alt="" />
            </AddFoodTrucks>
          </div>
        </Wrapper>
      </SimpleViewsLayout>
      {currentFoodtruck
        ? ReactDOM.createPortal(
            <CreateFoodtruckMenu
              foodtruck={currentFoodtruck}
              onCloseClick={onEditMenuClose}
              ref={creatMenu}
            />,
            body as HTMLBodyElement
          )
        : ''}
    </>
  );
};

export default MyFoodtrucks;
