import * as P from './parts';
import { ReactComponent as Arrow } from '../../assets/arrow_right.svg';

export interface OneForOneTileProps {
    subjectName: string;
    wantedGroup: {
        teacherName: string;
        timeSlot: string;
    };
    offeredGroup: {
        teacherName: string;
        timeSlot: string;
        comment: string;
        whoOffers: string;
    };
    acceptCallback?: () => void;
    editCallback?: () => void;
    deleteCallback?: () => void;
    reverseOrder?: boolean;
}

export const OneForOneTile: React.FC<OneForOneTileProps> = ({ subjectName, wantedGroup, offeredGroup, acceptCallback, editCallback, deleteCallback, reverseOrder }) => (
    <P.Container>
        <P.SubjectName>{subjectName}</P.SubjectName>
        <P.OffersBox reverseOrder={reverseOrder}>
            <P.SlotBox>
                <P.Subheader>Oferowany termin</P.Subheader>
                <P.ClassBox isOffered>
                    <b>{offeredGroup.teacherName}</b>
                    <b>{offeredGroup.timeSlot}</b>
                    <span>{offeredGroup.comment}</span>
                    <span>{offeredGroup.whoOffers}</span>
                </P.ClassBox>
            </P.SlotBox>
            <P.SVGBox>
                <Arrow
                    height="100px"
                    width="100px"
                    viewBox="0 -5 25 25"
                />
            </P.SVGBox>
            <P.SlotBox>
                <P.Subheader>Oczekiwany termin</P.Subheader>
                <P.ClassBox>
                    <b>{wantedGroup.teacherName}</b>
                    <b>{wantedGroup.timeSlot}</b>
                </P.ClassBox>
            </P.SlotBox>
        </P.OffersBox>
        <P.ButtonsBox>
            {acceptCallback && <P.Button onClick={acceptCallback}>Akceptuj</P.Button>}
            {editCallback && <P.Button onClick={editCallback}>Edytuj</P.Button>}
            {deleteCallback && <P.Button onClick={deleteCallback}>Usuń</P.Button>}
        </P.ButtonsBox>
    </P.Container>
);

export default OneForOneTile;
