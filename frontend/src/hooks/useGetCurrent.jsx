import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice"; 

function useGetCurrentUser(){
    const  dispatch = useDispatch();
    useEffect(()=>{
        //fetch current user data from backend
        const fetchCurrentUser= async()=>{

            try{
                const response = await axios.get("http://localhost:8000/api/user/current-user",{withCredentials:true});
               
                console.log("Current user data:",response.data);
                dispatch(setUserData(response.data));
            }
            catch(error){
                console.log("Error fetching current user:",error);
            }
        }
        fetchCurrentUser();
    },[])
}

export default useGetCurrentUser;