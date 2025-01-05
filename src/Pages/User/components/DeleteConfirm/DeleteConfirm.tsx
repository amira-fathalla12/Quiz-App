import { Button, Modal } from "flowbite-react";
import deleteImg from "../../../../assets/Images/delete.png";
import { DeleteModalType } from "../../../../services/interfaces";

export const DeleteConfirm = ({
  setOpenModal,
  openModal,
  loading,
  onConfirm,
  title,
  modalRef,
}: DeleteModalType) => {
  return (
    <Modal show={openModal} className="max-w-[600px] mx-auto pt-8" popup ref={modalRef}>
      <Modal.Header onClick={() => setOpenModal(false)} />
      <Modal.Body >
        <div className="text-center">
          {/* Image */}
          <div className="flex justify-center">
            <img className="w-3/4 my-4" src={deleteImg} alt="Delete Confirmation" />
          </div>

          {/* Confirmation text */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {`Are you sure you want to delete this ${title}?`}
          </h3>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              disabled={loading}
              color="failure"
              onClick={onConfirm}
              className="w-1/2 h-12 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg"
            >
              {loading ? (
                <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Yes, I'm sure"
              )}
            </Button>
            <Button
              color="gray"
              onClick={() => setOpenModal(false)}
              className="w-1/2 h-12 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md text-lg"
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
