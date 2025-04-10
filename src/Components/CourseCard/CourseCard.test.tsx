import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CourseCard from './index';

// Wrap component with BrowserRouter for Link component
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('CourseCard Component', () => {
  const defaultProps = {
    id: 1,
    title: 'Test Course',
    image: 'test-image.jpg',
    available: true
  };

  test('renders course title', () => {
    renderWithRouter(<CourseCard {...defaultProps} />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });

  test('renders lock overlay when course is not available', () => {
    renderWithRouter(<CourseCard {...defaultProps} available={false} />);
    expect(screen.getByText('🔒')).toBeInTheDocument();
  });

  test('renders "New" badge when isNew is true', () => {
    renderWithRouter(<CourseCard {...defaultProps} isNew={true} />);
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  test('renders "Popular" badge when isPopular is true', () => {
    renderWithRouter(<CourseCard {...defaultProps} isPopular={true} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  test('renders lesson count and duration when provided', () => {
    renderWithRouter(
      <CourseCard 
        {...defaultProps} 
        lessonCount={10} 
        duration="2h 30min" 
      />
    );
    expect(screen.getByText('10 aulas')).toBeInTheDocument();
    expect(screen.getByText('2h 30min')).toBeInTheDocument();
  });

  test('renders progress bar when progress is provided', () => {
    renderWithRouter(<CourseCard {...defaultProps} progress={50} />);
    expect(screen.getByText('50% completo')).toBeInTheDocument();
    
    // Check if the progress bar width is set correctly
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveStyle('width: 50%');
  });

  test('links to the correct course detail page', () => {
    renderWithRouter(<CourseCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/courses/1');
  });
});