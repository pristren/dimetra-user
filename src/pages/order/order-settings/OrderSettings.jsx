import { Security } from "@/assets/icons";
import AppDialog from "@/components/common/AppDialog";
import AppUserDetails from "@/components/common/AppUserDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import PasswordChangeForm from "./PasswordChangeForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInitializeUser from "@/hooks/useInitializeUser";
import { UPDATE_AN_USER } from "./graphql/mutations/updateAnUser.qgl";
import { useMutation } from "@apollo/client";
import {
  setProfileImageLoaded,
  setUserInfo,
} from "@/redux/slices/user/userSlice";
import axios from "axios";
import { UPDATE_AN_USER_PASSWORD } from "./graphql/mutations/updateUserPassword.gql";
import toast from "react-hot-toast";

const OrderSettings = () => {
  const { userInfo, profileImageLoaded } = useSelector((state) => state.user);

  const { getAnUser } = useInitializeUser();

  useEffect(() => {
    getAnUser();
  }, []);

  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      billing_address: "",
      code: "",
      internal_cost_center: "",
      profile_image: "",
    },
    values: {
      first_name: userInfo?.first_name,
      last_name: userInfo?.last_name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      address: userInfo?.address,
      billing_address: userInfo?.billing_address,
      code: userInfo?.code,
      internal_cost_center: userInfo?.internal_cost_center,
      profile_image: userInfo?.profile_image || "",
    },
  });
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [appDialougeOpen, setAppDialougeOpen] = useState(false);

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios.post("/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data.fileUrl;
      } catch (error) {
        console.error(
          `Error: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    }
  };

  const [updateAnUser] = useMutation(UPDATE_AN_USER);
  const [updateUserPassword] = useMutation(UPDATE_AN_USER_PASSWORD);
  const onSubmitUserDetails = async (value) => {
    setLoading(true);
    const profile_image = await handleUpload();

    await updateAnUser({
      variables: {
        inputData: {
          ...value,
          profile_image: profile_image || "",
        },
      },
    })
      .then(({ data }) => {
        if (data) {
          dispatch(setUserInfo(data.updateAnUser));
          setEditModalOpen(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        dispatch(setProfileImageLoaded(false));
        const query = document.getElementsByClassName(
          "profile_image_class_to_hide"
        );
        query?.length > 0 &&
          [...query].forEach((query) => {
            query.classList.add("hidden");
          });
      });
  };

  const onSubmitPasswordChange = async (data) => {
    const { new_password, current_password } = data;
    setPasswordChangeLoading(true);
    await updateUserPassword({
      variables: {
        inputData: {
          new_password,
          current_password,
        },
      },
    })
      .then(({ data }) => {
        if (data.updateUserPassword) {
          toast.success("Password updated successfully", {
            icon: "🔒",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setAppDialougeOpen(false);
        setPasswordChangeLoading(false);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <h5 className="text-nowrap">My Profile</h5>
        <AppDialog
          open={appDialougeOpen}
          onOpenChange={setAppDialougeOpen}
          trigger={
            <div className="flex justify-end items-center gap-2">
              <Security />
              <p className="highlight text-nowrap">Update Password</p>
            </div>
          }
          className={"p-8"}
          title="Change Password"
          content={
            <PasswordChangeForm
              loading={passwordChangeLoading}
              onSubmit={onSubmitPasswordChange}
            />
          }
        />
      </div>
      <div className="bg-white border border-gray-300 rounded-lg mt-8">
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center justify-center gap-5">
            <div className="h-52 w-52 rounded-3xl border-[8px] border-white shadow-xl">
              {!profileImageLoaded && (
                <div className="w-full h-full rounded-3xl  bg-gray-200 animate-pulse"></div>
              )}

              <img
                src={
                  userInfo?.profile_image ||
                  "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                }
                className={`w-full h-full object-cover rounded-3xl hidden profile_image_class_to_hide`}
                alt="Profile Image"
                onLoad={(e) => {
                  dispatch(setProfileImageLoaded(true));
                  e.target.classList.remove("hidden");
                }}
              />
            </div>
            <div>
              <h6 className="mb-2">
                {userInfo?.first_name} {userInfo?.last_name}
              </h6>
              <p>{userInfo?.phone}</p>
            </div>
          </div>
          <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger className="bg-gray-100 hover:bg-gray-200 shadow-xl rounded-full py-2 px-5 text-blue-500">
              Edit
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <AppUserDetails
                  form={form}
                  onSubmit={onSubmitUserDetails}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  loading={loading}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-20 ">
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className="highlight ml-3 text-gray-500 w-40">Email</p>
            <p className="highlight">{userInfo?.email}</p>
          </div>
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className="highlight ml-3 text-gray-500 w-40">Address</p>
            <p className="highlight">{userInfo?.address}</p>
          </div>
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className="highlight ml-3 text-gray-500 w-40">Billing address</p>
            <p className="highlight">{userInfo?.billing_address}</p>
          </div>
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className="highlight ml-3 text-gray-500 w-40">Code</p>
            <p className="highlight">{userInfo?.code}</p>
          </div>
          <div className="flex items-center gap-20 pb-5 px-5">
            <p className="highlight ml-3 text-gray-500 w-40">
              Internal Koststelle
            </p>
            <p className="highlight">
              {userInfo?.internal_cost_center || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSettings;
