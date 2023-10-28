import React from 'react';
import Message, { EWriterRole } from './Message';
import { observer } from 'mobx-react';
import { DataStoreContext } from '../../store/rootStore';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';

const ConversationComponent: React.FC = observer(() => {

    const { conversation } = React.useContext(DataStoreContext);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        conversation.setMessage({senderRole: EWriterRole.USER, content: e.target.value});
      };

    const messageContainerRef = React.useRef<HTMLDivElement | null>(null);

    const createNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // First save the question asked by the user
        conversation.saveUserMessage();
        // Then send the message in order to wait for the assistant answer
        // await conversation.sendMessage();
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
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    <input onChange={handleTextChange} type="textarea" placeholder="Ecrivez ici votre message" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3" />
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                        </button>
                        <Button
                            type='submit'
                            label="Envoyer"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
});

export default ConversationComponent;