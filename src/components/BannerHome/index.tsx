import Image from 'next/image';
import * as S from "./styles";

export default function BannerHome() {
    return (
        <S.Container>
            <div>
                <Image
                    src="/images/logo.png"
                    alt="Logo alma"
                    width={65}
                    height={23}
                />

                <h1>Get An Assessment <br /> Of Your Immigration Case</h1>
            </div>

        </S.Container>
    )
}
