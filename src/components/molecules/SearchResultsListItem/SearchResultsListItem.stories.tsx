import React from 'react';
import SearchResultsListItem from './SearchResultsListItem';

export default {
  title: 'components/molecules/SearchResultsListItem',
  component: SearchResultsListItem
};

const Template = (args: object) => (
  <SearchResultsListItem textValue={'ul. Sezamkowa 10'} city={' Wrocław'} {...args} />
);

export const Default = Template.bind([]);
