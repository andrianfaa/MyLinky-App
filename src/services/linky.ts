import type { Response as ExpressResponse } from "express";
import { Linky, User, Setting } from "../models";
import { Response } from "../helpers";
import { RandomID } from "../utils";

export interface LinkyLinks {
  id: string;
  type: string;
  title: string;
  url: string;
  isPublished: boolean;
}

export interface LinkyUser {
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export interface LinkyResponse {
  user: LinkyUser;
  links: LinkyLinks[] | [];
}

export interface LinkyRequest {
  links: LinkyLinks[] | [];
  uid: string;
}

export interface LinkyDragDropRequest {
  uid: string;
  ids: string[];
}

export const linkyServices = {
  getLinky: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid } = req.user as DecodedToken;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const linky = await Linky.findOne({ uid }).select("-_id user links");

      if (!linky) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      return Response.success(res, 200, {
        message: "Get linky success",
        data: linky,
      } as ApiResponse<LinkyResponse>);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  updateLinks: async (req: ApiRequest, res: ExpressResponse) => {
    const { links, uid } = req.body as LinkyRequest;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const linky = await Linky.findOne({ uid });

      if (!linky) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      const updatedLinky = await Linky.findOneAndUpdate(
        { uid },
        {
          $set: {
            links: links.map((link: LinkyLinks) => ({
              ...link,
              id: link.id ?? RandomID.generate(8),
            })) as LinkyLinks[],
          },
        },
      );

      if (!updatedLinky) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      return Response.success(res, 200, {
        message: "Update linky success",
      } as ApiResponse);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  updateLinkyUser: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid } = req.user as DecodedToken;
    const {
      username, email, name, avatar,
    } = req.body as LinkyUser;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    try {
      const linky = await Linky.findOne({ uid });
      const user = await User.findOne({ uid });

      if (!linky || !user) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { uid },
        {
          $set: {
            username: username?.trim() ?? user.username,
            email: email?.trim() ?? user.email,
          },
        },
      );
      const updatedLinky = await Linky.findOneAndUpdate(
        { uid },
        {
          $set: {
            user: {
              username: username?.trim() ?? linky.user.username,
              email: email?.trim() ?? linky.user.email,
              name: name?.trim(),
              avatar: avatar?.trim(),
            },
          },
        },
      );
      const updatedSetting = await Setting.findOneAndUpdate(
        { uid },
        {
          $set: {
            generalSettings: {
              profile: {
                username: username?.trim() ?? linky.user.username,
                email: email?.trim() ?? linky.user.email,
                name: name?.trim() ?? linky.user.name,
                avatar: avatar?.trim() ?? linky.user.avatar,
              },
            },
          },
        },
      );

      if (!updatedUser || !updatedLinky || !updatedSetting) {
        return Response.error(res, 400, {
          message: "Something went wrong",
        });
      }

      return Response.success(res, 200, {
        message: "Update linky user success",
      } as ApiResponse);
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  toggleLinkPublish: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid } = req.user as DecodedToken;
    const { id } = req.params;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    if (!id) {
      return Response.error(res, 400, {
        message: "Linky id not found",
      });
    }

    try {
      const linky = await Linky.findOne({ uid });

      if (!linky) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      if (linky.links?.length === 0) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      const findLink = linky.links?.find((link: LinkyLinks) => link.id === id);

      if (!findLink) {
        return Response.error(res, 400, {
          message: "Link not found",
        });
      }

      const updatedLinky = await Linky.findOneAndUpdate(
        { uid },
        {
          $set: {
            links: linky.links.map((link: LinkyLinks) => {
              if (link.id === id) {
                return {
                  ...link,
                  isPublished: !link.isPublished,
                };
              }

              return link;
            }),
          },
        },
      );

      if (!updatedLinky) {
        return Response.error(res, 400, {
          message: "Something went wrong",
        });
      }

      return Response.success(res, 200, {
        message: "Toggle linky publish success",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },

  dragAndDropLinks: async (req: ApiRequest, res: ExpressResponse) => {
    const { uid, ids } = req.body as LinkyDragDropRequest;

    if (!uid) {
      return Response.error(res, 401, {
        message: "Unauthorized",
      });
    }

    if (!ids || ids.length === 0) {
      return Response.error(res, 400, {
        message: "Linky id not found",
      });
    }

    try {
      const linky = await Linky.findOne({ uid });
      const orderedLinks: LinkyLinks[] = [];

      if (!linky) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      if (linky.links?.length === 0) {
        return Response.error(res, 400, {
          message: "Linky not found",
        });
      }

      // eslint-disable-next-line array-callback-return
      ids.map((id: string) => {
        const findLink = linky.links?.find(
          (link: LinkyLinks) => link.id === id,
        );

        if (findLink) {
          orderedLinks.push(findLink);
        }
      });

      const updatedLinky = await Linky.findOneAndUpdate(
        { uid },
        {
          $set: {
            links: orderedLinks as LinkyLinks[],
          },
        },
      );

      if (!updatedLinky) {
        return Response.error(res, 400, {
          message: "Something went wrong",
        });
      }

      return Response.success(res, 200, {
        message: "Updated links order",
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error.message ?? "Internal server error",
      });
    }
  },
};
