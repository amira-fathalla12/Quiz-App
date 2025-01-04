import { useLocation } from "react-router-dom";
import { PlusIcon } from "../SvgIcons/SvgIcons";

export interface TableHeaderInterface {
  title: string;
  btnText?: string;
  handleClick?: () => void;
}

export default function TableHeader({ title, btnText, handleClick }: TableHeaderInterface) {
  const { pathname } = useLocation();
  const paths = ["/questions", "/groups", "/students"];
  return (
    <div className="flex justify-between items-center mb-2">
      <p className="text-xl font-bold">{title}</p>
      {paths.includes(pathname) && (
        <button className="flex items-center p-2 border border-gray-300 rounded-3xl gap-x-0.5" onClick={handleClick}>
          <PlusIcon />
          {btnText}
        </button>
      )}
    </div>
  );
}
