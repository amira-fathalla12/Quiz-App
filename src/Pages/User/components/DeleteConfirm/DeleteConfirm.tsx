import { Button, Modal } from "flowbite-react";
import deleteImg from "../../../../assets/Images/delete.png";
import { DeleteModalType } from "../../../../services/interfaces";

export const DeleteConfirm = ({
  onConfirm,
  title,
  openModal,
  setOpenModal,
  modalRef,
  loading,
}: DeleteModalType) => {
  console.log(openModal);
  return (
    <>
      <Modal show={openModal} size="md" popup ref={modalRef}>
        <Modal.Header onClick={() => setOpenModal(false)} />
        <Modal.Body>
          <div className="text-center">
            <div className="flex justify-center">
              <img className="w-3/4" src={deleteImg} alt="Delete Confirmation" />
            </div>

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {`Are you sure you want to delete this ${title}?`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button disabled={loading} color="failure" onClick={onConfirm}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
