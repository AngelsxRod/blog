import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from '@modules/users/schema/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  extract: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  content: Record<string, any>;

  @Prop({ required: true })
  featuredImage: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ default: true })
  status: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
