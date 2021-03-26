import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FiltersColumn, FiltersColumnProps } from '../components/FiltersColumn/FiltersColumn';

export default {
    title: 'Listing/FiltersColumn',
    component: FiltersColumn,
} as Meta;

const Template: Story<FiltersColumnProps> = (args) => <FiltersColumn {...args} />;

export const Example = Template.bind({});
Example.args = {
    submitCallback: (data) => {
        console.log(data);
    },
    subjectsList: [
        'Systemy rozproszone',
        'Inżynieria oprogramowania',
        'Architektora komputerów',
    ],
    timeSlots: [
        'Pn, 8.00 - 9.30',
        'Wt, 8.00 - 9.30',
    ],
};
