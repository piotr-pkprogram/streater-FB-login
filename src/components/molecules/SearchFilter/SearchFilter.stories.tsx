import React from 'react';
import SearchFilter from './SearchFilter';
import { SortModes } from 'hooks/useFoodtrucks';

export default {
  title: 'components/molecules/SearchFilter',
  component: SearchFilter
};

const Template = (args: object) => (
  <SearchFilter
    setFilter={() => {}}
    setVisible={() => {}}
    SortMode={SortModes.CHOOSE}
    setSortMode={() => {}}
    {...args}
  />
);

export const Default = Template.bind([]);
