import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import PasswordInput from "../PasswordInput/PasswordInput";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonForm from "../ButtonForm/ButtonForm";
import {
  ChangePasswordReguest,
  ChangePasswordResponse,
} from "../../../InterFaces/Interfaces";
import toast from "react-hot-toast";
import { apiClient, AUTHENTICATION_URLS } from "../../../Apis/EndPoints";
import { AxiosError } from "axios";
import { PasswordValidation } from "../../../Validation/Validation";

export default function ChangePasswordModal() {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setFocus,
  } = useForm();

  const onSubmit: SubmitHandler<ChangePasswordReguest> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const { Confirm_Password, ...submitData } = data;

      const response = await apiClient.post<ChangePasswordResponse>(
        AUTHENTICATION_URLS.changePassword,
        submitData
      );

      setOpenModal(false);
      toast.success("Paswword is changed Successfully", {
        id: toastId,
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  useEffect(() => {
    setFocus("password");
  }, []);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Change Password</Button>
      <Modal
        show={openModal}
        size="3xl"
        onClose={() => setOpenModal(false)}
        popup>
        <Modal.Header className="bg-[#0D1321]" />
        <Modal.Body className="bg-[#0D1321]">
          <div>
            <div className="w-[200px]">
              <img src={logo} alt="Logo" />
            </div>
            <p className="font-bold text-2xl text-[#C5D86D] pt-4">
              Change Password
            </p>
            <form
              className="my-7 flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}>
              <PasswordInput
                label="Password"
                error={
                  errors?.password?.message && String(errors.password.message)
                }
                {...register("password", { required: "Password is required" })}
              />
              <PasswordInput
                label="New Password"
                error={
                  errors?.password_new?.message &&
                  String(errors.password_new.message)
                }
                {...register("password_new", PasswordValidation(8))}
              />
              <PasswordInput
                label="Confirm Password"
                error={
                  errors?.Confirm_Password?.message &&
                  String(errors.Confirm_Password.message)
                }
                {...register("Confirm_Password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password_new") || "Passwords do not match",
                })}
              />

              <div className="flex justify-start gap-4 mt-3">
                <ButtonForm isSubmitting={isSubmitting} text="Change" />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}