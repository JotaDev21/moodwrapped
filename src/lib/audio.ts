let ctx: AudioContext | null = null;
let crackleSource: AudioBufferSourceNode | null = null;
let crackleGain: GainNode | null = null;
let padOsc1: OscillatorNode | null = null;
let padOsc2: OscillatorNode | null = null;
let padGain: GainNode | null = null;
let musicEl: HTMLAudioElement | null = null;
let musicFadeInterval: ReturnType<typeof setInterval> | null = null;

export function startAmbientAudio() {
  if (ctx) return;
  ctx = new AudioContext();

  const sampleRate = ctx.sampleRate;
  const duration = 4;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
    if (Math.random() < 0.0003) {
      data[i] += (Math.random() * 2 - 1) * 0.15;
    }
  }

  crackleSource = ctx.createBufferSource();
  crackleSource.buffer = buffer;
  crackleSource.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.7;

  crackleGain = ctx.createGain();
  crackleGain.gain.value = 0;
  crackleGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 2);

  crackleSource.connect(filter);
  filter.connect(crackleGain);
  crackleGain.connect(ctx.destination);
  crackleSource.start();
}

export function startPad() {
  if (!ctx) return;

  padGain = ctx.createGain();
  padGain.gain.value = 0;
  padGain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 3);

  padOsc1 = ctx.createOscillator();
  padOsc1.type = "sine";
  padOsc1.frequency.value = 110;

  padOsc2 = ctx.createOscillator();
  padOsc2.type = "sine";
  padOsc2.frequency.value = 112.5;

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.15;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.008;
  lfo.connect(lfoGain);
  lfoGain.connect(padGain.gain);
  lfo.start();

  padOsc1.connect(padGain);
  padOsc2.connect(padGain);
  padGain.connect(ctx.destination);
  padOsc1.start();
  padOsc2.start();
}

export function startMusic(): boolean {
  if (musicEl && !musicEl.paused) return true;

  if (!musicEl) {
    musicEl = new Audio("/music.mp3");
    musicEl.volume = 0;
    musicEl.loop = true;
  }

  let started = false;
  musicEl.play().then(() => {
    started = true;
    let vol = 0;
    const fade = setInterval(() => {
      vol = Math.min(vol + 0.01, 0.5);
      if (musicEl) musicEl.volume = vol;
      if (vol >= 0.5) clearInterval(fade);
    }, 80);
  }).catch(() => {});

  return started;
}

function clearMusicFade() {
  if (musicFadeInterval) {
    clearInterval(musicFadeInterval);
    musicFadeInterval = null;
  }
}

export function silenceAll() {
  if (!ctx) return;
  const now = ctx.currentTime;
  crackleGain?.gain.linearRampToValueAtTime(0, now + 0.5);
  padGain?.gain.linearRampToValueAtTime(0, now + 0.5);
  if (musicEl) {
    clearMusicFade();
    const el = musicEl;
    musicFadeInterval = setInterval(() => {
      el.volume = Math.max(el.volume - 0.02, 0);
      if (el.volume <= 0) clearMusicFade();
    }, 50);
  }
}

export function resumeAll() {
  if (!ctx) return;
  const now = ctx.currentTime;
  crackleGain?.gain.linearRampToValueAtTime(0.07, now + 1);
  padGain?.gain.linearRampToValueAtTime(0.025, now + 1);
  if (musicEl) {
    clearMusicFade();
    const el = musicEl;
    musicFadeInterval = setInterval(() => {
      el.volume = Math.min(el.volume + 0.01, 0.5);
      if (el.volume >= 0.5) clearMusicFade();
    }, 80);
  }
}

export function getMusicElement(): HTMLAudioElement | null {
  return musicEl;
}

export function pauseMusic() {
  if (musicEl && !musicEl.paused) {
    musicEl.pause();
  }
}

export function playMusic() {
  if (musicEl && musicEl.paused) {
    musicEl.play().catch(() => {});
  }
}

export function seekMusic(seconds: number) {
  if (musicEl) {
    musicEl.currentTime = Math.max(0, Math.min(seconds, musicEl.duration || 0));
  }
}

export function getMusicTime(): number {
  return musicEl ? musicEl.currentTime : 0;
}

export function isMusicPlaying(): boolean {
  return musicEl ? !musicEl.paused : false;
}

export function cleanup() {
  crackleSource?.stop();
  padOsc1?.stop();
  padOsc2?.stop();
  ctx?.close();
  ctx = null;
  if (musicEl) {
    musicEl.pause();
    musicEl = null;
  }
}
