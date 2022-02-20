import React from 'react';
import EventsSearchBar from './EventsSearchBar';

export default {
  title: 'components/organisms/EventsSearchBar',
  component: EventsSearchBar
};

const Template = (args: object) => <EventsSearchBar {...args} />;

export const Default = Template.bind([]);
