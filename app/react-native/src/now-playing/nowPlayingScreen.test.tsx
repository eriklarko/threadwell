import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NowPlayingScreen } from './nowPlayingScreen';

describe('NowPlayingScreen', () => {
  it('renders without crashing', () => {
    render(<NowPlayingScreen />);
    expect(screen.getByTestId('now-playing-screen')).toBeTruthy();
  });

  it('displays the book cover art', () => {
    render(<NowPlayingScreen />);
    expect(screen.getByTestId('book-cover')).toBeTruthy();
  });

  it('displays the book title', () => {
    render(<NowPlayingScreen />);
    const titleElement = screen.getByTestId('book-title');
    expect(titleElement.props.children).toBe("Alice's Adventures in Wonderland");
  });

  it('displays the author name', () => {
    render(<NowPlayingScreen />);
    const authorElement = screen.getByTestId('book-author');
    expect(authorElement.props.children).toBe('Lewis Carroll');
  });
});