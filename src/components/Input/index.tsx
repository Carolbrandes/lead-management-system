import React from 'react';
import * as S from './style';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className: string
    isError: boolean
}

export default function Input(props: InputProps) {
    const { className, isError, ...restProps } = props;

    return (
        <S.Input
            isError={isError}
            className={className}
            {...restProps}
        />
    )
}
