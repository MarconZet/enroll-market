import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { OneForOneTile, OneForOneTileProps } from '../components/OneForOneTile/OneForOneTile';

export default {
    title: 'Listing/OneForOneTile',
    component: OneForOneTile,
} as Meta;

const Template: Story<OneForOneTileProps> = (args) => <OneForOneTile {...args} />;

export const ExampleOne = Template.bind({});
ExampleOne.args = {
    subjectName: 'Systemy rozproszone',
    wantedGroup: {
        teacherName: 'Jan Kowalski',
        timeSlot: 'Wt. 12.50 - 14.20',
    },
    offeredGroup: {
        teacherName: 'Tomasz Nowak',
        timeSlot: 'Śr. 9.35 - 11.05',
        comment: 'Płacę w walucie miasteczkowej',
        whoOffers: 'Marcin Woźniak',
    },
    acceptCallback: () => console.log('accept'),
    editCallback: () => console.log('edit'),
    deleteCallback: () => console.log('delete'),
};
