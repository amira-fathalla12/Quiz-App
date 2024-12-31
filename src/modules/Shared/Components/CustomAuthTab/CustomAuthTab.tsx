import { Link } from "react-router-dom";

const CustomAuthTab = ({
  icon,
  label,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  border: string;
}) => {
  return (
    <Link
      to={label === "Sign up" ? "/register" : "/login"}
      className={`bg-[#333333] w-[170px] h-[120px] rounded-lg cursor-pointer
         flex flex-col space-y-2 justify-center items-center ${border}`}
    >
      <div className={`${label === "Sign up" && "pl-3"}`}>{icon}</div>
      <span className="font-bold">{label}</span>
    </Link>
  );
};

export default CustomAuthTab;
