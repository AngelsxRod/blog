/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  private bcryptRounds: number;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    this.bcryptRounds =
      this.configService.get<number>('security.bcryptRounds') ?? 10;
  }

  private async findUserOrFail(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Correo electrónico ya registrado');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.bcryptRounds,
    );

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async findAll({
    page,
    limit,
    skip,
  }: {
    page: number;
    limit: number;
    skip: number;
  }) {
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Los parámetros de paginación deben ser mayores a 0',
      );
    }

    const users = await this.userModel
      .find({ status: true })
      .select('-password')
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.userModel.countDocuments({ status: true });

    return {
      data: users,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.findUserOrFail(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException(
        'Debe proporcionar al menos un campo para actualizar',
      );
    }

    await this.findUserOrFail(id);

    if (updateUserDto.email) {
      const emailExists = await this.userModel.findOne({
        email: updateUserDto.email,
        _id: { $ne: id },
      });

      if (emailExists) {
        throw new ConflictException('Correo electrónico ya registrado');
      }
    }

    const updateData: Record<string, unknown> = { ...updateUserDto }; // Copia de los datos a actualizar y record sirve para evitar mutar el DTO original

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findUserOrFail(id);

    user.status = false;
    await user.save();

    return user;
  }
}
