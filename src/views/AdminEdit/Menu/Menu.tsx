import React, { ChangeEvent, useState } from 'react';
import { Category, FoodtruckState } from 'types/Foodtrucktypes';
import { Box, NativeSelect, Tab, Tabs } from '@mui/material';
import { AddDishes, AddCategory, Warning } from 'views/AdminEdit/Menu/Menu.styles';
import DishBox from 'components/molecules/DishBox/DishBox';
import CreateDishForm from 'components/molecules/CreateForms/CreateDishForm';
import { SubmitFormEvent } from 'types/FormTypes';
import CategoryBox from 'components/molecules/CategoryBox/CategoryBox';
import CreateCategoryForm from 'components/molecules/CreateForms/CreateCategoryForm';
import warningIcon from 'assets/icons/warning.svg';
import { InputWrapper, StyledSelect } from 'components/molecules/CreateForms/CreateForms.styles';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';
import IconButton from 'components/atoms/IconButton/IconButton';
import trash from 'assets/icons/trash.svg';
import { v4 as uuidv4 } from 'uuid';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className={className}>
          {children}
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const Menu = ({ foodtruck }: { foodtruck: FoodtruckState }) => {
  const [value, setValue] = React.useState(0);
  const [addDishFormVisibility, setAddDishFormVisibility] = useState(false);
  const [addCategoryFormVisibility, setAddCategoryFormVisibility] = useState(false);
  const [recommendedDishes, setRecommendedDishes] = useState<object>({
    0: null,
    1: null
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmitDishForm = (e: SubmitFormEvent, spicyLevel: number, isSpicyCheck: boolean) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleSubmitCategoryForm = (e: SubmitFormEvent) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleChangeRecommended = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const option = Array.from(e.target.options).find((option) => {
      return option.selected;
    });

    const newRecommended = recommendedDishes;
    // @ts-ignore
    newRecommended[index] = option?.value;

    setRecommendedDishes(newRecommended);
  };

  const handleAddRecommended = () => {
    const keys = Object.keys(recommendedDishes);

    const newRecommended = {
      ...recommendedDishes,
      [keys.length]: null
    };

    setRecommendedDishes(newRecommended);
  };

  const handleDeleteRecommended = (index: number) => {
    // @ts-ignore
    delete recommendedDishes[`${index}`];

    let values = Object.values(recommendedDishes);
    values = values.sort((a: null | string, b: null | string) =>
      a !== null ? -1 : b !== null ? 0 : 1
    );

    const newRecommended = {};
    for (let i = 0; i < values.length; i++) {
      // @ts-ignore
      newRecommended[i] = values[i];
    }
    setRecommendedDishes(newRecommended);
  };

  return (
    <>
      <div className="text-white overflow-auto relative" style={{ maxHeight: '740px' }}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          className={'sticky top-0 bg-lightBlack z-10'}
        >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Menu" {...a11yProps(0)} />
            <Tab label="Kategorie" {...a11yProps(1)} />
            <Tab label="Polecane" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {!addDishFormVisibility ? (
            <AddDishes onClick={() => setAddDishFormVisibility(true)}>
              <p className="text-center">Dodaj nowe danie</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
                <g
                  id="Icon_feather-plus"
                  data-name="Icon feather-plus"
                  transform="translate(1.5 1.5)"
                >
                  <path
                    id="Path_187"
                    data-name="Path 187"
                    d="M18,7.5v16"
                    transform="translate(-10 -7.5)"
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                  <path
                    id="Path_188"
                    data-name="Path 188"
                    d="M7.5,18h16"
                    transform="translate(-7.5 -10)"
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </g>
              </svg>
            </AddDishes>
          ) : (
            <CreateDishForm
              setAddDishFormVisibility={setAddDishFormVisibility}
              handleSendForm={handleSubmitDishForm}
              dishCategories={foodtruck.menu?.dishCategories}
            />
          )}
          {foodtruck.menu.dish.map((dish, index) => (
            <DishBox
              dish={dish}
              key={`dish-${index}`}
              dishCategories={foodtruck.menu.dishCategories as Category[]}
            />
          ))}
        </TabPanel>
        <TabPanel className={`grid justify-items-center`} value={value} index={1}>
          {!addCategoryFormVisibility ? (
            <AddCategory onClick={() => setAddCategoryFormVisibility(true)}>
              <p className="text-center">Dodaj kategorię</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
                <g
                  id="Icon_feather-plus"
                  data-name="Icon feather-plus"
                  transform="translate(1.5 1.5)"
                >
                  <path
                    id="Path_187"
                    data-name="Path 187"
                    d="M18,7.5v16"
                    transform="translate(-10 -7.5)"
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                  <path
                    id="Path_188"
                    data-name="Path 188"
                    d="M7.5,18h16"
                    transform="translate(-7.5 -10)"
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </g>
              </svg>
            </AddCategory>
          ) : (
            <CreateCategoryForm
              setAddCategoryFormVisibility={setAddCategoryFormVisibility}
              handleSendForm={handleSubmitCategoryForm}
            />
          )}
          {foodtruck.menu.dishCategories?.map((category) => {
            return <CategoryBox category={category} key={`category-${category.name}`} />;
          })}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Warning>
            <img
              className="absolute top-2 left-2"
              src={warningIcon}
              alt=""
              style={{ transform: 'rotateZ(-12deg)' }}
            />
            <p>Dodaj co najmniej dwa polecane dania, by zwiększyć popularność swojego foodtrucka</p>
          </Warning>
          <div className="grid gap-4 mt-4">
            {Object.values(recommendedDishes).map((id, index) => (
              <InputWrapper key={`recommended-${uuidv4()}`}>
                <label className="text-gold font-semibold cursor-pointer" htmlFor={'category'}>
                  Polecane {index + 1}
                </label>
                <NativeSelect
                  id="dish"
                  name="dish"
                  input={<StyledSelect />}
                  defaultValue={id ? id : 0}
                  onChange={(e) => handleChangeRecommended(e, index)}
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
                  <option value={0}>Nazwa Dania</option>
                  {foodtruck.menu.dish?.map(({ name, id }) => {
                    return (
                      <option
                        value={id}
                        key={`category-${name}`}
                        disabled={Object.values(recommendedDishes).includes(id)}
                      >
                        {name}
                      </option>
                    );
                  })}
                </NativeSelect>
                <IconButton
                  className={'w-max justify-self-center'}
                  imgClassName={'w-6'}
                  svg={trash}
                  onClick={() => handleDeleteRecommended(index)}
                />
              </InputWrapper>
            ))}
          </div>
          <div className={'my-5 col-start-1 col-end-3 w-full grid grid-flow-col gap-8'}>
            <TextButton
              type={BtnTypes.SUBMIT}
              classNames="text-white bg-gold font-medium border-none"
            >
              Zapisz
            </TextButton>
            <TextButton
              classNames="text-white bg-gold font-medium border-none"
              onClick={handleAddRecommended}
              disabled={Object.keys(recommendedDishes).length >= foodtruck.menu.dish.length}
            >
              Dodaj
            </TextButton>
          </div>
        </TabPanel>
      </div>
    </>
  );
};

export default Menu;
