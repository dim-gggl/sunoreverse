
export interface SunoPrompt {
  genre: string;
  vocalStyle: string;
  instruments: string;
  productionStyle: string;
  mood: string;
  tempo: string;
}

export type InputMode = 'file' | 'url';

export interface AnalysisState {
  loading: boolean;
  error: string | null;
  result: SunoPrompt | null;
  rawMarkdown: string;
}
