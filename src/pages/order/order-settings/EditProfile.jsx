import AppUserDetails from "@/components/common/AppUserDetails";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInitializeUser from "@/hooks/useInitializeUser";
import { UPDATE_AN_USER } from "./graphql/mutations/updateAnUser.gql";
import { useMutation } from "@apollo/client";
import {
  setProfileImageLoaded,
  setUserInfo,
} from "@/redux/slices/user/userSlice";
import toast from "react-hot-toast";
import { uploadFile } from "@/utils";
import { t } from "i18next";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { getAnUser } = useInitializeUser();
  const navigate = useNavigate();
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
      place: "",
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
      place: userInfo?.place,
      internal_cost_center: userInfo?.internal_cost_center,
      profile_image: userInfo?.profile_image || "",
    },
    mode: "onSubmit",
  });
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [updateAnUser] = useMutation(UPDATE_AN_USER);

  const onSubmitUserDetails = async () => {
    const formData = form.getValues();
    console.log({ formData });
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.code
    ) {
      toast.error("Fill up the required fields");
      return;
    }

    setLoading(true);
    const profile_image =
      (await uploadFile(selectedFile)) || userInfo?.profile_image;

    await updateAnUser({
      variables: {
        inputData: {
          ...formData,
          profile_image: profile_image || "",
        },
      },
    })
      .then(({ data }) => {
        if (data) {
          dispatch(setUserInfo(data.updateAnUser));
          toast.success(t("profile_updated_successfully"), {
            icon: "🔒",
          });
          navigate("/orders/setting");
        }
      })
      .catch((error) => {
        toast.error(error.message || t("profile_update_error"));
      })
      .finally(() => {
        setLoading(false);
        if (selectedFile) {
          dispatch(setProfileImageLoaded(false));
          const query = document.getElementsByClassName(
            "profile_image_class_to_hide"
          );
          query?.length > 0 &&
            [...query].forEach((query) => {
              query.classList.add("hidden");
            });
        }

        setSelectedFile(null);
      });
  };

  return (
    <Card className="px-5 py-5">
      <CardHeader className="mb-4">
        <CardTitle className="text-center">{t("edit_profile")}</CardTitle>
      </CardHeader>
      <AppUserDetails
        form={form}
        onSubmit={onSubmitUserDetails}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        loading={loading}
        userInfo={userInfo}
        isFromEdit={true}
      />
    </Card>
  );
};

export default EditProfile;
