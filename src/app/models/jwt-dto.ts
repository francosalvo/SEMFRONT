import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export class JwtDto {
  token!: string;
  type!: String;
  nombreUsuario!: string;
  authorities!: string[];
}
