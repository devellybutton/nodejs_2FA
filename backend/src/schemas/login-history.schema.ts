import { Schema, Document, model } from 'mongoose';

export interface LoginHistory extends Document {
  userId: Schema.Types.ObjectId;
  ipAddress: string;
  device: string;
  userAgent: string;
  isSuspicious: boolean;
  createdAt: Date; // 로그인한 시각
}

const loginHistorySchema = new Schema<LoginHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 사용자 ID,
    ipAddress: { type: String, required: true }, // IP 주소
    device: { type: String, required: true }, // 장치 정보
    userAgent: { type: String, required: true }, // 브라우저/OS 정보
    isSuspicious: { type: Boolean, required: true }, // 의심스러운 로그인 여부
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const LoginHistoryModel = model<LoginHistory>('LoginHistory', loginHistorySchema);
