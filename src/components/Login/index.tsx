import Input from '@/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import * as S from './styles';


const schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
} as const);


type FormData = yup.InferType<typeof schema>;

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const [error, setError] = useState('');
    const router = useRouter();


    const onSubmit = async (data: FormData) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', responseData.token);
                router.push('/admin');
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError('Login failed');
        }
    };

    return (
        <S.Container>
            <h1>Admin Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">

                    <Input placeholder='Username' id="username" {...register('username')} />

                    {errors.username && <span className="error-message">{errors.username.message}</span>}
                </div>
                <div className="form-group">

                    <Input placeholder='Password' id="password" type="password" {...register('password')} />

                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <button type="submit">Login</button>
            </form>

            {error && <div className="error-message">{error}</div>}
        </S.Container>
    );
}