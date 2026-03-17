import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schema/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  private async findPostOrFail(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Publicacion no encontrada');
    }

    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const existingPost = await this.postModel.findOne({
      slug: createPostDto.slug,
    });

    if (existingPost) {
      throw new ConflictException('El slug ya está en uso');
    }

    const post = new this.postModel(createPostDto);

    return post.save();
  }

  async findAll({
    page,
    limit,
    skip,
  }: {
    page: number;
    limit: number;
    skip: number;
  }): Promise<{
    data: PostDocument[];
    total: number;
    page: number;
    pages: number;
  }> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Los parámetros de paginación deben ser mayores a 0',
      );
    }

    const posts = await this.postModel
      .find({ status: true })
      .select('-content')
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.postModel.countDocuments({ status: true });

    return {
      data: posts,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<PostDocument> {
    const post = await this.findPostOrFail(id);
    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDocument> {
    if (Object.keys(updatePostDto).length === 0) {
      throw new BadRequestException(
        'Debe proporcionar al menos un campo para actualizar',
      );
    }

    await this.findPostOrFail(id);

    if (updatePostDto.slug) {
      const slugExists = await this.postModel.findOne({
        slug: updatePostDto.slug,
        _id: { $ne: id },
      });

      if (slugExists) {
        throw new ConflictException('El slug ya está en uso');
      }
    }

    const post = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });

    if (!post) {
      throw new NotFoundException('Publicacion no encontrada');
    }

    return post;
  }

  async remove(id: string): Promise<PostDocument> {
    const user = await this.findPostOrFail(id);
    user.status = false;

    await user.save();

    return user;
  }
}
