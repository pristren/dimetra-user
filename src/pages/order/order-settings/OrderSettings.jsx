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
import { setUserInfo } from "@/redux/slices/user/userSlice";

const OrderSettings = () => {
  const { userInfo } = useSelector((state) => state.user);

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
    },
  });
  const dispatch = useDispatch();

  const [updateAnUser] = useMutation(UPDATE_AN_USER);
  const onSubmitUserDetails = async (value) => {
    const { data } = await updateAnUser({
      variables: {
        inputData: {
          ...value,
        },
      },
    });

    if (data) {
      dispatch(setUserInfo(data.updateAnUser));
      setEditModalOpen(false);
    }
  };

  const onSubmitPasswordChange = async (data) => {
    console.log(data);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <h5 className="text-nowrap">My Profile</h5>
        <AppDialog
          trigger={
            <div className="flex justify-end items-center gap-2">
              <Security />
              <p className="highlight text-nowrap">Update Password</p>
            </div>
          }
          title="Change Password"
          content={<PasswordChangeForm onSubmit={onSubmitPasswordChange} />}
        />
      </div>
      <div className="bg-white border border-gray-300 rounded-lg mt-8">
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center justify-center gap-5">
            <img
              src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
              className="h-52 w-52 object-cover rounded-3xl border-[8px] border-white shadow-xl"
              alt=""
            />
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
                <div className="text-black">
                  <AppUserDetails form={form} onSubmit={onSubmitUserDetails} />
                </div>
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
