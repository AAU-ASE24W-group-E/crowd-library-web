export interface Book {
    id?: string;
    title: string;
    author: string;
    isbn: string;
    publishYear?: number;
    coverId: string;
    edition: string;
    authors: string[];
    languages: string[];
  }