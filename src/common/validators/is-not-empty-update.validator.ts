import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotEmptyUpdate', async: false })
export class IsNotEmptyUpdateConstraint implements ValidatorConstraintInterface {
  validate(obj: unknown): boolean {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    const values = Object.values(obj as Record<string, unknown>);
    return values.some(
      (val) => val !== undefined && val !== null && val !== '',
    );
  }

  defaultMessage(): string {
    return 'Debe proporcionar al menos un campo para actualizar';
  }
}
