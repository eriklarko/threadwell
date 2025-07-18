import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ProgressBar } from './ProgressBar.tsx';

describe('ProgressBar', () => {
  it('displays progress bar with correct width based on progress percentage', () => {
    render(
      <ProgressBar
        position={30000}
        duration={60000}
      />
    );

    const progressBar = screen.getByTestId('progress-bar');
    const progressFill = screen.getByTestId('progress-fill');

    expect(progressBar).toBeTruthy();
    expect(progressFill).toBeTruthy();
    // 30000ms / 60000ms = 50% progress
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: '50%' })
      ])
    );
  });

  it('displays 0% progress when position is 0', () => {
    render(
      <ProgressBar
        position={0}
        duration={60000}
      />
    );

    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: '0%' })
      ])
    );
  });

  it('displays 100% progress when position equals duration', () => {
    render(
      <ProgressBar
        position={60000}
        duration={60000}
      />
    );

    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: '100%' })
      ])
    );
  });

  it('handles edge case when duration is 0', () => {
    render(
      <ProgressBar
        position={0}
        duration={0}
      />
    );

    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: '0%' })
      ])
    );
  });

  it('displays formatted time labels', () => {
    render(
      <ProgressBar
        position={90000} // 1:30
        duration={240000} // 4:00
      />
    );

    expect(screen.getByText('1:30')).toBeTruthy();
    expect(screen.getByText('4:00')).toBeTruthy();
  });

  it('has proper accessibility labels', () => {
    render(
      <ProgressBar
        position={30000}
        duration={60000}
      />
    );

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.props.accessibilityLabel).toBe('Audio progress: 50% complete');
    expect(progressBar.props.accessibilityRole).toBe('progressbar');
  });
});
