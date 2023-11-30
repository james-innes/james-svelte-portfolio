import {
  VNPAY_GATEWAY_URL,
  VNPAY_TMN_CODE,
  VNPAY_SECRET,
  BASE_URL,
} from "$env/static/private";
import { VNPay } from "vnpay";

export default async function initVnpay() {
  return new VNPay({
    paymentGateway: VNPAY_GATEWAY_URL,
    tmnCode: VNPAY_TMN_CODE,
    secureSecret: VNPAY_SECRET,
    returnUrl: BASE_URL + "/book/confirm",
  });
}
