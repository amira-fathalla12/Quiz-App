import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from './Components/CustomInput/CustomInput';
import { emailValidation } from '../../services/validations';
import { CheckIcon } from '../components/SvgIcons/SvgIcons';
import { useForgetPasswordMutation } from '../../redux/apis/apis';
import Spinner from '../components/Spinner/Spinner';
import { ApiError } from '../../services/interfaces';

interface IFormInput {
	email: string;
}

export const ForgetPassword = () => {
	const navigate = useNavigate();
	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
	} = useForm<IFormInput>({
		mode: 'onChange',
	});

	const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

	const onSubmit = async (data: IFormInput) => {
		// console.log(data);
		try {
			const result = await forgetPassword(data).unwrap();
			console.log(result);
			if (result.message) {
				toast.success(result.message);
				navigate('/reset-password', { state: { email: data.email } });
			}
		} catch (err: unknown) {
			const error = err as ApiError;
			console.log(error);
			toast.error(error.data?.message[0] || 'Something went wrong');
		}
	};

	return (
		<>
			<h3 className='auth-label mb-16'>Forgot Password</h3>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-20'>
				<CustomInput
					type='email'
					label='Email address'
					placeholder='Type your email'
					register={register('email', emailValidation)}
					isError={errors.email}
					errorMessage={errors?.email?.message}
					inputId='email'
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
							Send Email
							<CheckIcon />
						</>
					)}
				</button>
			</form>
			<div className='flex justify-end mt-24'>
				<span>
					Login?{' '}
					<Link to='/login'>
						<span className='text-olive underline font-bold'>click here</span>
					</Link>
				</span>
			</div>
		</>
	);
};
