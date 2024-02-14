import { toast } from "react-toastify";

const toastCharacteristics = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const showToastOnSuccess = (msg) => {
  toast.success(msg, toastCharacteristics);
};

export const showToastOnError = (msg) => {
  toast.error(msg, toastCharacteristics);
};
