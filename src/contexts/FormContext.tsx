import React, { createContext, Dispatch, ReactNode, useReducer, useState } from 'react';

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    linkedIn: string;
    country: string;
    visas: string[];
    resume: File | null;
    additionalInfo: string;
}

type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: any }
    | { type: 'SET_VISAS'; value: string[] }
    | { type: 'RESET_FORM' }

const initialState: FormState = {
    firstName: '',
    lastName: '',
    email: '',
    linkedIn: '',
    country: '',
    visas: [],
    resume: null,
    additionalInfo: '',
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_VISAS':
            return { ...state, visas: action.value };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}

interface FormContextProps {
    state: FormState;
    dispatch: Dispatch<Action>;
    errors: Record<string, any>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const FormContext = createContext<Partial<FormContextProps>>({});

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const [errors, setErrors] = useState<Record<string, any>>({});

    return (
        <FormContext.Provider value={{
            state, dispatch, errors,
            setErrors
        }}>
            {children}
        </FormContext.Provider>
    );
};