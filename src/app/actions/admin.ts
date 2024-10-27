"use server";

import { getAuth } from "firebase-admin/auth";

import { StatusCodes } from "@/types/enums";

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
