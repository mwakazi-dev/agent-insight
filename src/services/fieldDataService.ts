import { Endpoints } from "@/types/enums";
import requestHandler from "@/lib/request";

const addFieldData = (payload: any) => {
  return requestHandler.post(
    `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/${Endpoints.FIELD_DATA}.json`,
    payload
  );
};

export const fieldDataService = {
  addFieldData,
};
