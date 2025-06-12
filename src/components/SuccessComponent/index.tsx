import Link from 'next/link';
import { RiFileInfoLine } from 'react-icons/ri';
import * as S from './style';

export default function SuccessComponent() {
    return (
        <S.Container>
            <RiFileInfoLine size={50} color='#D3D1FF' />

            <h2>Thank You</h2>
            <p>Your information was submitted to our team of immigration <br /> attorneys. Expect an email from hello@tryalma.ai.</p>


            <Link href="/">
                Go Back to Homepage
            </Link>

        </S.Container>
    )
}
