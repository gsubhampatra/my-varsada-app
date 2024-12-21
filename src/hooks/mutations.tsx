import { useMutation } from "@tanstack/react-query";
import api from "../http/axiosconfig";
import { API_ROUTES } from "../kv";
import { VarsadaBagPayload } from "../types/productTypes";

//--
async function postUserData(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
}) {
  const response = await api.post(API_ROUTES.USER.CREATE_DETAILS, data);
  console.log(response.data);
  return response.data;
}

export function usePostUserData() {
  return useMutation(postUserData);
}

export async function postVarsadaBag(data: VarsadaBagPayload) {
  const response = await api.post(API_ROUTES.USER.ADD_TO_BAG, data);
  console.log(response.data);
  return response.data;
}

//--
export async function postCalculateCheckout({
  data,
  coupon,
  isCoin,
}: {
  data: string[];
  coupon: string;
  isCoin: boolean;
}) {
  const response = await api.post(API_ROUTES.PAYMENT.CALCULATE, {
    bagIdArr: data,
    coupon,
    isCoin,
  });
  console.log(response.data);
  return response.data;
}
