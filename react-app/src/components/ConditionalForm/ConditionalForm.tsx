import MultiCheckbox from "../MultiCheckbox/MultiCheckbox";

export interface ConditionalFormProps {
    days: { [key: string]: string };
    teachers: { [key: string]: string };
    onCheckDay: React.ChangeEventHandler<HTMLInputElement>;
    onCheckTeacher: React.ChangeEventHandler<HTMLInputElement>;
}

const ConditionalForm: React.FC<ConditionalFormProps> = ({ days, teachers, onCheckDay, onCheckTeacher }) => (
    <>
        <MultiCheckbox
            name="teachers"
            label="Wybierz nauczycieli:"
            choices={teachers}
            onElementChange={onCheckTeacher}
        />
        <MultiCheckbox
            name="days"
            label="Wybierz terminy:"
            choices={days}
            onElementChange={onCheckDay}
        />
    </>
);

export default ConditionalForm;
