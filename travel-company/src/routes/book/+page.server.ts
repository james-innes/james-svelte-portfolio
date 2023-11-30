import type { PageServerLoad } from "./$types";
import { getTourDateOptions } from "$lib/queryFunction";

export const load: PageServerLoad = async () => {
  const tourDateOptions = await getTourDateOptions();
  return { tourDateOptions };
};
