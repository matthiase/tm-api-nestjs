import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class CredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(24)
  username: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain at least 1 upper case letter, 1 lower case letter, and 1 number or special character'
  })
  password: string
}
