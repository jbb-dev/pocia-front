import React from 'react';
import Message, { EWriterRole } from './Message';
import { observer } from 'mobx-react';
import { DataStoreContext } from '../../store/rootStore';
import Button from '../shared/Button';

const Conversation: React.FC = observer(() => {

    const { conversation } = React.useContext(DataStoreContext);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        conversation.setMessage({senderRole: EWriterRole.USER, content: e.target.value});
      };

    const messageContainerRef = React.useRef<HTMLDivElement | null>(null);

    const createNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // First save the question asked by the user
        conversation.saveUserMessage();
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
        <form className="container mx-auto mt-8" onSubmit={createNewMessage}>
            <div
                ref={messageContainerRef}
                className="overflow-y-auto max-h-[80vh] px-4"
            >
                {conversation.currentConversation?.map((mess, index) => 
                    <Message data={mess} key={index} />
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 z-10 sm:ml-64 ml-0">
                <textarea 
                    onChange={handleTextChange} 
                    rows={3} 
                    placeholder="Write your message here..." 
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3 mb-2"
                />
                <Button
                    type='submit'
                    label="Send"
                    action={() => null}
                />
            </div>
        </form>
    );
});

export default Conversation;