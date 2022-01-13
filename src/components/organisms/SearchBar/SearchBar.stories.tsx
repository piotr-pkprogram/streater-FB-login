import React from 'react';
import SearchBar from './SearchBar';

export default {
  title: 'components/organisms/SearchBar',
  component: SearchBar
};

const Template = (args: object) => (
  <SearchBar isMapVisible={false} switchListMapVisible={() => {}} {...args} />
);

export const Default = Template.bind([]);
