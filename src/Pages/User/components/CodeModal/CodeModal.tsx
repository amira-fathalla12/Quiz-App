import { Button, Modal } from "flowbite-react";
import { CheckIcon, CopyIcon } from "../../../components/SvgIcons/SvgIcons";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

type Props = {
  openModal: boolean;
  setOpenModal: () => void;
  title: string;
  code: string;
};
const CodeModal = ({ openModal, setOpenModal, title, code }: Props) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied!");
      },
      (err) => {
        toast.error("Failed to copy!");

        console.error("Failed to copy text: ", err);
      }
    );
  };
  return (
    <div
      className={twMerge(
        `fixed inset-0 flex items-center justify-center  `,
        openModal ? "bg-black/30  z-10" : "hidden"
      )}
    >
      <Modal
        show={openModal}
        className="mx-auto h-fit my-auto w-fit border-0 z-20"
        popup
      >
        <Modal.Header onClick={() => setOpenModal()} />
        <Modal.Body className="">
          <div className="flex  flex-col w-[370px]  justify-center items-center text-center">
            {/* Content */}
            <div className=" flex flex-col gap-2 items-center pb-11 font-Inter">
              <div className="text-4xl">
                <CheckIcon width={"60"} height={"60"} />
              </div>
              <h3 className="text-xl font-bold text-black ">{title}</h3>
              <div
                className="flex justify-between pe-4 border border-black 
                w-[300px] h-10  rounded-full"
              >
                <span className="font-bold text-xl bg-linen py-1 px-4 rounded-l-full ">
                  CODE:
                </span>
                <span className="font-bold text-xl py-1 pe-2">{code}</span>
                <button
                  className="py-1 cursor-pointer"
                  title="Copy"
                  onClick={() => copyToClipboard(code)}
                >
                  <span className="sr-only">Copy Code</span>
                  <CopyIcon />
                </button>
              </div>
            </div>

            <Button
              onClick={() => setOpenModal()}
              className="w-36 h-9  text-gray-700 py-0
                 bg-olive hover:bg-gray-300 rounded-full text-lg"
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CodeModal;
