import React from 'react'
import { IAssistant } from '../pages/Team';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../shared/Navigation/ERoutes';

type Props = {
    data: IAssistant
}

const AssistantCard = (props: Props) => {

    let navigate = useNavigate();

    const moveToProfile = () => navigate(ERoutes.PROFILE);

    return (
        <div 
            onClick={moveToProfile}
            className="flex max-w-[288px] flex-col items-center gap-4 rounded-md border border-solid border-[#cdcdcd] px-8 py-6 md:max-w-full cursor-pointer"
        >
            <img src={props.data.avatar} alt="" className="mb-4 inline-block h-52 w-full object-cover" />
            <p className="font-bold">{props.data.name}</p>
            <p className="text-sm text-[#636262]">{props.data.service}</p>
        </div>  
    );
};

export default AssistantCard;