// Synthesizes authentic Gujarati Dhol and Folk Raas rhythms using the Web Audio API
class GarbaAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private currentTrackTitle: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a bass dhol strike (Dha / Dhum)
  private playDholBass(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.22);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.35);
  }

  // Plays a sharp treble dhol strike (Ta / Takk)
  private playDholTreble(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, time);
    osc.frequency.exponentialRampToValueAtTime(180, time + 0.1);

    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.12);
  }

  // Plays high metallic Manjira / Ghungroo chime
  private playManjiraChime(time: number) {
    if (!this.ctx) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(1850, time);
    osc2.frequency.setValueAtTime(2650, time);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.3);
    osc2.stop(time + 0.3);
  }

  // Plays festive Shehnai / Flute melodic tone
  private playFluteTone(time: number, freq: number, duration: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    // Warm filter for folk flute quality
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, time);

    gain.gain.setValueAtTime(0.01, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  public playTrack(trackTitle: string, onStop?: () => void) {
    this.initContext();
    this.stop();

    this.isPlaying = true;
    this.currentTrackTitle = trackTitle;

    // Raga Bilawal / Khamaj folk scale notes: D4, E4, F#4, G4, A4, B4, C5, D5
    const melodyNotes = [293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 523.25, 587.33];
    let step = 0;
    const tempoMs = 180; // Energetic 3-taali / Dodhiya Garba tempo

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      // 4/4 or 6/8 rhythmic Garba bar: 
      // Beat 1: Bass Dhol + Manjira
      // Beat 2: Treble Dhol
      // Beat 3: Treble Dhol + Flute
      // Beat 4: Double Bass Dhol + Manjira
      if (step % 4 === 0) {
        this.playDholBass(now);
        this.playManjiraChime(now);
      } else if (step % 4 === 1) {
        this.playDholTreble(now);
      } else if (step % 4 === 2) {
        this.playDholTreble(now);
        this.playManjiraChime(now);
      } else if (step % 4 === 3) {
        this.playDholBass(now);
        this.playDholTreble(now + 0.08);
      }

      // Melodic accompaniment
      if (step % 2 === 0) {
        const noteIndex = (step / 2) % melodyNotes.length;
        const noteFreq = melodyNotes[noteIndex];
        this.playFluteTone(now, noteFreq, 0.3);
      }

      step++;
      // Auto-stop after 25 seconds if not paused
      if (step > 140) {
        this.stop();
        if (onStop) onStop();
      }
    }, tempoMs);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackTitle = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getPlayingTrack(): string | null {
    return this.isPlaying ? this.currentTrackTitle : null;
  }
}

export const garbaAudio = new GarbaAudioPlayer();
