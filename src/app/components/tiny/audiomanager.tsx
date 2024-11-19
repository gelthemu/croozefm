export default class AudioManager {
    private static instance: AudioManager;
    private currentAudio: HTMLAudioElement | null = null;
    private listeners: Set<(audio: HTMLAudioElement | null) => void> = new Set();

    private constructor() {}

    static getInstance(): AudioManager {
      if (!AudioManager.instance) {
        AudioManager.instance = new AudioManager();
      }
      return AudioManager.instance;
    }

    play(audio: HTMLAudioElement) {
      if (this.currentAudio && this.currentAudio !== audio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }

      this.currentAudio = audio;
      audio.play();
      this.notifyListeners();
    }

    pause() {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
        this.notifyListeners();
      }
    }

    isPlaying(audio: HTMLAudioElement): boolean {
      return this.currentAudio === audio;
    }

    addListener(listener: (audio: HTMLAudioElement | null) => void) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }

    private notifyListeners() {
      this.listeners.forEach((listener) => listener(this.currentAudio));
    }
  }