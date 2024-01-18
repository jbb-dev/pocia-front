import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AssistantDetails from '../../../src/components/Assistant/AssistantDetails';
import { DataStoreContext } from '../../../src/store/rootStore';
import { ERoutes } from '../../../src/components/shared/Navigation/ERoutes';
import { mockAssistantStore, mockContext } from '../../utils/test/mockContext';

// Mocks for useNavigate and DataStoreContext
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('AssistantDetails', () => {
  it('renders tempAssistant data correctly', () => {
    render(
      <BrowserRouter>
        <DataStoreContext.Provider value={mockContext}>
          <AssistantDetails />
        </DataStoreContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Biography text')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'avatar.jpg');
  });

  it('navigates and sets selected assistant on button click', () => {
    const navigate = jest.fn();
    render(
      <BrowserRouter>
        <DataStoreContext.Provider value={mockContext}>
          <AssistantDetails />
        </DataStoreContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(`Select John Doe as your assistant`));
    expect(mockAssistantStore.setSelectedAssistant).toHaveBeenCalledWith(mockAssistantStore.tempAssistant);
    expect(navigate).toHaveBeenCalledWith(ERoutes.CONVERSATION);
  });
});
