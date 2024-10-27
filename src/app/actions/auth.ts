"use server";

import { isRedirectError } from "next/dist/client/components/redirect";

import { authService } from "@/services/authService";
import { AuthErrors, ErrorMessages, Roles, StatusCodes } from "@/types/enums";
import { getUserRoles } from "@/lib/dal";
import { createSession, deleteSession } from "@/lib/session";

export async function signup(values: {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}) {
  const { email, password, displayName, phoneNumber } = values;

  try {
    const { data: authData } = await authService.signupWIthEmailAndPassword({
      email,
      password,
      displayName,
      phoneNumber,
    });

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        id: authData?.localId,
        email: authData?.email,
        displayName: authData?.displayName,
      },
      message: "Signup successful",
    };
  } catch (error: any) {
    const errorCode = error?.message?.response?.data?.error?.message;

    if (errorCode === AuthErrors.EMAIL_EXISTS) {
      return {
        status: 400,
        success: false,
        error: {
          code: AuthErrors.EMAIL_EXISTS,
          message:
            "Email already exists. Please use a different email address.",
        },
      };
    }

    const errorNotFound = error?.message?.response?.status;

    if (errorNotFound === StatusCodes.NotFound) {
      return {
        status: StatusCodes.NotFound,
        success: false,
        error: {
          code: AuthErrors.NOT_FOUND,
          message: "The page you're trying to reach isn't here.",
        },
      };
    }
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      status: StatusCodes.InternalServerError,
      success: false,
      error: {
        code: AuthErrors.INTERNAL_SERVER_ERROR,
        message: "Something went wrong. Our team is working on fixing it.",
      },
    };
  }
}

export async function signin(email: string, password: string) {
  try {
    const { data: authData } = await authService.signinWIthEmailAndPassword({
      email,
      password,
    });

    const rolesResponse = await getUserRoles(authData?.localId);

    await createSession(
      authData?.idToken,
      3600,
      Boolean(rolesResponse?.data?.roles?.admin)
    );

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        userId: authData?.localId,
        email: authData?.email,
        displayName: authData?.displayName,
        phoneNumber: authData?.phoneNumber,
        roles: rolesResponse?.data?.roles?.admin ? [Roles.ADMIN] : [Roles.USER],
      },
      message: "Login successful",
    };
  } catch (error: any) {
    const errorCode = error?.message?.response?.data?.error?.message;

    if (errorCode === AuthErrors.TOO_MANY_ATTEMPTS_TRY_LATER) {
      return {
        status: 400,
        success: false,
        error: {
          code: AuthErrors.TOO_MANY_ATTEMPTS_TRY_LATER,
          message: AuthErrors.TOO_MANY_ATTEMPTS_TRY_LATER,
        },
      };
    }
    if (errorCode === AuthErrors.INVALID_LOGIN_CREDENTIALS) {
      return {
        status: StatusCodes.BadRequest,
        success: false,
        error: {
          code: AuthErrors.INVALID_LOGIN_CREDENTIALS,
          message: ErrorMessages.INVALID_LOGIN_CREDENTIALS,
        },
      };
    }
    if (errorCode === AuthErrors.INVALID_PASSWORD) {
      return {
        status: StatusCodes.BadRequest,
        success: false,
        error: {
          code: AuthErrors.INVALID_PASSWORD,
          message: AuthErrors.INVALID_PASSWORD,
        },
      };
    }
    if (errorCode === AuthErrors.EMAIL_NOT_FOUND) {
      return {
        status: StatusCodes.BadRequest,
        success: false,
        error: {
          code: AuthErrors.EMAIL_NOT_FOUND,
          message: AuthErrors.EMAIL_NOT_FOUND,
        },
      };
    }

    return {
      status: StatusCodes.InternalServerError,
      success: false,
      error: {
        code: AuthErrors.INTERNAL_SERVER_ERROR,
        message: ErrorMessages.INTERNAL_SERVER_ERROR,
      },
    };
  }
}

export async function signout() {
  try {
    await deleteSession();
    return {
      status: StatusCodes.Ok,
      success: true,
      message: "Signout successful",
    };
  } catch (error) {
    return {
      status: StatusCodes.InternalServerError,
      success: false,
      error: {
        code: AuthErrors.INTERNAL_SERVER_ERROR,
        message: ErrorMessages.INTERNAL_SERVER_ERROR,
      },
    };
  }
}
