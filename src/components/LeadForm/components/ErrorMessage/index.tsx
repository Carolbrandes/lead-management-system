import * as S from './styles'

interface ErrorMessageProps {
    message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <S.Message>
            {message}
        </S.Message>
    )
}
