import { Schema, Document, model } from 'mongoose';

export interface Twofa extends Document {
  userId: string; // 해당 사용자 ID
  secret: string; // 2FA Secret
  isActive: boolean; // 2FA 활성화 여부
  createdAt: Date; // 2FA 설정 일자
  updatedAt: Date; // 2FA 업데이트 일자
}

const twofaSchema = new Schema<Twofa>({
  userId: { type: String, required: true, unique: true },
  secret: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const TwofaModel = model<Twofa>('Twofa', twofaSchema);
