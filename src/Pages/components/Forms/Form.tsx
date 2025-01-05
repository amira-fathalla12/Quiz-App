import { Select } from '@headlessui/react';
import CustomFormInput from '../CustomFormInput/CustomFormInput';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Question } from '../../../services/interfaces';
import { getRequiredMessage } from '../../../services/validations';

interface Iprops {
	register: UseFormRegister<Question>;
	errors: FieldErrors<Question>;
}

const Form = ({ register, errors }: Iprops) => {
	return (
		<>
			<h3 className='mb-2 font-medium text-lg'>Details</h3>
			<CustomFormInput
				label='Title'
				width='w-full'
				register={register('title', { required: getRequiredMessage('title') })}
				isError={errors?.title}
				errorMessage={errors?.title?.message}
			/>
			<div className='mb-2 w-full flex overflow-hidden'>
				<label className='flex-shrink-0 flex items-center p-2.5 pointer-events-none border-y border-l border-[#0000004D] bg-linen rounded-l-lg font-bold'>
					Description
				</label>
				<textarea
					className='block w-full p-2.5 border-y border-r border-[#0000004D] rounded-r-lg resize-none'
					{...register('description', {
						required: getRequiredMessage('Description'),
					})}
					name='description'
				></textarea>
			</div>
			<div className='flex flex-wrap justify-between'>
				<CustomFormInput
					label='A'
					width='w-[49%]'
					register={register('options.A', {
						required: getRequiredMessage('option A'),
					})}
					isError={errors?.options?.A}
					errorMessage={errors?.options?.A?.message}
				/>
				<CustomFormInput
					label='B'
					width='w-[49%]'
					register={register('options.B', {
						required: getRequiredMessage('option B'),
					})}
					isError={errors?.options?.B}
					errorMessage={errors?.options?.B?.message}
				/>
				<CustomFormInput
					label='C'
					width='w-[49%]'
					register={register('options.C', {
						required: getRequiredMessage('option C'),
					})}
					isError={errors?.options?.C}
					errorMessage={errors?.options?.C?.message}
				/>
				<CustomFormInput
					label='D'
					width='w-[49%]'
					register={register('options.D', {
						required: getRequiredMessage('option D'),
					})}
					isError={errors?.options?.D}
					errorMessage={errors?.options?.D?.message}
				/>
			</div>
			<div className='flex flex-wrap justify-between'>
				<CustomFormInput
					label='Right Answer'
					width='w-[49%]'
					register={register('answer', {
						required: getRequiredMessage('Correct answer'),
					})}
					isError={errors?.answer}
					errorMessage={errors?.answer?.message}
				/>
				<div className='mb-2 w-[49%] flex overflow-hidden'>
					<label className='flex-shrink-0 flex items-center p-2.5 pointer-events-none border-y border-l border-[#0000004D] bg-linen rounded-l-lg font-bold'>
						Category type
					</label>

					<Select
						className='block w-full p-2.5 border-y border-r border-[#0000004D] rounded-r-lg'
						{...register('type')}
					>
						<option value='FE'>FE</option>
						<option value='BE'>BE</option>
						<option value='DO'>DO</option>
					</Select>
				</div>
			</div>
		</>
	);
};

export default Form;
