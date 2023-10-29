import React from 'react';
import Markdown from 'react-markdown';
import { IMessage } from '../../store/conversation';
import remarkGfm from 'remark-gfm';

export enum EWriterRole {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system'
}

type Props = {
    data: IMessage | null
};

const Message: React.FC<Props> = (props: Props) => {

    const isMessageFromUser: boolean = props.data?.senderRole === EWriterRole.USER;

    const messageClass = isMessageFromUser 
        ? "bg-blue-300 p-2 rounded-lg mb-2 ml-2 whitespace-pre-line" 
        : "bg-gray-300 p-2 rounded-lg mb-2 mr-2 whitespace-pre-line";

    const containerClass = isMessageFromUser ? "flex items-start" : "flex items-end";

    return (
        <div className={containerClass}>
            {!isMessageFromUser && (
                <img
                src="url_de_l_avatar"
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-2"
                />
            )}
            <Markdown className={messageClass} remarkPlugins={[remarkGfm]}>{props.data?.content}</Markdown>
            {isMessageFromUser && (
                <img
                src="url_de_l_avatar"
                alt="Avatar"
                className="w-10 h-10 rounded-full ml-2"
                />
            )}
        </div>
    );
};

export default Message;