import bcrypt from 'bcrypt';
import { prismaClient } from './prisma';
import { RegisterRequestArgs, LoginRequestArgs } from '../types/request';

/*
  Usage: register user
  Implementation: creating new row in `User` column with prisma
*/
export const registerUser = (data: RegisterRequestArgs) => {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    prismaClient.user
      .create({
        data: {
          ...data,
          password: hashedPassword,
        },
      })
      .then(resolve)
      .catch((err: { code: String }) => {
        /* 
          https://www.prisma.io/docs/reference/api-reference/error-reference
          error `P2002` = "Unique constraint failed on the {constraint}" 
          user is trying to signup with and email which is already exits
        */
        if (err.code === 'P2002') {
          reject(`${data.email} already exist`);
        }
        reject('Failed to register user');
      });
  });
};

/*
  Usage: login user
  Implementation: finding user with email & trying to compare password
*/
export const loginUser = (data: LoginRequestArgs) => {
  return new Promise(async (resolve, reject) => {
    const user: any = await findUser({ email: data.email }).catch(reject);
    if (!user) return;

    bcrypt.compare(data.password, user.password, (err, res) => {
      if (err) return reject('Failed to validate password');
      if (!res) return reject('Invalid password');
      resolve(user);
    });
  });
};

/*
  Usage: find user
  Implementation: find user with `email` or `userId`
*/
export const findUser = ({
  email,
  userId,
}: {
  email?: string;
  userId?: number;
}) => {
  return new Promise((resolve, reject) => {
    if (!email || !userId) return;

    let whereData = email ? { email } : { id: userId }; // if email exist find with `email` else find with `id`

    prismaClient.user
      .findUnique({ where: whereData })
      .then((user: any) => {
        if (!user) {
          reject(`Failed to find user with email ${email}`);
          return;
        }
        resolve(user);
      })
      .catch(() => {
        reject(`Failed to find user with email ${email}`);
      });
  });
};
