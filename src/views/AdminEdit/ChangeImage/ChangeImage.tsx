import React from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import events from 'assets/img/events1.jpg';
import FileInput from 'components/atoms/FileInput/FileInput';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';

const ChangeImage = ({ foodtruck }: { foodtruck: FoodtruckState }) => (
  <div className="text-white">
    <p className="text-lg font-medium mb-2">Edytuj Zdjęcie</p>
    <img src={foodtruck.image ? foodtruck.image : events} alt="" />
    <FileInput
      updateFilesCb={function (filesAsArray: File[]): void {
        console.log('Function not implemented.');
      }}
      label={'Wybierz nowe Zdjęcie'}
      // @ts-ignore
      name="foodtruck-image"
      accept="image/png, image/jpeg"
    />
    <TextButton
      type={BtnTypes.SUBMIT}
      isRouterLink
      classNames="text-white bg-gold font-medium w-full"
      to="/app/my-foodtrucks"
    >
      Zapisz
    </TextButton>
  </div>
);

export default ChangeImage;
