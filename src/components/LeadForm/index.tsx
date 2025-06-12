

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


const visaOptions = [
    'H-1B', 'L-1', 'O-1', 'TN', 'E-2', 'E-3', 'F-1 OPT', 'J-1', 'Green Card', 'Other'
];

export interface Country {
    name: {
        official: string
    }
}

export default function LeadForm() {
    const { state, dispatch, errors } = useContext(FormContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countries, setCountries] = useState<Country[]>([])

    const router = useRouter();

    const getCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            const countries = await response.json();


            const countriesByAlphabeticOrder = countries.sort((a, b) => {
                if (a.name.official < b.name.official) return -1;
                if (a.name.official > b.name.official) return 1;
                return 0;
            }).map((country) => country.name.official)


            setCountries(countriesByAlphabeticOrder)
        } catch (error) {
            console.error('Erro ao buscar países:', error);
            return { props: { countries: [] } };
        }
    }


    const handleChange = (field: keyof typeof state, value: any) => {
        dispatch({ type: 'SET_FIELD', field, value });
    };

    const handleCheckboxChange = (visa: string, checked: boolean) => {
        const newVisas = checked
            ? [...state.visas, visa]
            : state.visas.filter((v) => v !== visa);
        dispatch({ type: 'SET_VISAS', value: newVisas });
    };

    const handleFileChange = (file: File | null) => {
        if (file) {
            dispatch({ type: 'SET_RESUME', value: file });
        }
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

    useEffect(() => {
        getCountries()
    }, [])



    return (
        <S.Container>
            <S.Form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >

                <S.IntroText>
                    <RiFileInfoLine size={50} color='#D3D1FF' />
                    <h2>Want to understand your visa options?</h2>
                    <p>Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.</p>
                </S.IntroText>


                {/* First Name */}
                <S.FieldForm>
                    <Input
                        placeholder='First Name'
                        id="firstName"
                        value={state.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        isError={errors.firstName ? true : false}
                    />

                    {
                        errors.firstName &&

                        <ErrorMessage message={errors.firstName.message} />
                    }
                </S.FieldForm>

                {/* Last Name */}
                <S.FieldForm>
                    <Input
                        placeholder='Last Name'
                        id="lastName"
                        value={state.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        isError={errors.lastName ? true : false}
                    />
                    {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
                </S.FieldForm>

                {/* Email */}
                <S.FieldForm>
                    <Input
                        placeholder='Email'
                        id="email"
                        type="email"
                        value={state.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        isError={errors.email ? true : false}
                    />
                    {errors.email && <ErrorMessage message={errors.email.message} />}
                </S.FieldForm>

                {/* Country of Citizenship */}
                {
                    countries && <S.FieldForm>
                        <Select
                            value={state.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            options={countries}
                            placeholder='Country of Citizenship'
                        />

                        {errors.country && <span className="error-message">{errors.country.message}</span>}
                    </S.FieldForm>
                }

                {/* LinkedIn */}
                <S.FieldForm>
                    <Input
                        placeholder='Linkedin / Personal Website URL'
                        id="linkedIn"
                        type="url"
                        value={state.linkedIn}
                        onChange={(e) => handleChange('linkedIn', e.target.value)}
                        isError={errors.linkedIn ? true : false}
                    />
                    {errors.linkedIn && <ErrorMessage message={errors.linkedIn.message} />}
                </S.FieldForm>

                {/* Resume Upload */}
                <S.FieldForm>
                    <S.InputFileContainer>

                        <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    handleFileChange(e.target.files[0]);
                                }
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

                    {/* Visas of Interest */}
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



                {/* Additional Info */}
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

                {/* Submit Button */}
                <S.ButtonSubmit type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </S.ButtonSubmit>
            </S.Form>
        </S.Container>
    )
}