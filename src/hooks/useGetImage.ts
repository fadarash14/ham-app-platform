import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "./context/useAxiosPrivate";

interface StateType {
  pic: string | undefined;
  error: string | undefined;
  loading: boolean;
}
const useGetImage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [state, setState] = useState<StateType>({
    pic: undefined,
    error: undefined,
    loading: false,
  });

  const getPicture = useCallback(
    async (pictureURL: string) => {
      try {
        setState((prevState) => ({
          ...prevState,
          loading: true,
          error: undefined,
        }));

        const response = await axiosPrivate.get(pictureURL, {
          responseType: "arraybuffer",
        });

        const url = URL.createObjectURL(new Blob([response.data]));
        setState((prevState) => ({
          ...prevState,
          pic: url,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          error: "Error fetching image.",
        }));
        console.error(error);
      } finally {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    return () => {
      if (state.pic) {
        URL.revokeObjectURL(state.pic);
      }
    };
  }, [state.pic]);

  return { ...state, getPicture };
};

export default useGetImage;
