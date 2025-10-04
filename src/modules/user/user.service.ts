import { prisma } from '../../config/db';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';


export const createAdminIfNotExists = async (
  email: string,
  password: string
): Promise<User> => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};


export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};
