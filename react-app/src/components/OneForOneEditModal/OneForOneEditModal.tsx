import React, { FormEventHandler, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { coursesForSubjectAndTypeSelector, myCousesForSubjectAndTypeSelector } from '../../store/globalData/selectors';
import { ExtendedOffer } from '../../store/offersListing/constants';
import { editOneForOneOfferRequest } from '../../store/offersManagement/actions';
import OneForOneForm from '../OneForOneForm/OneForOneForm';
import * as P from './parts';

export interface OneForOneEditModalProps {
    cancelHandler: () => void;
    isOpen: boolean;
    offer: ExtendedOffer | null;
}

export const OneForOneEditModal: React.FC<OneForOneEditModalProps> = ({ cancelHandler, isOpen, offer }) => {
    const dispatch = useDispatch();
    
    const [comment, setComment] = useState("");

    const [givenCourseId, setGivenCourseId] = useState(-1);
    const [takenCourseId, setTakenCourseId] = useState(-1);

    let myCourses = useSelector(myCousesForSubjectAndTypeSelector(!!offer ? offer.givenCourse.subject.id : -1, !!offer ? offer.givenCourse.courseType : 'none'));
    let courses = useSelector(coursesForSubjectAndTypeSelector(!!offer ? offer.givenCourse.subject.id : -1, !!offer ? offer.givenCourse.courseType : 'none'));

    useEffect(() => {
        setGivenCourseId(!!offer ? offer.givenCourse.id : -1);
        setTakenCourseId(!!offer ? (offer?.takenCourse?.id ?? -1) : -1);
        setComment(offer?.comment ?? "");
    }, [offer])
    
    const style = {
        content: {
            padding: '40px 100px 0 100px',
            border: 'none',
            background: 'transparent',
        }
    }

    const onSubmit: FormEventHandler<Element> = (event) => {
        if (offer !== null) {
            dispatch(editOneForOneOfferRequest(offer.id, givenCourseId, takenCourseId, comment));
        }
        
        event.preventDefault();
    };

    return (
        <ReactModal isOpen={isOpen} style={style}>
            <P.Form onSubmit={onSubmit}>
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
                    <P.Button onClick={cancelHandler}>Anuluj</P.Button>
                    <P.Button type="submit" disabled={(givenCourseId === -1) || (takenCourseId === -1)}>Zapisz</P.Button>
                </P.ButtonsBox>
            </P.Form>
        </ReactModal>
    );
};

export default OneForOneEditModal;