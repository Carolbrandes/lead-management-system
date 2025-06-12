import { FormContext } from '@/contexts/FormContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { IoDice } from "react-icons/io5";
import { RiFileInfoLine } from "react-icons/ri";
import Input from '../Input';
import Checkbox from './components/Checkbox';
import ErrorMessage from './components/ErrorMessage';
import Select from './components/Select';
import * as S from './styles';

type FormFieldValue = string | File | null;
type VisaType = typeof visaOptions[number];

const visaOptions = [
    'H-1B', 'L-1', 'O-1', 'TN', 'E-2', 'E-3', 'F-1 OPT', 'J-1', 'Green Card', 'Other'
] as const;

export interface Country {
    name: {
        official: string;
    };
}

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    linkedIn: string;
    visas: VisaType[];
    resume: File | null;
    additionalInfo: string;
}

type FormAction =
    | { type: 'SET_FIELD'; field: keyof FormState; value: FormFieldValue }
    | { type: 'SET_VISAS'; value: VisaType[] }
    | { type: 'SET_RESUME'; value: File | null }
    | { type: 'RESET_FORM' };

interface FormErrors {
    firstName?: { message: string };
    lastName?: { message: string };
    email?: { message: string };
    country?: { message: string };
    linkedIn?: { message: string };
}

interface FormContextType {
    state: FormState;
    dispatch: (action: FormAction) => void;
    errors: FormErrors;
}

export default function LeadForm() {
    const formContext = useContext(FormContext) as FormContextType;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countries, setCountries] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
                const countries: Country[] = await response.json();

                const countriesByAlphabeticOrder = countries
                    .sort((a: Country, b: Country) => {
                        if (a.name.official < b.name.official) return -1;
                        if (a.name.official > b.name.official) return 1;
                        return 0;
                    })
                    .map((country) => country.name.official);

                setCountries(countriesByAlphabeticOrder);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setCountries([]);
            }
        };

        getCountries();
    }, []);

    if (!formContext) {
        return <div>Loading...</div>;
    }

    const { state, dispatch, errors } = formContext;

    const handleChange = (field: keyof FormState, value: FormFieldValue) => {
        dispatch({ type: 'SET_FIELD', field, value });
    };

    const handleCheckboxChange = (visa: VisaType, checked: boolean) => {
        const newVisas = checked
            ? [...state.visas, visa]
            : state.visas.filter((v) => v !== visa);
        dispatch({ type: 'SET_VISAS', value: newVisas });
    };

    const handleFileChange = (file: File | null) => {
        dispatch({ type: 'SET_RESUME', value: file });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('firstName', state.firstName);
            formData.append('lastName', state.lastName);
            formData.append('email', state.email);
            formData.append('linkedIn', state.linkedIn);
            formData.append('visas', JSON.stringify(state.visas));
            if (state.resume) {
                formData.append('resume', state.resume);
            }
            formData.append('additionalInfo', state.additionalInfo);

            const response = await fetch('/api/leads', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                dispatch({ type: 'RESET_FORM' });
                router.push('/success');
            }
        } catch (error) {
            console.error('Error submitting form', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <S.Container>
            <S.Form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <S.IntroText>
                    <RiFileInfoLine size={50} color='#D3D1FF' />
                    <h2>Want to understand your visa options?</h2>
                    <p>Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.</p>
                </S.IntroText>

                <S.FieldForm>
                    <Input
                        placeholder='First Name'
                        id="firstName"
                        value={state.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        isError={!!errors.firstName}
                    />
                    {errors.firstName && <ErrorMessage message={errors.firstName.message} />}
                </S.FieldForm>

                <S.FieldForm>
                    <Input
                        placeholder='Last Name'
                        id="lastName"
                        value={state.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        isError={!!errors.lastName}
                    />
                    {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
                </S.FieldForm>

                <S.FieldForm>
                    <Input
                        placeholder='Email'
                        id="email"
                        type="email"
                        value={state.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        isError={!!errors.email}
                    />
                    {errors.email && <ErrorMessage message={errors.email.message} />}
                </S.FieldForm>

                {countries.length > 0 && (
                    <S.FieldForm>
                        <Select
                            value={state.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            options={countries}
                            placeholder='Country of Citizenship'
                        />
                        {errors.country && <span className="error-message">{errors.country.message}</span>}
                    </S.FieldForm>
                )}

                <S.FieldForm>
                    <Input
                        placeholder='Linkedin / Personal Website URL'
                        id="linkedIn"
                        type="url"
                        value={state.linkedIn}
                        onChange={(e) => handleChange('linkedIn', e.target.value)}
                        isError={!!errors.linkedIn}
                    />
                    {errors.linkedIn && <ErrorMessage message={errors.linkedIn.message} />}
                </S.FieldForm>

                <S.FieldForm>
                    <S.InputFileContainer>
                        <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                handleFileChange(e.target.files?.[0] || null);
                            }}
                        />
                        <label htmlFor="resume">Resume/CV</label>
                    </S.InputFileContainer>
                </S.FieldForm>

                <S.VisaSection>
                    <div className="visaTitle">
                        <IoDice size={50} color='#D3D1FF' />
                        <h2>Visa Categories of Interest?</h2>
                    </div>

                    <S.CheckboxVisa>
                        {visaOptions.map((visa) => (
                            <Checkbox
                                key={visa}
                                type="checkbox"
                                id={`visa-${visa}`}
                                checked={state.visas.includes(visa)}
                                onChange={(e) => handleCheckboxChange(visa, e.target.checked)}
                                label={visa}
                            />
                        ))}
                    </S.CheckboxVisa>
                </S.VisaSection>

                <S.SectionHelp>
                    <FaHeart size={50} color='#D3D1FF' />
                    <label htmlFor="additionalInfo">How can we help you?</label>
                    <textarea
                        id="additionalInfo"
                        rows={4}
                        value={state.additionalInfo}
                        onChange={(e) => handleChange('additionalInfo', e.target.value)}
                    />
                </S.SectionHelp>

                <S.ButtonSubmit type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </S.ButtonSubmit>
            </S.Form>
        </S.Container>
    );
}