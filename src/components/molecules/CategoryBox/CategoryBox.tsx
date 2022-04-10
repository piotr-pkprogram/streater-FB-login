import React, { useState } from 'react';
import IconButton from 'components/atoms/IconButton/IconButton';
import whiteEdit from 'assets/icons/white-edit-small.svg';
import { Category } from 'types/Foodtrucktypes';
import { Wrapper } from './CategoryBox.styles';
import CreateCategoryForm from 'components/molecules/CreateForms/CreateCategoryForm';

const CategoryBox = ({ category: { name, description } }: { category: Category }) => {
  const [isEdit, setIsEdit] = useState(false);

  return !isEdit ? (
    <Wrapper>
      <span>{name}</span>
      {description ? <p className={'col-start-1'}>{description}</p> : ''}
      <IconButton
        className={`bg-gold p-2 rounded-sm w-max h-max ${
          description ? 'row-start-1 row-end-3 self-start' : ''
        } col-start-2 justify-self-end`}
        imgClassName={`w-4`}
        svg={whiteEdit}
        onClick={() => setIsEdit(true)}
      />
    </Wrapper>
  ) : (
    <CreateCategoryForm setAddCategoryFormVisibility={setIsEdit} category={{ name, description }} />
  );
};

export default CategoryBox;
