import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  showToastOnError,
  showToastOnSuccess,
} from "../utilities/displayToast";

const usePerformMutation = (key, fn, msg) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [key],
    mutationFn: fn,
    onSuccess: () => {
      if (msg) {
        showToastOnSuccess(msg);
      }
      queryClient.invalidateQueries(key);
    },
    onError: (error) => {
      showToastOnError(error);
    },
  });
  return mutation;
};

export default usePerformMutation;
