export const Input: React.FC<{ id: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ id, placeholder, onChange }) => {
    return (
        <input
            type="text"
            id={id}
            placeholder={placeholder}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            onChange={onChange}
        />
    );
};