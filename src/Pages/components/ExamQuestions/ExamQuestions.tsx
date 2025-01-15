import { useParams } from 'react-router-dom';
import { useGetQuizWithoutAnswersQuery } from '../../../redux/apis/apis';
import Spinner from '../Spinner/Spinner';

export default function ExamQuestions() {
	const { id } = useParams();
	const { data, isLoading: isFetchingQuiz } = useGetQuizWithoutAnswersQuery(
		id!
	);
	const quiz = data?.data;

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const questionsList = quiz?.questions.map((question, i) => (
		<div
			key={question._id}
			className='w-[40%] border-black border-2 rounded-md p-2'
		>
			<p className='font-semibold text-base'>
				{`${i + 1}- `} {question.title}
			</p>
			{Object.values(question.options).map((option: string, i: number) => {
				if (i < 4) {
					return (
						<div key={i}>
							<input
								type='radio'
								id={option}
								value={option}
								name={question._id}
							/>
							<label htmlFor={option} className='ps-1 font-medium'>
								{option}
							</label>
						</div>
					);
				}
			})}
		</div>
	));

	return (
		<div className='mt-4 px-10'>
			{isFetchingQuiz && (
				<div className='text-center'>
					<Spinner size='h-20 w-20' />
				</div>
			)}
			{quiz && (
				<>
					<h1 className='font-extrabold'>{quiz?.title}</h1>
					<form>
						<div className='flex flex-wrap justify-center gap-4'>
							{questionsList}
						</div>
						<button
							className='text-gray-700 py-2 px-4 bg-olive rounded-md text-lg block mt-4 mx-auto'
							type='submit'
							onClick={handleSubmit}
						>
							Submit
						</button>
					</form>
				</>
			)}
		</div>
	);
}
