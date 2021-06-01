import { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { DayOfWeek } from '../../api/models';
import { myCousesForSubjectAndTypeSelector, teachersNamesForSubjectAndTypeSelector } from '../../store/globalData/selectors';
import { ExtendedOffer } from '../../store/offersListing/constants';
import ConditionalForm from '../ConditionalForm/ConditionalForm';
import { ExtendedTimeBlock } from '../DayRangeInput/DayRangeInput';
import * as P from './parts';

export interface ConditionalEditModalProps {
    editHandler: () => void;
    cancelHandler: () => void;
    isOpen: boolean;
    offer: ExtendedOffer;
}

export const ConditionalEditModal: React.FC<ConditionalEditModalProps> = ({ editHandler, cancelHandler, isOpen, offer }) => {
    const dispatch = useDispatch();

    const [latestBlockIndex, setLatestBlockIndex] = useState(0);
    const [comment, setComment] = useState("");

    const [givenCourseId, setGivenCourseId] = useState(offer.givenCourse.id);

    const [chosenTeachers, setChosenTeachers] = useState<number[]>([]);
    const [chosenTimeBlocks, setChosenTimeBlocks] = useState<ExtendedTimeBlock[]>([]);

    let myCourses = useSelector(myCousesForSubjectAndTypeSelector(offer.givenCourse.subject.id, offer.givenCourse.courseType));
    let teachers = useSelector(teachersNamesForSubjectAndTypeSelector(offer.givenCourse.subject.id, offer.givenCourse.courseType));

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
        }
    }

    return (
        <ReactModal isOpen={isOpen} style={style}>
            <P.Form>
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
                    <P.Button>Anuluj</P.Button>
                    <P.Button>Zapisz</P.Button>
                </P.ButtonsBox>
            </P.Form>
        </ReactModal>
    );
};

export default ConditionalEditModal;