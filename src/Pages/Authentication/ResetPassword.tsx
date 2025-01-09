import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from './Components/CustomInput/CustomInput';
import { getRequiredMessage } from '../../services/validations';
import { CheckIcon } from '../components/SvgIcons/SvgIcons';
import CustomPasswordInput from './Components/CustomPasswordInput/CustomPasswordInput';
import { useResetPasswordMutation } from '../../redux/apis/apis';
import Spinner from '../components/Spinner/Spinner';
import { ApiError } from '../../services/interfaces';

export interface IFormInput {
	email: string;
	otp: string;
	password: string;
	passwordConf: string;
}

export const ResetPassword = () => {
	const navigate = useNavigate();
	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
	} = useForm<IFormInput>({
		mode: 'onChange',
	});
	const email = useLocation()?.state?.email;

	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const onSubmit = async (data: IFormInput) => {
		console.log(data);
		try {
			const result = await resetPassword(data).unwrap();
			console.log(result);
			if (result.message) {
				toast.success(result.message);
				navigate('/login', {
					state: { email: data.email, password: data.password },
				});
			}
		} catch (err: unknown) {
			const error = err as ApiError;
			toast.error(error.data?.message || 'Something went wrong');
		}
	};

	return (
		<>
			<h3 className='auth-label mb-9'>Reset Password</h3>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<CustomInput
					type='email'
					label='Your email address'
					register={register('email')}
					inputId='email'
					readonly={true}
					value={email}
				/>
				<CustomInput
					type='text'
					label='OTP'
					placeholder='OTP'
					register={register('otp', { required: getRequiredMessage('OTP') })}
					isError={errors.otp}
					errorMessage={errors?.otp?.message}
					inputId='otp'
				/>
				<CustomPasswordInput
					label='Password'
					register={register('password', {
						required: getRequiredMessage('Password'),
					})}
					placeholder='Type your password'
					isError={errors.password}
					errorMessage={errors?.password?.message}
					inputId='password'
				/>
				<button
					type='submit'
					disabled={isSubmitting || isLoading}
					className='auth-button'
				>
					{isLoading ? (
						<Spinner size='h-4 w-4' color='border-gray-900' />
					) : (
						<>
							Reset <CheckIcon />
						</>
					)}
				</button>
			</form>
		</>
	);
};
