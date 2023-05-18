import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Column()
  nickName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Column()
  @MaxLength(20)
  lastName: string;

  @IsOptional()
  @IsNumber()
  @Column({ nullable: true })
  age: number;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Column()
  password: string;
}
