import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/store";
import { openModal } from "../../../../redux/slices/modalSlice";

const CustomQuizesTab = ({
  icon,
  label,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  border: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (label === "Question Bank") {
      navigate("/questions");
    } else {
      dispatch(openModal());
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border w-[200px] h-[150px] rounded-lg cursor-pointer
         flex flex-col space-y-2 justify-center items-center ${border}`}
    >
      <div className={`${label === "Sign up" && "pl-3"}`}>{icon}</div>
      <span className="font-bold text-xl">{label}</span>
    </div>
  );
};

export default CustomQuizesTab;
