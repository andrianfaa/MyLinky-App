/* eslint-disable max-len */
import type { Response as ExpressResponse } from "express";
import {
  Setting, Linky, User, Publish,
} from "../models";
import type { SettingSchemaType, UserSchemaType, LinkySchemaType } from "../models";
import { Response } from "../helpers";

export const publishServices = {
  publishLinky: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid } = req.user as DecodedToken;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const getSetting: SettingSchemaType | null = await Setting.findOne({ uid });
      const getLinky: LinkySchemaType | null = await Linky.findOne({ uid });
      const getUser: UserSchemaType | null = await User.findOne({ uid });

      if (!getSetting || !getLinky || !getUser) {
        return Response.error(res, 404, {
          message: "Not found",
        });
      }

      const publishData = {
        openInNewTab: getSetting.publishSettings.links.openLinksInNewTab,
        showIcon: getSetting.publishSettings.links.showIcon,
        username: getUser.username,
        profile: {
          name: getSetting.publishSettings.profile.showProfileName ? getSetting.generalSettings.profile.name ?? getLinky.user.name : null,
          username: getSetting.publishSettings.profile.showProfileUsername ? getSetting.generalSettings.profile.username ?? getUser.username : null,
          email: getSetting.publishSettings.profile.showProfileEmail ? getUser.email : null,
          avatar: getSetting.publishSettings.profile.showProfilePhoto ? getSetting.generalSettings.profile.avatar ?? getLinky.user.avatar : null,
          bio: getSetting.publishSettings.profile.showProfileBio ? getSetting.generalSettings.profile.bio : null,
        },
        links: getLinky.links.map((link) => ({
          id: link.id,
          url: link.url,
          title: link.title,
          type: link.type,
          isPublished: link.isPublished,
        })),
      };

      const getPublishedData = await Publish.findOne({ uid });

      if (!getPublishedData) {
        const newPublish = new Publish({
          uid,
          ...publishData,
        });

        const savePublishData = new Publish(newPublish).save();

        if (!savePublishData) {
          return Response.error(res, 500, {
            message: "Internal Server Error",
          });
        }

        return Response.success(res, 200, {
          message: "Successfully published",
        });
      }

      const updatePublishData = await Publish.findOneAndUpdate(
        { uid },
        {
          ...publishData,
        },
      );

      if (!updatePublishData) {
        return Response.error(res, 500, {
          message: "Internal Server Error",
        });
      }

      return Response.success(res, 200, {
        message: "Success publish",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },

  getPublishedDataByUsername: async (req: ApiRequest, res: ExpressResponse) => {
    const { username } = req.params as { username?: string };

    if (!username) {
      return Response.error(res, 400, {
        message: "Bad request",
      });
    }

    try {
      const getPublish = await Publish.findOne({ username: username.trim() }).select("-_id -__v -uid -id -username");

      if (!getPublish) {
        return Response.error(res, 404, {
          message: "Not found",
        });
      }

      return Response.success(res, 200, {
        message: "Success get published data",
        data: getPublish,
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
