export interface SentenceAnalysis {
  word: string;
  transliteration?: string;
  translation: string;
  grammarRole?: 'Mubtada\'' | 'Khobar' | 'Fa\'il' | 'Ma\'ful Bihi' | 'Sifat' | 'Mudhaf Ilaih' | 'Harf Jarr' | 'Isim Majrur' | string;
  explanation?: string;
}

export interface MaterialDetail {
  id: string; // "01", "02", etc.
  title: string; // e.g. "Bagian - 1"
  subTitle: string; // e.g. "Kitab Pengantar & Thaharah"
  arabicText: string; // The pure vowelled Arabic passage
  translationIndo: string; // Seamless Indonesian translation
  explanation: string; // Interactive contextual pedagogical notes
  analysisSample?: SentenceAnalysis[]; // Word-by-word interactive lookup for Al-Miftah method
}
