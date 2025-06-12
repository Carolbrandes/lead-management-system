import React from 'react'
import * as S from './styles'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[]
    placeholder: string
}

export default function Select({ options, placeholder, ...rest }: SelectProps) {
    return (
        <S.Select {...rest}>
            <option value="">{placeholder}</option>
            {options && Array.isArray(options) && options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </S.Select>
    )
}

