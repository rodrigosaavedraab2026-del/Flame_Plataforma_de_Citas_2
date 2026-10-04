import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useStore } from '../store/useStore';
import Welcome from '../components/Welcome';

describe('Welcome Component', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.setState({ screen: 'welcome' });
  });

  it('renders welcome screen correctly', () => {
    render(<Welcome />);
    
    expect(screen.getByText('Flama')).toBeInTheDocument();
    expect(screen.getByText(/Enciende la chispa/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Comenzar/i })).toBeInTheDocument();
  });

  it('navigates to auth screen when clicking Comenzar', () => {
    render(<Welcome />);
    
    const button = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(button);
    
    expect(useStore.getState().screen).toBe('auth');
  });

  it('navigates to auth screen when clicking Iniciar sesión', () => {
    render(<Welcome />);
    
    const link = screen.getByText(/Iniciar sesión/i);
    fireEvent.click(link);
    
    expect(useStore.getState().screen).toBe('auth');
  });
});
