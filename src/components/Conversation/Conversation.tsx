import React from 'react';
import Message, { EWriterRole } from './Message';
import { observer } from 'mobx-react';
import { DataStoreContext } from '../../store/rootStore';
import Button from '../shared/Button';

const Conversation: React.FC = observer(() => {

    const { conversation } = React.useContext(DataStoreContext);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        conversation.setMessage({senderRole: EWriterRole.USER, content: value});
    };

    const messageContainerRef = React.useRef<HTMLDivElement | null>(null);

    const createNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // First save the question asked by the user
        // conversation.saveUserMessage();
        // Then send the message in order to wait for the assistant answer
        await conversation.sendMessage();
    };

    // Run fetch current conversation
    React.useEffect(() => {
        conversation.getConversation();
    }, []);

    // Scroll to bottom
    React.useEffect(() =>
    {
        if (messageContainerRef.current) 
        {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [conversation.currentConversation?.length]);

    return (
        <form className="container mx-auto mt-8 px-5" onSubmit={createNewMessage}>
            <div
                ref={messageContainerRef}
                className="overflow-y-auto max-h-[69vh] px-4"
            >
                {conversation.currentConversation?.map((mess, index) => 
                    <Message data={mess} key={index} />
                )}
            </div>
            <div className="fixed bottom-2 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 z-10 sm:ml-64 ml-0 ">
                <textarea 
                    onChange={handleTextChange} 
                    rows={3} 
                    value={conversation.message?.content || ""}
                    placeholder="Write your message here..." 
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3 mb-2"
                />
                <Button
                    type='submit'
                    label="Send"
                    action={() => null}
                    icon={
                        <svg className="w-4 h-4 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                    }
                />
            </div>
        </form>
    );
});

export default Conversation;