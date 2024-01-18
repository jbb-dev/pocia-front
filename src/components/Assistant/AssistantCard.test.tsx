import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AssistantCard from './AssistantCard';
import { DataStoreContext } from '../../store/rootStore';
import { IAssistant } from '../../store/assistantStore';
import { mockAssistantStore, mockContext } from '../../utils/test/mockContext';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('AssistantCard', () => {

    jest.spyOn(mockAssistantStore, 'setSelectedAssistant').mockImplementation(() => {});
    jest.spyOn(mockAssistantStore, 'setTempAssistant').mockImplementation(() => {});
      
    const mockAssistantData: IAssistant = {
        _id: '0',
        avatar: 'image_url.jpg',
        name: 'John Doe',
        job: 'Developer',
        biography: 'Un développeur hors pair'
    };

    it('should render correctly and respond to click events', () => {
        render(
            <BrowserRouter>
                <DataStoreContext.Provider value={mockContext}>
                    <AssistantCard data={mockAssistantData} />
                </DataStoreContext.Provider>
            </BrowserRouter>
        );

        // Check if elements exist in DOM
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Developer')).toBeInTheDocument();
        expect(screen.getByAltText('')).toHaveAttribute('src', 'image_url.jpg');

        // Simulate action click in order to check if setTempAssistan is working
        fireEvent.click(screen.getByRole('img'));
        expect(mockAssistantStore.setTempAssistant).toHaveBeenCalledWith(mockAssistantData);
    });

    
});
