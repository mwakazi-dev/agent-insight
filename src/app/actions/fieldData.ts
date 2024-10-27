import { fieldDataService } from "@/services/fieldDataService";
import { StatusCodes } from "@/types/enums";

export async function addFieldData(payload: any) {
  try {
    const res = await fieldDataService.addFieldData(payload);

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        id: res?.data?.name,
      },
      message: "Field data added successful",
    };
  } catch (error) {
    return {
      status: StatusCodes.InternalServerError,
      success: false,
      message: "Unable to add field data",
    };
  }
}
