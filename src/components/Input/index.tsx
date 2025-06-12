import React from 'react';
import * as S from './style';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isError: boolean
}

export default function Input(props: InputProps) {
    const { isError, ...restProps } = props;

    return (
        <S.Input
            isError={isError}
            {...restProps}
        />
    )
}
