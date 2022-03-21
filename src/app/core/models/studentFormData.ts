import { Student } from './student';

export interface StudentFormData {
  isUpdateMode: boolean;
  studentToUpdate?: Student;
  idToCreate?: number;
}
