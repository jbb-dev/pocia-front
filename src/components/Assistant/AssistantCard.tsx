import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../shared/Navigation/ERoutes';
import { IAssistant } from '../../store/assistantStore';
import { DataStoreContext } from '../../store/rootStore';

type Props = {
    data: IAssistant;
}

const AssistantCard: React.FC<Props> = (props: Props) => {

    const { assistant } = React.useContext(DataStoreContext);

    let navigate = useNavigate();

    const moveToProfile = () => {
        assistant.setTempAssistant(props.data);
        navigate(ERoutes.PROFILE);
    };

    return (
        <div 
            onClick={moveToProfile}
            className="flex w-[320px] md:w-full flex-col items-center gap-4 rounded-md border border-solid border-[#cdcdcd] pb-6 cursor-pointer"
        >
            <img src={props.data.avatar} alt="" className="mb-4 inline-block h-52 w-full object-cover" />
            <p className="font-bold">{props.data.name}</p>
            <p className="text-sm text-[#636262]">{props.data.job}</p>
        </div>  
    );
};

export default AssistantCard;