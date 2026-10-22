export interface UltrasoundAtlasTopic {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  images: string[];
  videos?: string[];
}

export interface UltrasoundAtlasChapter {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  topics: UltrasoundAtlasTopic[];
}
