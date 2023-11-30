import type { ReturnQueryFromVNPayDTO } from "vnpay/lib";
import initVnpay from "$lib/client/vnpay";

const vnpay = await initVnpay();

async function confirmPayment(url: URL): Promise<ReturnQueryFromVNPayDTO> {
  if (!url) {
    throw new Error("Invalid URL");
  }

  var searchParams = {};

  new URL(url).searchParams.forEach((value, key) => {
    // @ts-ignore
    searchParams[key] = value;
  });

  try {
    // @ts-ignore
    const verifyResult = await vnpay.verifyReturnUrl(searchParams);
    return Object.assign({}, verifyResult);
  } catch (error) {
    console.error("Failed to verify return URL:", error);
    throw error;
  }
}

export default confirmPayment;
