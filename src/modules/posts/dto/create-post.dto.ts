import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsBoolean,
  IsMongoId,
  IsObject,
  IsOptional,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsString({ message: 'El slug debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El slug es obligatorio' })
  @MinLength(3, { message: 'El slug debe tener al menos 3 caracteres' })
  @MaxLength(160, { message: 'El slug no puede tener más de 160 caracteres' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'El slug solo puede contener letras minúsculas, números y guiones (-)',
  })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  slug: string;

  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
  @MaxLength(150, { message: 'El título no puede tener más de 150 caracteres' })
  @Transform(({ value }: { value: string }) => value.trim())
  title: string;

  @IsString({ message: 'El extracto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El extracto es obligatorio' })
  @MinLength(10, { message: 'El extracto debe tener al menos 10 caracteres' })
  @MaxLength(300, {
    message: 'El extracto no puede tener más de 300 caracteres',
  })
  @Transform(({ value }: { value: string }) => value.trim())
  extract: string;

  @IsObject({ message: 'El contenido debe ser un objeto JSON válido' })
  @IsNotEmpty({ message: 'El contenido es obligatorio' })
  content: Record<string, any>;

  @IsString({ message: 'La imagen destacada debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La imagen destacada es obligatoria' })
  @Transform(({ value }: { value: string }) => value.trim())
  featuredImage: string;

  @IsMongoId({ message: 'El autor debe ser un ID de MongoDB válido' })
  @IsNotEmpty({ message: 'El autor es obligatorio' })
  author: string;

  @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
  @IsOptional()
  status?: boolean;
}
