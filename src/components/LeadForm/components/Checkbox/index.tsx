import React from 'react';
import * as S from './style';


interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Checkbox(props: CheckboxProps) {
    const { label, ...restProps } = props;
    return (
        <S.Container>
            <input
                {...restProps}
            />
            <label htmlFor={`visa-${label}`}>{label}</label>
        </S.Container>
    )
}
