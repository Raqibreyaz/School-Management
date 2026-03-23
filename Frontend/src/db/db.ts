import Dexie, { type EntityTable } from 'dexie';

export interface SchoolConfig {
  id: number; // Always 1
  schoolName: string;
  schoolAddress: string;
  contactInfo: string;
  logoUrl: string | null;
  themeColor: string;
  templateId: string;
  isSetupComplete: boolean;
}

export interface StudentResult {
  id?: number;
  student_name: string;
  student_class: string;
  batch: string;
  roll_no: string;
  note?: string;
  subjects: { subject_name: string; marks_got: number; marks_from: number }[];
  createdAt: string;
}

const db = new Dexie('SchoolDB') as Dexie & {
  config: EntityTable<
    SchoolConfig,
    'id'
  >;
  results: EntityTable<
    StudentResult,
    'id'
  >;
};

// Schema declaration:
db.version(1).stores({
  config: 'id', // Primary key
  results: '++id, student_name, student_class, batch, roll_no, *createdAt' // Primary key and indexed props
});

export { db };
