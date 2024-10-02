import { useDispatch } from "react-redux";
import { getAccessToken } from "@/utils";
import { useLazyQuery } from "@apollo/client";
import { GET_AN_USER } from "@/pages/order/order-settings/graphql/queries/getAnUser.gql";
import { setAccessToken, setUserInfo } from "@/redux/slices/user/userSlice";

const useInitializeUser = () => {
  const dispatch = useDispatch();
  const [getAnUser, { loading }] = useLazyQuery(GET_AN_USER, {
    variables: {},
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      dispatch(setUserInfo(data.getAnUser));
      dispatch(setAccessToken(getAccessToken()));
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  return {
    getAnUser,
    loading,
  };
};

export default useInitializeUser;
