import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Pagination, PaginationProps } from '../components/Pagination/Pagination';

export default {
    title: 'Reusable/Pagination',
    component: Pagination
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const ExampleOne = Template.bind({});
ExampleOne.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 1,
    totalPages: 1,
};

export const ExampleTwo = Template.bind({});
ExampleTwo.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 1,
    totalPages: 2,
};

export const ExampleThree = Template.bind({});
ExampleThree.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 2,
    totalPages: 2,
};

export const ExampleFour = Template.bind({});
ExampleFour.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 1,
    totalPages: 3,
};

export const ExampleFive = Template.bind({});
ExampleFive.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 2,
    totalPages: 3,
};

export const ExampleSix = Template.bind({});
ExampleSix.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 1,
    totalPages: 4,
};

export const ExampleSeven = Template.bind({});
ExampleSeven.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 2,
    totalPages: 4,
};

export const ExampleEight = Template.bind({});
ExampleEight.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 3,
    totalPages: 4,
};

export const ExampleNine = Template.bind({});
ExampleNine.args = {
    onPageChange: (page: number) => { console.log(page); },
    currentPage: 4,
    totalPages: 4,
};