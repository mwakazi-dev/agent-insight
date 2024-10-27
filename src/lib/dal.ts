import "server-only";

import { cache } from "react";
import { getAuth } from "firebase-admin/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

import { initAdmin } from "@/../../firebaseAdminConfig";
import { AuthErrors, ErrorMessages, Roles, StatusCodes } from "@/types/enums";
import { verifySession } from "./session";
import { authService } from "@/services/authService";

export const getUsers = cache(async () => {
  try {
    const users = await getAuth().listUsers();

    const allUsers = users.users.map((user) => ({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    }));

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        users: allUsers,
      },
      message: "Users fetched successfully",
    };
  } catch {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable  to fetch users",
    };
  }
});

export const getUser = cache(async () => {
  const { session } = await verifySession();

  if (!session) {
    return {
      success: false,
      code: StatusCodes.Unauthorized,
      data: {},
      message: ErrorMessages.UNAUTHORIZED,
    };
  }

  try {
    const user = await authService.getUserProfile({ idToken: session });

    const rolesResponse = (await getUserRoles(user.data.users[0]?.localId)) || {
      admin: [Roles.USER],
    };

    return {
      code: StatusCodes.Ok,
      message: "User retrieved successfully",
      data: {
        userId: user?.data?.users[0]?.localId,
        email: user?.data?.users[0]?.email,
        displayName: user?.data?.users[0]?.displayName,
        phoneNumber: user?.data?.users[0]?.phoneNumber,
        roles: rolesResponse?.data?.roles?.admin ? [Roles.ADMIN] : [Roles.USER],
      },
    };
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (
      error?.message?.response?.data?.error?.message ===
      AuthErrors.USER_NOT_FOUND
    ) {
      return {
        success: false,
        code: StatusCodes.NotFound,
        message: ErrorMessages.USER_NOT_FOUND,
      };
    }

    if (
      error?.message?.response?.data?.error?.message ===
      AuthErrors.INVALID_ID_TOKEN
    ) {
      return {
        success: false,
        code: StatusCodes.Unauthorized,
        message: ErrorMessages.INVALID_ID_TOKEN,
      };
    }
  }
});

export async function getUserRoles(userId: string) {
  await initAdmin();
  try {
    const user: any = await getAuth().getUser(userId);
    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        userId,
        roles: user?.customClaims,
      },
      message: "Roles fetched successfully",
    };
  } catch (error) {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable to fetch user roles",
    };
  }
}
