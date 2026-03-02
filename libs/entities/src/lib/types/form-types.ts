export type FormFieldType = 'text' | 'number' | 'select';

export interface FormField {
    id: string;
    type: FormFieldType;
    label: string;
}
