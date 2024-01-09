import React from 'react';
import { DataStoreContext } from '../../store/rootStore';
import { observer } from 'mobx-react';
import { IAssistant } from '../../store/assistantStore';

const SelectAssistant: React.FC = observer(() => {

    const { assistant } = React.useContext(DataStoreContext);

    const assistantsList: IAssistant[] = assistant.list ?? [];
    
    const selectAssistant = (assist: IAssistant): void => assistant.setSelectedAssistant(assist);
    const assistantIsSelected = (assistantToCheck: IAssistant):boolean => assistant.selectedAssistant?._id === assistantToCheck._id;
    const assistantShortName = (assistantToCheck: IAssistant): string => assistantToCheck.name.split(" ")[0];

    return (
        <div className="flex flex-wrap justify-center mb-8 w-full overscroll-y-auto border-b-2 pb-4">
            {assistantsList.map(assist => 
                <div 
                    className='flex flex-col items-center mr-4 cursor-pointer min-w-64 min-h-32' 
                    key={assist._id}
                    onClick={() => selectAssistant(assist)}
                >
                    <img
                        src={assist.avatar}
                        alt="avatar"
                        className="h-14 rounded-full object-fit: cover"
                        style={{border: assistantIsSelected(assist) ? "6px solid green" : "none"}}
                    />
                    <p className='text-center text-sm text-[#636262]'>
                        {assistantShortName(assist)}
                    </p>
                </div>           
            )}
        </div>
    )
});

export default SelectAssistant;