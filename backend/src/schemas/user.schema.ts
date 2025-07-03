import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  suspiciousLoginCount?: number; // 의심스러운 로그인 횟수
  lastLoginAt?: Date; // 마지막 접속일
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    suspiciousLoginCount: { type: Number, default: 0 },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 });

export const UserModel = model<User>('User', userSchema);
