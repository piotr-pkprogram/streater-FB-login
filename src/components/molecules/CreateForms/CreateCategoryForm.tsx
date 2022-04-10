import React from 'react';
import { SubmitFormEvent } from 'types/FormTypes';
import { Category } from 'types/Foodtrucktypes';
import { InputWrapper, StyledForm } from 'components/molecules/CreateForms/CreateForms.styles';
import { Input } from 'components/atoms/Input/Input';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';

type Props = {
  setAddCategoryFormVisibility: (prop: boolean) => void;
  handleSendForm?: (e: SubmitFormEvent) => void;
  category?: Category;
};

const CreateCategoryForm = ({ category, handleSendForm, setAddCategoryFormVisibility }: Props) => (
  <StyledForm
    className={`px-3 pt-8 ${category ? 'my-5' : ''}`}
    onSubmit={(e: SubmitFormEvent) => (handleSendForm ? handleSendForm(e) : null)}
  >
    <InputWrapper>
      <label className="text-gold font-medium cursor-pointer" htmlFor={'category'}>
        Kategoria
      </label>
      <Input
        id={'category'}
        name={'category'}
        className="!p-2 !font-normal rounded-sm text-black border-none"
        type="text"
        placeholder={'Kategoria'}
        value={category?.name}
        data-required="true"
      />
    </InputWrapper>
    <InputWrapper>
      <label className="text-gold font-medium cursor-pointer self-start" htmlFor={'desc'}>
        Opis
      </label>
      <Input
        as="textarea"
        id={'desc'}
        name={'desc'}
        className="!p-2 !font-normal rounded-sm text-black border-none"
        placeholder={'Składniki. Vestibulum laoreet quis ipsum a feugiat ...'}
        type="text"
        value={category?.description}
      />
    </InputWrapper>
    <div className={'my-5 col-start-1 col-end-3 w-full grid grid-flow-col gap-8'}>
      <TextButton type={BtnTypes.SUBMIT} classNames="text-white bg-gold font-medium border-none">
        Zapisz
      </TextButton>
      <TextButton
        classNames="text-white bg-gold font-medium border-none"
        onClick={() => setAddCategoryFormVisibility(false)}
      >
        Anuluj
      </TextButton>
    </div>
  </StyledForm>
);

export default CreateCategoryForm;
