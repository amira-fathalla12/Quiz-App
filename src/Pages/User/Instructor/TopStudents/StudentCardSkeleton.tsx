import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StudentCardSkeleton() {
  return (
    <div className="w-full mt-5">
      <div className="flex h-[70px] border border-gray-300 rounded-[10px]">
        <div className="w-[70px] h-full rounded-[10px] mt-[-3.5px] p-1 flex-shrink-0">
          <Skeleton width={"100%"} height={"100%"} />
        </div>

        <div className="flex items-center justify-between w-full px-3">
          <div>
            <h6 className="text-lg font-bold">
              <Skeleton width={150} />
            </h6>

            <div className="flex gap-[10px] mt-1">
              <Skeleton width={80} height={12} />
              <Skeleton width={10} height={12} />
              <Skeleton width={80} height={12} />
            </div>
          </div>

          <div>
            <Skeleton circle={true} width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}