import type { PageServerLoad } from "./$types";
import { getTours } from "$lib/queryFunction";

export const load: PageServerLoad = async () => {
  const tours = await getTours();
  return { tours };
};
