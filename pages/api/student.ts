import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/prisma';

export type CreateStudentRequestBody = {
  name: string;
  gender: 'boy' | 'girl';
  class: number;
  school: string;
  qq?: string;
  wechat?: string;
  message?: string;
  key: string;
};

const createStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { key, ...data } = req.body as CreateStudentRequestBody;
  if (key !== process.env.REGISTER_KEY) {
    res.status(401).send({ error: '登记口令错误' });
  }
  await db.student.create({ data });
  res.json({ status: 'success' });
};

export default createStudent;
