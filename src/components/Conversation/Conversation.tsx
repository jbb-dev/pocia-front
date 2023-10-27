import React from 'react';
import Message, { EWriterRole } from './Message';
import { observer } from 'mobx-react';
import { DataStoreContext } from '../../store/rootStore';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';

const Conversation: React.FC = observer(() => {

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
                className="overflow-y-auto max-h-[80vh]"
            >
                {conversation.currentConversation?.map((mess, index) => 
                    <Message data={mess} key={index} />
                )}
            </div>
            <TextInput 
                label="Votre message"
                value={conversation.message?.content || ""}
                onChange={handleTextChange}
            />
            <Button
                type='submit'
                label="Envoyer"
            />
        </form>
    );
});

export default Conversation;