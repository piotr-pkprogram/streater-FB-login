import React from 'react';
import FileInput from './FileInput';

export default {
  title: 'components/atoms/FileInput',
  component: FileInput
};

const Template = (args: object) => (
  <FileInput
    updateFilesCb={function (filesAsArray: File[]): void {
      throw new Error('Function not implemented.');
    }}
    label={'Wybierz nowe Zdjęcie'}
    {...args}
  />
);

export const Default = Template.bind([]);
