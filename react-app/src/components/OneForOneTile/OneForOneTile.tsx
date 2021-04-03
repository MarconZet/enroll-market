import * as P from './parts';

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
}

export const OneForOneTile: React.FC<OneForOneTileProps> = ({ subjectName, wantedGroup, offeredGroup, acceptCallback, editCallback, deleteCallback }) => (
    <P.Container>
        <P.SubjectName>{subjectName}</P.SubjectName>
        <P.OffersBox>
            <P.SlotBox>
                <P.Subheader>Oferowany termin</P.Subheader>
                <P.ClassBox>
                    <span>{wantedGroup.teacherName}</span>
                    <span>{wantedGroup.timeSlot}</span>
                </P.ClassBox>
            </P.SlotBox>
            <P.SlotBox>
                <P.Subheader>Oczekiwany termin</P.Subheader>
                <P.ClassBox isOffered>
                    <span>{offeredGroup.teacherName}</span>
                    <span>{offeredGroup.timeSlot}</span>
                    <span>{offeredGroup.comment}</span>
                    <span>{offeredGroup.whoOffers}</span>
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
