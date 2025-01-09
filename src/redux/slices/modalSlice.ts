// modalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  isCodeModalOpen: boolean;
}
const initialState: ModalState = { isOpen: false, isCodeModalOpen: false };
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCodeModal: (state) => {
      state.isCodeModalOpen = !state.isCodeModalOpen;
    },
  },
});

export const { openModal, openCodeModal } = modalSlice.actions;
export default modalSlice.reducer;
