'use client';

import React, { createContext, useContext, useReducer } from 'react';

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'radio' | 'checkbox';
  required: boolean;
  options?: string[];
}

export interface RsvpFormData {
  partner1Name: string;
  partner2Name: string;
  eventDate: string;
  selectedThemeId: string;
  coverImageUrl: string | null;
  coverImageFile: File | null;
  customFields: CustomField[];
}

type SetFieldValue = {
  [K in keyof RsvpFormData]: { field: K; value: RsvpFormData[K] };
};

type Action =
  | { type: 'SET_FIELD' } & SetFieldValue[keyof SetFieldValue]
  | { type: 'ADD_FIELD'; field: CustomField }
  | { type: 'UPDATE_FIELD'; id: string; updates: Partial<CustomField> }
  | { type: 'REMOVE_FIELD'; id: string }
  | { type: 'DUPLICATE_FIELD'; id: string }
  | { type: 'LOAD'; data: RsvpFormData };

const initialState: RsvpFormData = {
  partner1Name: '',
  partner2Name: '',
  eventDate: '',
  selectedThemeId: 'classic-navy',
  coverImageUrl: null,
  coverImageFile: null,
  customFields: [],
};

function reducer(state: RsvpFormData, action: Action): RsvpFormData {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_FIELD':
      return { ...state, customFields: [...state.customFields, action.field] };
    case 'UPDATE_FIELD':
      return {
        ...state,
        customFields: state.customFields.map((f) =>
          f.id === action.id ? { ...f, ...action.updates } : f,
        ),
      };
    case 'REMOVE_FIELD':
      return {
        ...state,
        customFields: state.customFields.filter((f) => f.id !== action.id),
      };
    case 'DUPLICATE_FIELD': {
      const source = state.customFields.find((f) => f.id === action.id);
      if (!source) return state;
      const duplicate: CustomField = {
        ...source,
        id: crypto.randomUUID(),
        label: `${source.label} (copy)`,
      };
      const sourceIndex = state.customFields.findIndex((f) => f.id === action.id);
      const next = [...state.customFields];
      next.splice(sourceIndex + 1, 0, duplicate);
      return { ...state, customFields: next };
    }
    case 'LOAD':
      return action.data;
    default:
      return state;
  }
}

interface FormBuilderContextValue {
  state: RsvpFormData;
  dispatch: React.Dispatch<Action>;
}

const FormBuilderContext = createContext<FormBuilderContextValue | null>(null);

export function FormBuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder() {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) throw new Error('useFormBuilder must be used within FormBuilderProvider');
  return ctx;
}
