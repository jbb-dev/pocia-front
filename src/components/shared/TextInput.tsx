import React from 'react';

interface Props {
  imgSrc: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'email' | 'password' | 'text';
  required: boolean;
}

const TextInput: React.FC<Props> = (props: Props) => {
  return (
    <div className="w-80 mb-4 relative">
      <img alt="" src={props.imgSrc} className="absolute left-[5%] top-[26%] inline-block" />
      <input
        className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-[#333333]"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    </div>  
  );
};

export default TextInput;