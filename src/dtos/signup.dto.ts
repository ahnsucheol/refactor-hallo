import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(1, 20)
  nickname: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  image: string;

  constructor(nickname: string, password: string, email: string, image: string) {
    this.nickname = nickname;
    this.password = password;
    this.email = email;
    this.image = image;
  }
}
