/* eslint-disable no-useless-escape */
import { createHash } from "crypto";
import type { Response as ExpressResponse } from "express";
import { Response } from "../helpers";
import { Linky, User, Setting } from "../models";
import { JSONWebToken } from "../utils";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
  confirmPassword: string;
}

export interface UserResponse {
  uid?: string;
  username: string;
  email: string;
}

// RegExp pattern for email and password validation
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userServices = {
  // Login user
  login: async (req: ApiRequest, res: ExpressResponse) => {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      return Response.error(res, 400, {
        message: "Email and password are required",
      });
    }

    if (!emailPattern.test(email?.trim())) {
      return Response.error(res, 400, {
        message: "Email is not valid",
      });
    }

    if (!passwordPattern.test(password?.trim())) {
      return Response.error(res, 400, {
        message: "Password is not valid",
      });
    }

    try {
      const user = await User.findOne({ email: email?.trim() });
      const hashPassword = user ? createHash("sha512").update(password).digest("hex") : null;

      if (!user) {
        return Response.error(res, 400, {
          message: "User not found",
        });
      }

      if (user.password !== hashPassword) {
        return Response.error(res, 400, {
          message: "Password is not valid",
        });
      }

      const token = JSONWebToken.sign({
        uid: user.uid,
        email: user.email,
      } as DecodedToken);

      if (!token) {
        return Response.error(res, 500, {
          message: "Internal server error",
        });
      }

      return Response.success(res, 200, {
        message: "Login success",
        data: {
          token,
        },
      } as ApiResponse<{ token: string }>);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  // Register new user
  register: async (req: ApiRequest, res: ExpressResponse) => {
    const {
      username, email, password, confirmPassword,
    } = req.body as RegisterRequest;

    if (!username || !email || !password || !confirmPassword) {
      return Response.error(res, 400, {
        message: "All fields are required",
      });
    }

    if (!emailPattern.test(email?.trim())) {
      return Response.error(res, 400, {
        message: "Email is not valid",
      });
    }

    if (!passwordPattern.test(password?.trim())) {
      return Response.error(res, 400, {
        message: "Password is not valid",
      });
    }

    if (password !== confirmPassword) {
      return Response.error(res, 400, {
        message: "Password and confirm password are not same",
      });
    }

    try {
      const user = await User.findOne({ username: username?.trim() });
      const hashPassword = user ? null : createHash("sha512").update(password).digest("hex");

      if (user) {
        if (user.email === email?.trim()) {
          return Response.error(res, 400, {
            message: "Email is already registered",
          });
        }

        return Response.error(res, 400, {
          message: "Username is already taken",
        });
      }

      const newUser = new User({
        username: username?.trim(),
        email: email?.trim(),
        password: hashPassword,
      });
      const newLinkyProfile = new Linky({
        uid: newUser.uid,
        user: {
          username: newUser.username,
          email: newUser.email,
        },
      });
      const newSettingProfile = new Setting({
        uid: newUser.uid,
        generalSettings: {
          profile: {
            username: newUser.username,
            email: newUser.email,
          },
        },
      });

      const savedUser = await newUser.save();
      const savedLinkyProfile = await newLinkyProfile.save();
      const savedSettingProfile = await newSettingProfile.save();

      if (!savedUser || !savedLinkyProfile || !savedSettingProfile) {
        return Response.error(res, 500, {
          message: "Internal server error",
        });
      }

      return Response.success(res, 200, {
        message: "Register success",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  // Get user profile
  getProfile: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid, email } = req.user as DecodedToken;

    if (!uid || !email) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const user = await User.findOne({ uid, email }).select("username email uid");
      const userSetting = await Setting.findOne({ uid });

      if (!user || !userSetting) {
        return Response.error(res, 400, {
          message: "User not found",
        });
      }

      const profile: UserResponse & { avatar: string } = {
        uid: user.uid,
        username: user.username,
        email: user.email,
        avatar: userSetting?.generalSettings?.profile?.avatar,
      };

      return Response.success(res, 200, {
        message: "Get profile success",
        data: profile,
      } as ApiResponse<UserResponse & { avatar: string }>);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  // Update user profile
  update: async (req: ApiRequest, res: ExpressResponse) => {
    const { username, email } = req.body as UserResponse;
    const { uid } = req.user as DecodedToken;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const user = await User.findOne({ uid });
      const linky = await Linky.findOne({ uid });

      if (!user || !linky) {
        return Response.error(res, 400, {
          message: "User not found",
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { uid },
        {
          username: username?.trim() ?? user.username,
          email: email?.trim() ?? user.email,
        },
      );
      const updatedLinky = await Linky.findOneAndUpdate(
        { uid },
        {
          user: {
            username: username?.trim() ?? user.username,
            email: email?.trim() ?? user.email,
          },
        },
      );
      const updatedSetting = await Setting.findOneAndUpdate(
        { uid },
        {
          generalSettings: {
            profile: {
              username: username?.trim() ?? user.username,
              email: email?.trim() ?? user.email,
            },
          },
        },
      );

      if (!updatedUser || !updatedLinky || !updatedSetting) {
        return Response.error(res, 500, {
          message: "Internal server error",
        });
      }

      return Response.success(res, 200, {
        message: "Update profile success",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },
};
