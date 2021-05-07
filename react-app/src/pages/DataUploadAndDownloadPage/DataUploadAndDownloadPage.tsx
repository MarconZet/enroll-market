import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as P from './parts';
import * as A from '../../store/dataUploadAndDownload/actions';

export const DataUploadAndDownloadPage: React.FC = () => {
    const dispatch = useDispatch();
    const input = useRef<HTMLInputElement>(null);

    const onClick = () => {
        if (typeof input?.current?.files?.[0] !== 'undefined') {
            dispatch(A.uploadDataRequest(input.current.files[0], input.current.files[0].name));
        }
    }

    return (
        <P.Wrapper>
            <P.PagePartContainer>
                <P.ContainerTitle>Import danych</P.ContainerTitle>
                <P.Input type="file" ref={input} />
                <P.Submit onClick={onClick}>Wyślij</P.Submit>
            </P.PagePartContainer>
            <P.PagePartContainer>
                <P.ContainerTitle>Eksport wyników</P.ContainerTitle>
                <P.Download href={process.env.REACT_APP_API_PATH + '/api/enroll/download'}>Pobierz</P.Download>
            </P.PagePartContainer>
        </P.Wrapper>
    );
};

export default DataUploadAndDownloadPage;