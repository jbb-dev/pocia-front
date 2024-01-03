import React from 'react';
import Markdown from 'react-markdown';
import { IMessage } from '../../store/conversation';
import remarkGfm from 'remark-gfm';
import { observer } from 'mobx-react';
import { DataStoreContext } from '../../store/rootStore';

export enum EWriterRole {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system'
}

type Props = {
    data: IMessage | null
};

const Message: React.FC<Props> = observer((props: Props) => {

    const { user, assistant } = React.useContext(DataStoreContext);

    const isMessageFromUser: boolean = props.data?.senderRole === EWriterRole.USER;

    const backgroundColor = isMessageFromUser ? "bg-blue-300" : "bg-gray-300 ";

    return (
        <div className="flex mb-2">
            <div className='flex-shrink-0 mr-2' style={{ width: '40px', height: '40px' }}>
                <img
                    src={isMessageFromUser ? user.getUserAvatar() : assistant.selectedAssistant?.avatar}
                    alt="avatar"
                    className="h-10 rounded-full"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className='flex-grow'>
                <Markdown className={`rounded-lg mb-2 ml-2 p-3 whitespace-pre-line ${backgroundColor}`} remarkPlugins={[remarkGfm]}>
                    {props.data?.content}
                </Markdown>
            </div>
        </div>
    );
});

export default Message;