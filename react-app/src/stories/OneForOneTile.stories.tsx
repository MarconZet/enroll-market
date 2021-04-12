import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { OneForOneTile, OneForOneTileProps } from '../components/OneForOneTile/OneForOneTile';
import { CourseType, DayOfWeek } from '../api/models';

export default {
    title: 'Listing/OneForOneTile',
    component: OneForOneTile,
} as Meta;

const Template: Story<OneForOneTileProps> = (args) => <OneForOneTile {...args} />;

export const ExampleOne = Template.bind({});
ExampleOne.args = {
    offer: {
        givenCourse: {
            courseType: CourseType.PROJECT,
            dayOfWeek: DayOfWeek.MONDAY,
            id: 0,
            startTime: {
                hour: 12,
                minute: 50,
                second: 0,
                nano: 0
            },
            subject: {
                id: 0,
                name: "Analiza matematyczna"
            },
            teacher: {
                emailAddress: "frydrych@agh.edu.pl",
                id: 0,
                name: "Wacław",
                surname: "Frydrych"
            }
        },
        id: 0,
        student: {
            admin: true,
            id: 0,
            name: "Grzegorz",
            surname: "Janosz"
        },
        takenCourse: {
            courseType: CourseType.PROJECT,
            dayOfWeek: DayOfWeek.MONDAY,
            id: 0,
            startTime: {
                hour: 12,
                minute: 50,
                second: 0,
                nano: 0
            },
            subject: {
                id: 0,
                name: "Analiza matematyczna"
            },
            teacher: {
                emailAddress: "frydrych@agh.edu.pl",
                id: 0,
                name: "Wacław",
                surname: "Frydrych"
            }
        }
    },
    acceptCallback: () => console.log('accept'),
    editCallback: () => console.log('edit'),
    deleteCallback: () => console.log('delete'),
};
