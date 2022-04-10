import React, { useRef, useState } from 'react';
import { Category, Dish } from 'types/Foodtrucktypes';
import IconButton from 'components/atoms/IconButton/IconButton';
import whiteEdit from 'assets/icons/white-edit.svg';
import addImage from 'assets/icons/add-image.svg';
import SpicyLevel from 'components/atoms/SpicyLevel/SpicyLevel';
import { Wrapper, SpicyWrapper, PrizeWrapper } from './DishBox.styles';
import ReactDOM from 'react-dom';
import FileInput from 'components/atoms/FileInput/FileInput';
import close from 'assets/icons/close.svg';
import CreateDishForm from 'components/molecules/CreateForms/CreateDishForm';
import TextButton from 'components/atoms/TextButton/TextButton';

const DishBox = ({ dish, dishCategories }: { dish: Dish; dishCategories: Category[] }) => {
  const [isShowUploadImage, setIsShowUploadImage] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const uploadImageContainer = useRef<HTMLDivElement>(null);
  const showImageContainer = useRef<HTMLDivElement>(null);
  const body = document.querySelector('body');

  const handleCloseUploadImage = () => {
    const uploadImage = uploadImageContainer.current as HTMLDivElement;
    uploadImage.classList.add('opacity-1', 'animate-hidden');
    uploadImage.classList.remove('opacity-0', 'animate-appear');

    setTimeout(() => {
      setIsShowUploadImage(false);
    }, 700);
  };

  const handleChangeImage = async () => {
    handleCloseShowImage();
    await fetch(dish.image as string).then((res) => {
      res.blob().then((myBlob) => {
        const url = dish.image as string;
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const file = new File([myBlob], filename);
        setImageFile(file);
      });
    });
    setIsShowUploadImage(true);
  };

  const handleCloseShowImage = () => {
    const showImage = showImageContainer.current as HTMLDivElement;
    showImage.classList.add('opacity-1', 'animate-hidden');
    showImage.classList.remove('opacity-0', 'animate-appear');

    setTimeout(() => {
      setIsShowImage(false);
    }, 700);
  };

  return (
    <>
      {!isEdit ? (
        <Wrapper>
          <div className="flex flex-wrap gap-2">
            <p className="font-medium text-lg">{dish.name}</p>
            <p>{dish.description}</p>
            <PrizeWrapper>
              <span className="text-gold font-semibold ml-2">{dish.prize}&nbsp;zł</span>
              {dish.VeganLevel > 0 ? (
                <span>{dish.VeganLevel === 1 ? 'Wegetariańskie' : 'Wegańskie'}</span>
              ) : (
                ''
              )}
            </PrizeWrapper>
            <SpicyWrapper>
              {dish.SpicyLevel > 0 ? (
                <span>
                  <SpicyLevel spicyLevel={dish.SpicyLevel} readonly />
                </span>
              ) : (
                ''
              )}
              <span>{dishCategories[dish.DishCategory as number].name}</span>
            </SpicyWrapper>
          </div>
          <div className="grid gap-2 items-center">
            <IconButton
              className="bg-gold p-3 rounded-md"
              svg={whiteEdit}
              onClick={() => setIsEdit(true)}
            />
            {dish.image ? (
              <img
                className="rounded-lg cursor-pointer"
                src={dish.image}
                alt=""
                height={58}
                width={55}
                onClick={() => setIsShowImage(true)}
              />
            ) : (
              <IconButton
                className="bg-gold p-3 rounded-md"
                svg={addImage}
                onClick={() => setIsShowUploadImage(true)}
              />
            )}
          </div>
        </Wrapper>
      ) : (
        <CreateDishForm
          setAddDishFormVisibility={setIsEdit}
          setIsShowImage={setIsShowImage}
          dish={dish}
          dishCategories={dishCategories}
        />
      )}
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
                imageFile={imageFile}
                /*@ts-ignore*/
                accept="image/png, image/jpeg"
              />
            </div>
          ) : (
            ''
          )}
          {dish.image && isShowImage ? (
            <div
              className="fixed w-full h-full bg-darkBlack/40 z-40 bottom-0 grid content-center justify-items-center opacity-0 animate-appear"
              ref={showImageContainer}
            >
              <IconButton
                svg={close}
                className="absolute h-12 w-12 top-2 right-2"
                onClick={handleCloseShowImage}
              />
              <img
                className="rounded-lg cursor-pointer"
                style={{ maxHeight: '530px' }}
                src={dish.image}
                alt=""
              />
              {isEdit ? (
                <TextButton
                  classNames="text-white bg-gold font-medium border-none mt-5"
                  onClick={handleChangeImage}
                >
                  Zmień Zdjęcie
                </TextButton>
              ) : (
                ''
              )}
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

export default DishBox;
