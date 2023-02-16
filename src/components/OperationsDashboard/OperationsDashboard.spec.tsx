import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {OperationsDashboard} from './OperationsDashboard';

describe('<OperationsDashboard />', () => {
  describe('When Operations Dashobaord displays', () => {
    async function init() {
      render(<OperationsDashboard />);
    }
    it('should display store departments health ', async () => {
      await init();
      expect(screen.getByText('Alcohol')).toBeInTheDocument();
      expect(screen.getByText('Soft Drinks')).toBeInTheDocument();
      expect(screen.getByText('Dairy')).toBeInTheDocument();
    });
  });
});