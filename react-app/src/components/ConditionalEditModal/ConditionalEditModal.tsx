import { FormEventHandler, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { DayOfWeek } from '../../api/models';
import { myCousesForSubjectAndTypeSelector, teachersNamesForSubjectAndTypeSelector } from '../../store/globalData/selectors';
import { ExtendedOffer } from '../../store/offersListing/constants';
import { editOfferRequest } from '../../store/offersManagement/actions';
import ConditionalForm from '../ConditionalForm/ConditionalForm';
import { ExtendedTimeBlock } from '../DayRangeInput/DayRangeInput';
import * as P from './parts';

export interface ConditionalEditModalProps {
    cancelHandler: () => void;
    isOpen: boolean;
    offer: ExtendedOffer | null;
}

const translations = {
    'PROJECT': 'projekt',
    'LABORATORY': 'laboratorium',
    'LECTURE': 'wykład',
    'LESSON': 'ćwiczenia',
};

export const ConditionalEditModal: React.FC<ConditionalEditModalProps> = ({ cancelHandler, isOpen, offer }) => {
    const dispatch = useDispatch();

    const [latestBlockIndex, setLatestBlockIndex] = useState(0);
    const [comment, setComment] = useState("");

    const [givenCourseId, setGivenCourseId] = useState(-1);

    const [chosenTeachers, setChosenTeachers] = useState<number[]>([]);
    const [chosenTimeBlocks, setChosenTimeBlocks] = useState<ExtendedTimeBlock[]>([]);

    let myCourses = useSelector(myCousesForSubjectAndTypeSelector(!!offer ? offer.givenCourse.subject.id : -1, !!offer ? offer.givenCourse.courseType : 'none'));
    let teachers = useSelector(teachersNamesForSubjectAndTypeSelector(!!offer ? offer.givenCourse.subject.id : -1, !!offer ? offer.givenCourse.courseType : 'none'));

    useEffect(() => {
        setGivenCourseId(!!offer ? offer.givenCourse.id : -1);
        setChosenTeachers(!!offer ? offer.offerConditions.teachers.map(t => t.id) : []);
        setChosenTimeBlocks(!!offer ? offer.offerConditions.timeBlocks.map((block, index) => ({
            ...block,
            index,
            wholeDay: block.startTime === null && block.endTime === null,
            startTime: block.startTime === null ? '' : block.startTime,
            endTime: block.endTime === null ? '' : block.endTime,
        })) : []);
        setComment(offer?.comment ?? "");
    }, [offer]);

    useEffect(() => {
        setLatestBlockIndex(chosenTimeBlocks.length);
    }, [chosenTimeBlocks])
 
    const onCheckTeacher: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.checked) {
            setChosenTeachers([
                ...chosenTeachers,
                +event.target.value,
            ]);
        } else {
            setChosenTeachers(chosenTeachers.filter(e => e !== +event.target.value));
        }
    };

    const onChangeBlock = (id: number) => (dayOfWeek: DayOfWeek, wholeDay: boolean, startTime: string, endTime: string) => {
        const blocks = chosenTimeBlocks;
        blocks[id] = {
            ...blocks[id],
            dayOfWeek,
            wholeDay,
            startTime,
            endTime,
        };

        setChosenTimeBlocks(blocks);
    };

    const onDeleteBlock = (id: number) => () => {
        setChosenTimeBlocks(
            [
                ...( id > 0 ? chosenTimeBlocks.slice(0, id) : []),
                ...( id < chosenTimeBlocks.length-1 ? chosenTimeBlocks.slice(id+1) : []),
            ]
        );
    }

    const onAddBlock = () => {
        setChosenTimeBlocks([
            ...chosenTimeBlocks,
            {
                dayOfWeek: DayOfWeek.MONDAY,
                wholeDay: true,
                startTime: "00:00",
                endTime: "00:01",
                index: latestBlockIndex + 1,
            }
        ]);
        setLatestBlockIndex(latestBlockIndex+1);
    };
    
    const style = {
        content: {
            padding: '40px 100px 0 100px',
            border: 'none',
            background: 'transparent',
        }
    }

    const onSubmit: FormEventHandler<Element> = (event) => {
        const timeBlocks = chosenTimeBlocks.map(block => ({
            dayOfWeek: block.dayOfWeek,
            startTime: block.wholeDay ? null : block.startTime,
            endTime: block.wholeDay ? null : block.endTime,
        }))
        
        if (offer !== null) {
            dispatch(editOfferRequest(offer.id, givenCourseId, chosenTeachers, timeBlocks, comment));
        }

        event.preventDefault();
    };

    return (
        <ReactModal isOpen={isOpen} style={style}>
            <P.Form onSubmit={onSubmit}>
                <P.SubjectName>{offer?.givenCourse.subject.name} - {translations[offer?.givenCourse.courseType ?? 'LABORATORY']}</P.SubjectName>
                <ConditionalForm
                    teachers={teachers}
                    onCheckTeacher={onCheckTeacher}
                    givenCourseId={givenCourseId}
                    myCourses={myCourses}
                    onChangeGivenCourse={(e) => setGivenCourseId(+e.target.value)}
                    timeBlocks={chosenTimeBlocks}
                    changeBlockHandler={onChangeBlock}
                    deleteBlockHandler={onDeleteBlock}
                    addBlockHandler={onAddBlock}
                    comment={comment}
                    onChangeComment={(e) => setComment(e.target.value)}
                />
                <P.ButtonsBox>
                    <P.Button onClick={cancelHandler}>Anuluj</P.Button>
                    <P.Button type="submit" disabled={!chosenTimeBlocks.length || !chosenTeachers.length}>Zapisz</P.Button>
                </P.ButtonsBox>
            </P.Form>
        </ReactModal>
    );
};

export default ConditionalEditModal;