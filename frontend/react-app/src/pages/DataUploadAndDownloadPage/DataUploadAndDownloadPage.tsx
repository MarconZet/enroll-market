import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileDownload from 'js-file-download';
import * as P from './parts';
import * as A from '../../store/dataUploadAndDownload/actions';
import { teachersSelector } from '../../store/globalData/selectors';
import { getEnrollData, getEnrollDataForTeacher } from '../../api/requests';
import notitier from '../../utils/notifications';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

export const DataUploadAndDownloadPage: React.FC = () => {
    const dispatch = useDispatch();

    const input = useRef<HTMLInputElement>(null);
    const registrationInput = useRef<HTMLInputElement>(null);

    const [teacher, setTeacher]= useState(-1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalCallback, setModalCallback] = useState(() => () => {});

    let teachers = useSelector(teachersSelector);

    const onImport = () => {
        if (typeof input?.current?.files?.[0] !== 'undefined') {
            dispatch(A.uploadDataRequest(input.current.files[0], input.current.files[0].name));
        }

        setIsModalOpen(false);
    };

    const onRegister = () => {
        if (typeof registrationInput?.current?.files?.[0] !== 'undefined') {
            dispatch(A.registerStudentsRequest(registrationInput.current.files[0], registrationInput.current.files[0].name));
        }

        setIsModalOpen(false);
    };

    const onDelete = () => {
        dispatch(A.deleteStudentsRequest());

        setIsModalOpen(false);
    }

    const onDownloadAll = () => {
        getEnrollData().then((response) => {
            FileDownload(response.data, 'enroll_results.csv');
        }).catch((err) => {
            notitier.alert('Pobranie pliku nie powiodło się.');
        });
    };

    const onDownloadForTeacher = () => {
        getEnrollDataForTeacher(teacher).then((response) => {
            FileDownload(response.data, `enroll_results_for_${teacher}.csv`);
        }).catch((err) => {
            notitier.alert('Pobranie pliku nie powiodło się.');
        });
    };

    const onImportClick = () => {
        setModalText("Czy na pewno chcesz wysłać nowe dane?");
        setModalCallback(() => onImport);
        setIsModalOpen(true);
    }

    const onRegisterClick = () => {
        setModalText("Czy na pewno chcesz zarejestrować nowych studentów?");
        setModalCallback(() => onRegister);
        setIsModalOpen(true);
    }

    const onDeleteClick = () => {
        setModalText("Czy na pewno chcesz usunąć wszystkich studentów?");
        setModalCallback(() => onDelete);
        setIsModalOpen(true);
    }

    return (
        <P.Wrapper>
            <ConfirmModal
                confirmationText={modalText}
                confirmHandler={modalCallback}
                isOpen={isModalOpen}
                cancelHandler={() => setIsModalOpen(false)}
            />
            <P.PagePartContainer>
                <P.ContainerTitle>Import danych</P.ContainerTitle>
                <P.Input type="file" ref={input} />
                <P.Button onClick={onImportClick}>Wyślij</P.Button>

                <P.ContainerTitle>Rejestracja studentów</P.ContainerTitle>
                <P.Input type="file" ref={registrationInput} />
                <P.Button onClick={onRegisterClick}>Zarejestruj</P.Button>

                <P.ContainerTitle>Usuwanie studentów</P.ContainerTitle>
                <P.Button onClick={onDeleteClick}>Usuń studentów</P.Button>
            </P.PagePartContainer>
            <P.PagePartContainer>
                <P.ContainerTitle>Eksport wyników</P.ContainerTitle>
                <P.Button onClick={onDownloadAll}>Pobierz całość</P.Button>
                <P.Select name="teacher" id="teacher" onChange={(e) => setTeacher(+e.target.value)} value={teacher}>
                    <option key={-1} value={-1}>Wybierz prowadzącego</option>
                    {
                        teachers.map((e, index) => (
                            <option key={index} value={e.id}>{e.name} {e.surname}</option>
                        ))
                    }
                </P.Select>
                <P.Button onClick={onDownloadForTeacher} disabled={teacher === -1}>Pobierz wyniki dla prowadzącego</P.Button>
            </P.PagePartContainer>
        </P.Wrapper>
    );
};

export default DataUploadAndDownloadPage;