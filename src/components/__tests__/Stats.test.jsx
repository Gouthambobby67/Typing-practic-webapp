import React from 'react';
import { render, screen } from '@testing-library/react';
import Stats from '../Stats';

describe('Stats', () => {
  it('renders the initial stats correctly', () => {
    render(<Stats wpm={0} accuracy={100} errors={0} />);

    expect(screen.getByText('WPM')).toBeInTheDocument();
    expect(screen.getByTestId('wpm')).toHaveTextContent('0');

    expect(screen.getByText('ACCURACY')).toBeInTheDocument();
    expect(screen.getByTestId('accuracy')).toHaveTextContent('100%');

    expect(screen.getByText('ERRORS')).toBeInTheDocument();
    expect(screen.getByTestId('errors')).toHaveTextContent('0');
  });

  it('renders updated stats correctly', () => {
    render(<Stats wpm={50} accuracy={95} errors={5} />);

    expect(screen.getByText('WPM')).toBeInTheDocument();
    expect(screen.getByTestId('wpm')).toHaveTextContent('50');

    expect(screen.getByText('ACCURACY')).toBeInTheDocument();
    expect(screen.getByTestId('accuracy')).toHaveTextContent('95%');

    expect(screen.getByText('ERRORS')).toBeInTheDocument();
    expect(screen.getByTestId('errors')).toHaveTextContent('5');
  });
});
