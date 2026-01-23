import { meta } from "zod/v4/core";
import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";

export type CreateEquipmentDTO = {
  name: string;
  serialNumber: string;
  location: string;
};

export const createEquipment = async (data: CreateEquipmentDTO) => {
  const existing = await prisma.equipment.findUnique({
    where: { serialNumber: data.serialNumber },
  });

  if (existing) {
    throw new ApiError(409, "Equipment with this serial number already exists");
  }

  return prisma.equipment.create({
    data,
  });
};

export const getAllEquipment = async ({
  page,
  limit,
  status,
  location,
  sortBy,
  order,
}: {
  page: number;
  limit: number;
  status?: string;
  location?: string;
  sortBy?: any;
  order?: "asc" | "desc";
}) => {
  const where: any = {};
  const ALLOWED_STATUS = ["ACTIVE", "INACTIVE"] as const;

  const ALLOWED_SORT_FIELDS = [
    "createdAt",
    "name",
    "location",
    "status",
  ] as const;
  if (sortBy && !ALLOWED_SORT_FIELDS.includes(sortBy)) {
    throw new ApiError(
      400,
      `Invalid sortBy field. Allowed fields are: ${ALLOWED_SORT_FIELDS.join(", ")}`
    );
  }

  if( status && !ALLOWED_STATUS.includes(status as any)) {
    throw new ApiError(400, "Invalid status value");
  }

  if (order && !["asc", "desc"].includes(order)) {
    throw new ApiError(400, "Invalid order value");
  }

  if (status) where.status = status;
  if (location) where.location = location;
  const [data, total] = await Promise.all([
    prisma.equipment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
    }),
    prisma.equipment.count({ where }),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
