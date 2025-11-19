import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData, finishLoading } from "../redux/userSlice";
import { serverUrl } from "../App";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/user/current-user`,
          { withCredentials: true }
        );

        dispatch(setUserData(response.data));
      } catch (error) {
        // No logged-in user → stop loading
        dispatch(finishLoading());
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
