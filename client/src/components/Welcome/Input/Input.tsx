interface Input{
    placeholder: string;
    name: string;
    type: string;
    value?: string;
    handleChange: (event: any, name: string) => void;
}

const Input = ({placeholder, name, type, value, handleChange}: Input) => {
    return(
        <input 
            placeholder={placeholder}
            type={type}
            step="0.0001"
            value={value}
            onChange={(e) => handleChange(e, name)}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism">
        </input>
    )
}

export default Input;