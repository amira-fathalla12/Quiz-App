import success from '../../../assets/Images/success.png';
import fail from '../../../assets/Images/fail.png';
import noResult from '../../../assets/Images/no result.png';
import { Link, useLocation } from 'react-router-dom';

export const Results = () => {
  const location = useLocation();
  const score = location.state?.score;
console.log(score);


if(score == undefined) {
  console.log('hel');
  
}

  if (score === null) {
    return <p>Loading...</p>
  }

  return (
    <div className='w-1/3 mx-auto text-center'>
      <img className='w-full' src={score > 50 ? success :score == undefined ? noResult: fail} alt="student vector" />
      {score &&       <h1 className='text-[3rem]'>Your score is {score}</h1>
 }
      <p> { score == undefined ? 'No score found yet !' :score > 50 ? 'Great Job! You have passed the quiz' : score == 50 ? 'You’re halfway there! just a bit more effort, and you’ll reach your goal.' : 'Keep pushing forward, and don’t be afraid to try again. Success is just around the corner!'}</p>
      <Link className='bg-olive p-2 my-2 block w-1/2 mx-auto rounded-md' to={'/quzzies'}> Join Quiz </Link>
    </div>
  );
};
