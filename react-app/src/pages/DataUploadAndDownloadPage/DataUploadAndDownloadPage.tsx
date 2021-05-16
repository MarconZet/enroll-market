import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileDownload from 'js-file-download';
import * as P from './parts';
import * as A from '../../store/dataUploadAndDownload/actions';
import { teachersSelector } from '../../store/globalData/selectors';
import { getEnrollData, getEnrollDataForTeacher } from '../../api/requests';
import notitier from '../../utils/notifications';

export const DataUploadAndDownloadPage: React.FC = () => {
    const dispatch = useDispatch();
    const input = useRef<HTMLInputElement>(null);
    const [teacher, setTeacher]= useState(-1);
    let teachers = useSelector(teachersSelector);

    const onImport = () => {
        if (typeof input?.current?.files?.[0] !== 'undefined') {
            dispatch(A.uploadDataRequest(input.current.files[0], input.current.files[0].name));
        }
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

    return (
        <P.Wrapper>
            <P.PagePartContainer>
                <P.ContainerTitle>Import danych</P.ContainerTitle>
                <P.Input type="file" ref={input} />
                <P.Submit onClick={onImport}>Wyślij</P.Submit>
            </P.PagePartContainer>
            <P.PagePartContainer>
                <P.ContainerTitle>Eksport wyników</P.ContainerTitle>
                <P.Download onClick={onDownloadAll}>Pobierz całość</P.Download>
                <P.Select name="teacher" id="teacher" onChange={(e) => setTeacher(+e.target.value)} value={teacher}>
                    <option key={-1} value={-1}>Wybierz prowadzącego</option>
                    {
                        teachers.map((e, index) => (
                            <option key={index} value={e.id}>{e.name} {e.surname}</option>
                        ))
                    }
                </P.Select>
                <P.Download onClick={onDownloadForTeacher} disabled={teacher === -1}>Pobierz wyniki dla prowadzącego</P.Download>
            </P.PagePartContainer>
        </P.Wrapper>
    );
};

export default DataUploadAndDownloadPage;