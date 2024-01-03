
interface Props {
    label: string;
    icon?: React.ReactNode;
    action: () => void;
    type: 'button' | 'submit' | 'reset';
}

const Button = (props: Props) => {
  return (
    <button 
      type={props.type}
      onClick={props.action}
      className="w-80 px-6 py-3.5 justify-center font-medium text-white inline-flex items-center bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {props.icon}
      {props.label.toUpperCase()}
    </button>
  )
}

export default Button;