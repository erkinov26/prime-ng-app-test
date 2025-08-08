export interface InputFieldsI {
  controlName: string;
  type: 'select' | 'number' | 'text' | 'checkbox' | 'date';
  placeholder: string;
  label: string;
  options?: { name: string; code: string }[];
  class?: string;
  disabled?: boolean;
}
