import { AssistantStore } from '../../store/assistantStore';

export const mockUser = { 
        user: null,
        isAuth: false,
        setIsAuth: jest.fn(),
        subscribe: jest.fn(),
        login: jest.fn(),
        updateProfile: jest.fn(),
        signout: jest.fn(),
        getUserAvatar: jest.fn()
    };

export const mockConversation = {
        conversations: null, 
        currentConversation: null, 
        message: null,
        setMessage: jest.fn(),
        getConversation: jest.fn(),
        sendMessage: jest.fn(),
};

export const mockAssistant = {
    tempAssistant: {
      name: 'John Doe',
      job: 'Developer',
      biography: 'Biography text',
      avatar: 'avatar.jpg',
    },
    setSelectedAssistant: jest.fn(),
  };

export const mockAssistantStore = AssistantStore.create({
        list: null,
        selectedAssistant: null,
        tempAssistant: null,
    });

export const mockContext = {
        user: mockUser,
        conversation: mockConversation,
        assistant: mockAssistantStore,
    };