import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { coursesForSubjectAndTypeSelector, myCousesForSubjectAndTypeSelector } from '../../store/globalData/selectors';
import { ExtendedOffer } from '../../store/offersListing/constants';
import OneForOneForm from '../OneForOneForm/OneForOneForm';
import * as P from './parts';

export interface OneForOneEditModalProps {
    editHandler: () => void;
    cancelHandler: () => void;
    isOpen: boolean;
    offer: ExtendedOffer;
}

export const OneForOneEditModal: React.FC<OneForOneEditModalProps> = ({ editHandler, cancelHandler, isOpen, offer }) => {
    const dispatch = useDispatch();
    
    const [comment, setComment] = useState("");

    const [givenCourseId, setGivenCourseId] = useState(offer.givenCourse.id);
    const [takenCourseId, setTakenCourseId] = useState(offer?.takenCourse?.id ?? - 1);

    let myCourses = useSelector(myCousesForSubjectAndTypeSelector(offer.givenCourse.subject.id, offer.givenCourse.courseType));
    let courses = useSelector(coursesForSubjectAndTypeSelector(offer.givenCourse.subject.id, offer.givenCourse.courseType));
    
    const style = {
        content: {
            padding: '40px 100px 0 100px',
        }
    }

    return (
        <ReactModal isOpen={isOpen} style={style}>
            <P.Form>
                <OneForOneForm
                    courses={courses}
                    myCourses={myCourses}
                    givenCourseId={givenCourseId}
                    takenCourseId={takenCourseId}
                    comment={comment}
                    onChangeGivenCourse={(e) => setGivenCourseId(+e.target.value)}
                    onChangeTakenCourse={(e) => setTakenCourseId(+e.target.value)}
                    onChangeComment={(e) => setComment(e.target.value)}
                />
                <P.ButtonsBox>
                    <P.Button>Anuluj</P.Button>
                    <P.Button>Zapisz</P.Button>
                </P.ButtonsBox>
            </P.Form>
        </ReactModal>
    );
};

export default OneForOneEditModal;