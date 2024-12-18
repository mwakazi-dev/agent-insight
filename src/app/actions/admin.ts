"use server";

import { getAuth } from "firebase-admin/auth";
import {
  ref,
  query,
  orderByChild,
  startAt,
  endAt,
  get,
} from "firebase/database";

import { StatusCodes } from "@/types/enums";
import { db } from "../../../firebaseConfig";

export async function changeUserPassword(userId: string, newPassword: string) {
  try {
    await getAuth().updateUser(userId, { password: newPassword });

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {},
      message: "User password changed successfully",
    };
  } catch {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable to change user password",
    };
  }
}

export async function createUser(values: any) {
  const { email, displayName, password, phoneNumber } = values;

  try {
    const res = await getAuth().createUser({
      email,
      displayName,
      password,
      phoneNumber,
    });

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        id: res?.uid,
      },
      message: "User created successfully",
    };
  } catch {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable to create user",
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    const res = await getAuth().deleteUser(userId);
    return {
      status: StatusCodes.Ok,
      success: true,
      data: {},
      message: "User deleted successfully",
    };
  } catch {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable to delete user",
    };
  }
}

export async function addRoles(userId: string) {
  try {
    await getAuth().setCustomUserClaims(userId, { admin: true });
    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        userId,
        roles: ["admin"],
      },
      message: "Roles set successfully",
    };
  } catch {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable to set roles",
    };
  }
}

export const fetchReports = async (filters: any) => {
  try {
    const reportsRef = ref(db, "fieldData");
    let reportQuery = query(reportsRef);

    if (filters.dateRange) {
      const [startDate, endDate] = filters.dateRange;
      reportQuery = query(
        reportQuery,
        orderByChild("created"),
        startAt(startDate.valueOf()),
        endAt(endDate.valueOf())
      );
    }

    let filteredReports = [];

    const snapshot = await get(reportQuery);
    const reportData = snapshot.val();

    if (reportData) {
      filteredReports = Object.keys(reportData).map((key) => ({
        id: key,
        ...reportData[key],
      }));

      if (filters.productType) {
        filteredReports = filteredReports.filter(
          (report) => report.productType === filters.productType
        );
      }

      if (filters.fieldAgent) {
        filteredReports = filteredReports.filter(
          (report) => report.userEmail === filters.fieldAgent
        );
      }

      if (filters.location) {
        filteredReports = filteredReports.filter(
          (report) => report.location === filters.location
        );
      }
    }

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        report: filteredReports,
      },
      message: "Reports fetched successfully",
    };
  } catch (error) {
    return {
      status: StatusCodes.InternalServerError,
      success: false,
      message: "Error fetching reports",
    };
  }
};

export async function updateUserDetails(userId: string, values: any) {
  try {
    await getAuth().updateUser(userId, { ...values });

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {},
      message: "User updated successfully",
    };
  } catch {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable to update user details",
    };
  }
}
