import { AudioPro, AudioProContentType, AudioProEvent, AudioProTrack } from "react-native-audio-pro";


const track = {
  id: 'track-001',
  // TODO: find a way to use local files in the app bundle
  // For now, use a remote URL for testing
  url: 'https://example.com/audio.mp3',
  title: 'My Track',
  artwork: 'https://example.com/artwork.jpg',
  artist: 'Artist Name',
};

// Copied from react-native-audio-pro source because I coundn't import it directly
export type AudioProPlayOptions = {
    autoPlay?: boolean;
    headers?: AudioProHeaders;
    startTimeMs?: number;
};
export type AudioProHeaders = {
    audio?: Record<string, string>;
    artwork?: Record<string, string>;
};

/// When React Native apps go to the background, React may unmount your
/// components or even your entire app. To ensure continuous audio playback
/// and event handling, always set up audio event listeners outside the React
/// component lifecycle.
export function setupAudioPro(): void {
    AudioPro.configure({
        contentType: AudioProContentType.SPEECH, // Use SPEECH for audiobooks
        debug: true,
        debugIncludesProgress: true,
        progressIntervalMs: 1000, // adjust how frequently progress events are emitted
        showNextPrevControls: false, // Hide next/previous buttons on lock screen
    });

    // Set up event listeners that persist for the app's lifetime
    AudioPro.addEventListener((event: AudioProEvent) => {
        console.log('AudioPro event:', event);
    });
}

export function load(track: AudioProTrack): void {
    console.log('Loading track:', track);
    AudioPro.play(track, { autoPlay: false });
}

export function play(track: AudioProTrack, options?: AudioProPlayOptions): void {
    AudioPro.play(track, options);
    console.log('Track is now playing');
}

export function pause(): void {
    AudioPro.pause();
    console.log('Playback paused');
}