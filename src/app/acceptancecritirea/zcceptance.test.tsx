import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AcceptanceCriteriaChecklist from './acceptancecheck';

test('renders acceptance criteria checklist', () => {
  const criteriaMet = [1, 2, 3];
  render(<AcceptanceCriteriaChecklist criteriaMet={criteriaMet} />);
  
  expect(screen.getByText("Acceptance Criteria Check")).toBeInTheDocument();
  expect(screen.getByText("Product has a description - ✅ Met")).toBeInTheDocument();
  expect(screen.getByText("Product has a price - ✅ Met")).toBeInTheDocument();
});
