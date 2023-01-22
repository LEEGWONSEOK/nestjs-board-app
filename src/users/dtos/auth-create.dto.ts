import { IsNotEmpty } from 'class-validator';
import { AuthCredentialsDto } from './auth-credential.dto';

export class AuthCreateDto extends AuthCredentialsDto {
  @IsNotEmpty()
  nickname: string;
}
