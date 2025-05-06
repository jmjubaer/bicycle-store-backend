import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'supperAdmin', 'customer'],
      default: 'customer',
    },
    passwordChangedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    city: { type: String, trim: true },
    district: { type: String, trim: true },
    thana: { type: String, trim: true },
    postalCode: { type: Number },
    localAddress: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post middleware or after save middleware
userSchema.post('save', async function (doc, next) {
  doc.password = ''; // remove the password in response
  next(); // optional
});
export const User = model<TUser>('User', userSchema);
