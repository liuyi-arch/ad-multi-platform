/**
 * 动态表单类型定义
 */

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radio' | 'date';

export interface FormField {
    id: string;
    name: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    defaultValue?: any;
    options?: { label: string; value: any }[];
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
}

export interface FormConfig {
    id: string;
    name: string;
    description?: string;
    fields: FormField[];
    createdAt: Date;
    updatedAt: Date;
}

export interface FormData {
    id: string;
    formId: string;
    data: Record<string, any>;
    submittedAt: Date;
}
