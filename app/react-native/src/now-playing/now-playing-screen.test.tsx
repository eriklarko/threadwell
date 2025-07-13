import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { NowPlayingScreen } from './now-playing-screen';

describe('NowPlayingScreen', () => {
  describe('Step 1: Basic view with cover art, title and author', () => {
    let component: ReactTestRenderer.ReactTestRenderer;

    beforeEach(async () => {
      await ReactTestRenderer.act(() => {
        component = ReactTestRenderer.create(<NowPlayingScreen />);
      });
    });

    it('renders without crashing', () => {
      expect(component.toJSON()).toBeTruthy();
    });

    it('displays the book cover art', () => {
      const instance = component.root;
      const coverImage = instance.findByProps({ testID: 'book-cover' });
      expect(coverImage).toBeTruthy();
    });

    it('displays the book title', () => {
      const instance = component.root;
      const titleText = instance.findByProps({ testID: 'book-title' });
      expect(titleText.props.children).toBe("Alice's Adventures in Wonderland");
    });

    it('displays the author name', () => {
      const instance = component.root;
      const authorText = instance.findByProps({ testID: 'book-author' });
      expect(authorText.props.children).toBe('Lewis Carroll');
    });

    it('has proper layout structure', () => {
      const instance = component.root;
      expect(instance.findByProps({ testID: 'now-playing-header' })).toBeTruthy();
      expect(instance.findByProps({ testID: 'now-playing-content' })).toBeTruthy();
    });
  });
});
