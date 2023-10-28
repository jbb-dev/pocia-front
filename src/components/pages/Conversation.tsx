import React from 'react'
import ListAssistant from '../Assistant/ListAssistant'
import ConversationComponent from '../Conversation/ConversationComponent'

type Props = {}

const Conversation = (props: Props) => {
  return (
    <div className='flex'>
        <ListAssistant />
        <ConversationComponent />
    </div>
  )
}

export default Conversation