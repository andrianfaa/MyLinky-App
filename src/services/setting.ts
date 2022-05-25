import type { Response as ExpressResponse } from "express";
import { Setting, Linky, User } from "../models";
import { Response } from "../helpers";

export interface SettingType {
  uid?: string;
  generalSettings: {
    profile: {
      name: string;
      email: string;
      avatar: string;
      username: string;
      bio: string;
    }
  };
  publishSettings: {
    profile: {
      showProfilePhoto: boolean;
      showProfileName: boolean;
      showProfileUsername: boolean;
      showProfileBio: boolean;
      showProfileEmail: boolean;
    }
  };
}

export interface UpdateSettingType {
  uid?: string;
  settings: SettingType;
}

export const settingServices = {
  getSetting: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid } = req.user as DecodedToken;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const setting = await Setting.findOne({ uid }).select("-_id -__v -id");

      if (!setting) {
        return Response.error(res, 404, {
          message: "Setting not found",
        });
      }

      return Response.success(res, 200, {
        message: "Setting found",
        data: setting,
      } as ApiResponse<SettingType>);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  updateSetting: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid, settings } = req.body as UpdateSettingType;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    if (!settings) {
      return Response.error(res, 400, {
        message: "Settings not found",
      });
    }

    try {
      const setting = await Setting.findOne({ uid }).select("-_id -__v -id");

      if (!setting) {
        return Response.error(res, 404, {
          message: "Setting not found",
        });
      }

      const generalSettingProfile = {
        name: settings?.generalSettings?.profile?.name
        ?? setting.generalSettings.profile.name,
        email: settings?.generalSettings?.profile?.email
        ?? setting.generalSettings.profile.email,
        avatar: settings?.generalSettings?.profile?.avatar
        ?? setting.generalSettings.profile.avatar,
        username: settings?.generalSettings?.profile?.username
        ?? setting.generalSettings.profile.username,
        bio: settings?.generalSettings?.profile?.bio
        ?? setting.generalSettings.profile.bio,
      };

      const updateSetting = await Setting.findOneAndUpdate(
        { uid },
        {
          $set: {
            "generalSettings.profile": generalSettingProfile,
            publishSettings: settings?.publishSettings
            ?? setting.publishSettings,
          },
        },
      );
      const updateUser = await User.findOneAndUpdate(
        { uid },
        {
          $set: {
            username: generalSettingProfile.username,
            email: generalSettingProfile.email,
          },
        },
      );
      const updateLinky = await Linky.findOneAndUpdate(
        { uid },
        {
          $set: {
            user: {
              username: generalSettingProfile.username,
              email: generalSettingProfile.email,
              name: generalSettingProfile.name,
              avatar: generalSettingProfile.avatar,
            },
          },
        },
      );

      if (!updateSetting || !updateUser || !updateLinky) {
        return Response.error(res, 500, {
          message: "Internal server error",
        });
      }

      return Response.success(res, 200, {
        message: "Setting updated",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  resetSetting: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid } = req.user as DecodedToken;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const setting = await Setting.findOne({ uid }).select("-_id -__v -id");

      if (!setting) {
        return Response.error(res, 404, {
          message: "Setting not found",
        });
      }

      const generalSettingProfile = {
        ...setting.generalSettings,
        publishSettings: {
          profile: {
            showProfilePhoto: true,
            showProfileName: true,
            showProfileUsername: true,
            showProfileBio: false,
            showProfileEmail: false,
          },
          links: {
            openLinkInNewTab: false,
            showIcon: true,
          },
        },
      };

      const updateSetting = await Setting.findOneAndUpdate(
        { uid },
        {
          $set: {
            generalSettings: generalSettingProfile.generalSettings,
            publishSettings: generalSettingProfile.publishSettings,
          },
        },
      );

      if (!updateSetting) {
        return Response.error(res, 500, {
          message: "Internal server error",
        });
      }

      return Response.success(res, 200, {
        message: "Setting updated",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  deleteAccount: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid, email } = req.user as DecodedToken;

    if (!uid || !email) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const setting = await Setting.findOne({ uid });
      const user = await User.findOne({ email, uid });
      const linky = await Linky.findOne({ uid });

      if (!setting || !user || !linky) {
        return Response.error(res, 404, {
          message: "user not found",
        });
      }

      const deleteSetting = await Setting.deleteOne({ uid });
      const deleteUser = await User.deleteOne({ email, uid });
      const deleteLinky = await Linky.deleteOne({ uid });

      if (!deleteSetting || !deleteUser || !deleteLinky) {
        return Response.error(res, 500, {
          message: "Internal server error",
        });
      }

      return Response.success(res, 200, {
        message: "user deleted",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
