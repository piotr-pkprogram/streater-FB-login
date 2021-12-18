import React from 'react';
import TextButton from './TextButton';

export default {
  title: 'components/atoms/TextButton',
  component: TextButton,
  argTypes: {
    type: {
      defaultValue: 'button',
      type: 'text'
    },
    to: {
      defaultValue: '',
      type: 'text'
    },
    isDark: {
      defaultValue: false,
      type: 'boolean'
    },
    isRouterLink: {
      defaultValue: false,
      type: 'boolean'
    },
    isExternalLink: {
      defaultValue: false,
      type: 'boolean'
    }
  }
};

const Template = (args: object) => <TextButton {...args}>Read More</TextButton>;

export const Light = Template.bind([]);

export const Dark = Template.bind([]);
// @ts-ignore
Dark.args = {
  isDark: true
};

export const RouterLink = Template.bind([]);
// @ts-ignore
RouterLink.args = {
  isRouterLink: true
};

export const ExternalLink = Template.bind([]);
// @ts-ignore
ExternalLink.args = {
  isExternalLink: true
};
