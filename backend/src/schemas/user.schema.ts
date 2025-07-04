import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  /** 사용자 이름 */
  username: string;

  /** 이메일 */
  @Prop({ required: true, unique: true })
  email: string;

  /** 비밀번호 */
  @Prop({ required: true })
  password: string;

  /** 의심스러운 로그인 횟수 */
  @Prop({ default: 0 })
  suspiciousLoginCount: number;

  /** 마지막 로그인 일자 */
  @Prop()
  lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
