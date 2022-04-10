import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Checkbox from 'components/atoms/Checkbox/Checkbox';
import { Input } from 'components/atoms/Input/Input';
import {
  InputWrapper,
  InputSpicyWrapper,
  InputPrizeWrapper,
  StyledForm,
  StyledSelect
} from 'components/molecules/CreateForms/CreateForms.styles';
import { BtnTypes } from 'types/BtnTypes';
import TextButton from 'components/atoms/TextButton/TextButton';
import { NativeSelect } from '@mui/material';
import addImage from 'assets/icons/add-image.svg';
import IconButton from 'components/atoms/IconButton/IconButton';
import SpicyLevel from 'components/atoms/SpicyLevel/SpicyLevel';
import ReactDOM from 'react-dom';
import FileInput from 'components/atoms/FileInput/FileInput';
import close from 'assets/icons/close.svg';
import { Category, Dish } from 'types/Foodtrucktypes';
import { SubmitFormEvent } from 'types/FormTypes';

type Props = {
  setAddDishFormVisibility: (prop: boolean) => void;
  dishCategories?: Category[];
  handleSendForm?: (e: SubmitFormEvent, spicyLevel: number, isSpicyCheck: boolean) => void;
  dish?: Dish;
  setIsShowImage?: (prop: boolean) => void;
};

const CreateDishForm = ({
  setAddDishFormVisibility,
  handleSendForm,
  dish,
  setIsShowImage,
  dishCategories
}: Props) => {
  // @ts-ignore
  const [isSpicyCheck, setIsSpicyCheck] = useState(dish?.SpicyLevel > 0);
  const [spicyLevel, setSpicyLevel] = useState(dish?.SpicyLevel ? dish.SpicyLevel : 0);
  const [isShowUploadImage, setIsShowUploadImage] = useState(false);
  const [dishCategory, setDishCategory] = useState(0);
  const body = document.querySelector('body');
  const uploadImageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dish?.DishCategory) {
      setDishCategory((dish?.DishCategory as number) + 1);
    }
  }, [dish]);

  const handleCloseUploadImage = () => {
    const uploadImage = uploadImageContainer.current as HTMLDivElement;
    uploadImage.classList.add('opacity-1', 'animate-hidden');
    uploadImage.classList.remove('opacity-0', 'animate-appear');

    setTimeout(() => {
      setIsShowUploadImage(false);
    }, 700);
  };

  return (
    <>
      <StyledForm
        className={dish ? 'my-5' : ''}
        onSubmit={(e: SubmitFormEvent) =>
          handleSendForm ? handleSendForm(e, spicyLevel, isSpicyCheck) : null
        }
      >
        <InputWrapper>
          <Checkbox
            className={'w-max'}
            label={'Napój'}
            opt={'drink'}
            isFormField
            checked={dish?.isDrink}
          />
        </InputWrapper>
        <InputWrapper>
          <label className="text-gold font-semibold cursor-pointer" htmlFor={'name'}>
            Danie
          </label>
          <Input
            id={'name'}
            name={'name'}
            className="!p-2 !font-normal rounded-md text-black border-none"
            type="text"
            placeholder={'Nazwa dania'}
            value={dish?.name}
            onChange={() => {}}
            data-required="true"
          />
        </InputWrapper>
        <InputWrapper>
          <label className="text-gold font-semibold cursor-pointer" htmlFor={'desc'}>
            Składniki
          </label>
          <Input
            id={'desc'}
            name={'desc'}
            className="!p-2 !font-normal rounded-md text-black border-none"
            placeholder={'pomidory San Marzano D.O.P, mozzarella, świeża bazylia ...'}
            type="text"
            value={dish?.description}
            onChange={() => {}}
          />
        </InputWrapper>
        <InputPrizeWrapper>
          <label className="text-gold font-semibold cursor-pointer" htmlFor={'prize'}>
            Cena
          </label>
          <Input
            id="prize"
            name="prize"
            className="!p-2 !font-normal rounded-md text-black border-none justify-self-start"
            type="text"
            placeholder={'25zł'}
            style={{ width: '80px' }}
            value={dish?.prize ? `${dish?.prize} zł` : ''}
            onChange={() => {}}
            data-required="true"
          />
        </InputPrizeWrapper>
        <InputSpicyWrapper>
          <Checkbox
            className={'!p-2 !pr-1 !pl-0 w-max !ml-5'}
            label={'Ostrość'}
            opt={'spicy'}
            isFormField
            // @ts-ignore
            checked={dish?.SpicyLevel > 0}
            handleChecked={(e: ChangeEvent<HTMLInputElement>) => setIsSpicyCheck(e.target.checked)}
          />
          <SpicyLevel spicyLevel={spicyLevel} readonly={!isSpicyCheck} />
        </InputSpicyWrapper>
        <div className={'row-start-4 row-end-6 col-start-2 grid items-center'}>
          {dish?.image ? (
            <img
              className="rounded-lg cursor-pointer"
              src={dish?.image}
              alt=""
              height={58}
              width={55}
              onClick={() => (setIsShowImage ? setIsShowImage(true) : null)}
            />
          ) : (
            <IconButton
              className="bg-gold p-3 rounded-md h-max w-max justify-self-center"
              imgClassName={'w-14'}
              svg={addImage}
              onClick={() => setIsShowUploadImage(true)}
            />
          )}
        </div>
        <InputWrapper>
          <label className="text-gold font-semibold cursor-pointer" htmlFor={'diet'}>
            Dieta
          </label>
          <NativeSelect
            id={'diet'}
            name={'diet'}
            defaultValue={dish?.VeganLevel ? dish.VeganLevel : 0}
            input={<StyledSelect />}
            IconComponent={(props) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26.658"
                height="15.37"
                viewBox="0 0 13.329 7.685"
                {...props}
                className={`!right-2 cursor-pointer ${props.className}`}
              >
                <path
                  id="Path_214"
                  data-name="Path 214"
                  d="M13.231.776,12.554.1a.338.338,0,0,0-.478,0L6.711,5.463a.064.064,0,0,1-.092,0L1.256.1A.338.338,0,0,0,.777.1L.1.776a.339.339,0,0,0,0,.478l5.62,5.62c.009.011.013.024.023.035l.678.677a.356.356,0,0,0,.49,0l.677-.677c.01-.011.014-.024.023-.035l5.62-5.62a.338.338,0,0,0,0-.478"
                  transform="translate(-0.001)"
                  fill="#ffc92b"
                />
              </svg>
            )}
            data-required="true"
          >
            <option value={0}>Mięsna</option>
            <option value={1}>Wegetariańska</option>
            <option value={2}>Wegańska</option>
          </NativeSelect>
        </InputWrapper>
        <InputWrapper>
          <label className="text-gold font-semibold cursor-pointer" htmlFor={'category'}>
            Kategoria
          </label>
          <NativeSelect
            id="category"
            name="category"
            value={dishCategory}
            onChange={(e) => setDishCategory(parseInt(e.target.value))}
            input={<StyledSelect />}
            IconComponent={(props) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26.658"
                height="15.37"
                viewBox="0 0 13.329 7.685"
                {...props}
                className={`!right-2 cursor-pointer ${props.className}`}
              >
                <path
                  id="Path_214"
                  data-name="Path 214"
                  d="M13.231.776,12.554.1a.338.338,0,0,0-.478,0L6.711,5.463a.064.064,0,0,1-.092,0L1.256.1A.338.338,0,0,0,.777.1L.1.776a.339.339,0,0,0,0,.478l5.62,5.62c.009.011.013.024.023.035l.678.677a.356.356,0,0,0,.49,0l.677-.677c.01-.011.014-.024.023-.035l5.62-5.62a.338.338,0,0,0,0-.478"
                  transform="translate(-0.001)"
                  fill="#ffc92b"
                />
              </svg>
            )}
            data-required="true"
          >
            <option value={0}>None</option>
            {dishCategories?.map(({ name }, index) => {
              return (
                <option value={index + 1} key={`category-${name}`}>
                  {name}
                </option>
              );
            })}
          </NativeSelect>
        </InputWrapper>
        <div className={'my-5 col-start-1 col-end-3 w-full grid grid-flow-col gap-8'}>
          <TextButton
            type={BtnTypes.SUBMIT}
            classNames="text-white bg-gold font-medium border-none"
          >
            Zapisz
          </TextButton>
          <TextButton
            classNames="text-white bg-gold font-medium border-none"
            onClick={() => setAddDishFormVisibility(false)}
          >
            Anuluj
          </TextButton>
        </div>
      </StyledForm>
      {ReactDOM.createPortal(
        <>
          {isShowUploadImage ? (
            <div
              className="fixed w-full h-full bg-darkBlack/40 z-40 bottom-0 grid content-center justify-items-center opacity-0 animate-appear"
              ref={uploadImageContainer}
            >
              <IconButton
                svg={close}
                className="absolute h-12 w-12 top-2 right-2"
                onClick={handleCloseUploadImage}
              />
              <FileInput
                style={{ maxWidth: '400px', width: '100%' }}
                label={'Wybierz zdjęcie'}
                updateFilesCb={() => {}}
                /*@ts-ignore*/
                accept="image/png, image/jpeg"
              />
            </div>
          ) : (
            ''
          )}
        </>,
        body as HTMLBodyElement
      )}
    </>
  );
};

export default CreateDishForm;
