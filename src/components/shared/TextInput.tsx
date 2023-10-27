import React from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const TextInput: React.FC<Props> = (props: Props) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input">
        {props.label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="input"
        type="text"
        value={props.value}
        onChange={props.onChange}
      />
    </div>  
  );
};

export default TextInput;