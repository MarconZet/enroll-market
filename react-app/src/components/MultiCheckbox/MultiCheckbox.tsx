export interface MultiCheckboxProps {
    name: string;
    choices: { [key: string]: string };
    onElementChange: React.ChangeEventHandler<HTMLInputElement>;
    label: string;
}

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({ name, choices, onElementChange, label }) => (
    <>
        <span>{label}</span>
        {
            Object.keys(choices).map((val, index) => (
                <label>
                    <input key={`name${index}`} type="checkbox" name={name} value={val} onChange={onElementChange} /> {choices[val]}
                </label>
            ))
        }
    </>
);

export default MultiCheckbox;