import axios from "axios";
import {
  setAllJobs,
  setApplication,
  setError,
  setLoading,
  setPage,
  setStudent,
} from "../sclices/studentSclice";
const basePath = `https://final-satisfied-backend-2.onrender.com/user`;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = () => {
  return {
    headers: {
      authorization: localStorage.getItem("token") || "", // Ensure token is always a string
    },
    withCredentials: true,
  };
};

export const loginStudent = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${basePath}/student/signIN`, {
      ...userData,
    });
    localStorage.setItem("token", data.token);
    dispatch(setStudent(data.student));
  } catch (error) {
    let errorMessage = "Login failed"; // Default error message

    if (error?.response?.status === 500) {
      // 401 is the standard code for unauthorized
      errorMessage = "Wrong password provided. Please try again.";
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message; // Server-provided error message
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(setError(error?.response?.data?.message || "Login failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerStudent = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${basePath}/student/signup`, {
      ...userData,
    });
    dispatch(setLoading(false));
    console.log(response.data)
    localStorage.setItem("token", response.data.Token);
    if (response?.data?.succcess) {
      return response.data.message;
    } else {
      throw new Error(response?.data?.message);
    }

    // dispatch(setStudent(data.student))
  } catch (error) {
    dispatch(setLoading(false));
    let errorMessage = "Signin failed"; // Default error message

    if (error?.response?.status === 401) {
      // 401 is the standard code for unauthorized
      errorMessage = "User with this email already exists.";
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message; // Server-provided error message
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const currentStudent = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const { data } = await axios.post(`${basePath}/student`, null, config());
    dispatch(setStudent(data.student));
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Failed to get current user")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutStudent = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.get(`${basePath}/student/signout`, config());
    dispatch(setLoading(false));
    dispatch(setStudent(null));
    localStorage.removeItem("token");
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const updateStudent = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${basePath}/student/update`,
      userData,
      config()
    );
    dispatch(currentStudent());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get current user failed")
    );
  }
};

export const submitOtpStudent = (otp) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      `${basePath}/student/validation`,
      otp, config()
    );
    console.log(response.data)
    if (response.data.success) {
      localStorage.removeItem("token");
      localStorage.setItem("token", response.data.token);
      dispatch(currentStudent());
      return response.data.message;
    }
    else {
      return response.data.massage
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get current user failed")
    );
  }
};

export const uploadResuma = (fileData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("resume", fileData);
    const { data } = await axios.post(
      `${basePath}/student/resumaPdf`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(currentStudent());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error,);
    dispatch(
      setError(error?.response?.data?.message || "fail to upload Resume")
    );
  }
};

export const sendMail = (email) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${basePath}/student/send-mail`,
      email,
      config()
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get current user failed")
    );
  }
};

export const resetPassword = (password, id) => async (dispatch) => {
  if (!id) return;
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${basePath}/student/forget-link/${id}`,
      { password },
      config()
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get current user failed")
    );
  }
};

export const AllJobs =
  (obj = {}) =>
    async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.post(
          `${basePath}/student/AllJobs`,
          obj,
          config()
        );
        dispatch(setAllJobs(data.jobs));
        dispatch(
          setPage({
            totalPages: data.totalPages,
            currentPage: data.currentPage,
          })
        );
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.error(error);
        dispatch(
          setError(error?.response?.data?.message || "get current user failed")
        );
      }
    };

export const applicationSend = (dets) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${basePath}/student/apply`,
      dets,
      config()
    );
    dispatch(AllJobs());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "send Application failed")
    );
  }
};

export const getApplication = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(
      `${basePath}/student/applications`,
      config()
    );
    dispatch(setApplication(data.applications));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get Application failed")
    );
  }
};

export const avatarStudent = (fileData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("avatar", fileData);
    const res = await axios.post(`${basePath}/student/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch(setLoading(false));
    dispatch(currentStudent());
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
    dispatch(
      setError(
        error?.response?.data?.message || "failed to upload a new avatar"
      )
    );
  }
};

export const deletUser = (user) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${basePath}/deletUser`, {
      ...user,
    });
    dispatch(setLoading(false));
    toast.success("Deleted User")

  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(
      setError(
        error?.response?.data?.message || "failed to upload a new avatar"
      )
    );
  }
};
