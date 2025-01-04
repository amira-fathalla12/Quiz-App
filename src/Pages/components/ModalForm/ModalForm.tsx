import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import { ReactNode } from 'react';
import { CloseIcon, SaveIcon } from '../SvgIcons/SvgIcons';
import { UseFormHandleSubmit } from 'react-hook-form';
import { Question } from '../../../services/interfaces';
import Spinner from '../Spinner/Spinner';

interface ModalI {
	isOpen: boolean;
	closeModal: () => void;
	title: string;
	handleSubmit: UseFormHandleSubmit<Question, undefined>;
	onSubmit: (data: Question) => Promise<void>;
	children: ReactNode;
	isSubmitting?: boolean;
	isLoading?: boolean;
}

export default function Modal({
	isOpen,
	closeModal,
	children,
	title,
	onSubmit,
	handleSubmit,
	isSubmitting,
	isLoading,
}: ModalI) {
	return (
		<>
			<Dialog
				open={isOpen}
				as='div'
				className='relative z-10 focus:outline-none'
				onClose={close}
				__demoMode
			>
				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4'>
						<DialogBackdrop className='fixed inset-0 bg-black/30' />
						<DialogPanel
							transition
							className='w-full max-w-3xl rounded-xl bg-white p- backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
						>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='pl-12 flex justify-between items-center border-b-[1px] border-[#0000004D] '>
									<DialogTitle
										as='h3'
										className='font-bold text-xl my-10 text-black'
									>
										{title}
									</DialogTitle>
									<div className='my-10'>
										<button
											className='border-l border-[#0000004D] px-9'
											type='submit'
											disabled={isSubmitting || isLoading}
										>
											{isLoading ? (
												<Spinner size='h-4 w-4' color='border-gray-900' />
											) : (
												<>
													<SaveIcon />
												</>
											)}
										</button>
										<button
											className='border-l border-[#0000004D] px-9'
											type='button'
											onClick={closeModal}
										>
											<CloseIcon />
										</button>
									</div>
								</div>

								<div className='mt-4 px-12 py-4'>{children}</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
