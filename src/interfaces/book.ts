export interface Book {
  id?: string;
  title: string;
  isbn: string;
  publisher: string;
  publishYear?: number;
  coverId: string;
  edition: string;
  format: string;
  authors: string[];
  languages: string[];
}