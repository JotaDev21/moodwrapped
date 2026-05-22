export interface WrappedConfig {
  meta: WrappedMeta;
  emotions: EmotionStat[];
  quotes: Quote[];
  letter: LetterText;
  confessions: string[];
  whatYouAre: string[];
  stats: StatItem[];
  personalLists: PersonalList[];
  song: SongTheme;
  finalMessage: FinalMessage;
}

export interface PersonalList {
  title: string;
  emoji: string;
  items: string[];
}

export interface WrappedMeta {
  recipientName: string;
  partnerName: string;
  year: number;
  title: string;
  subtitle?: string;
  startDate: string;
}

export interface EmotionStat {
  name: string;
  percentage: number;
  color: string;
  icon?: string;
}

export interface Quote {
  text: string;
  context?: string;
  highlight?: boolean;
}

export interface StatItem {
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  computed?: "daysSince";
  computeFrom?: string;
}

export interface MemoryMoment {
  title: string;
  description?: string;
  date?: string;
  image?: string;
  rank?: number;
}

export interface SongTheme {
  title: string;
  artist: string;
  coverImage: string;
  reason: string;
  durationSeconds: number;
  spotifyUrl?: string;
}

export interface LetterText {
  text: string;
}

export interface FinalMessage {
  text: string;
  signature?: string;
}
