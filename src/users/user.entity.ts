import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @OneToMany(() => Board, (board) => board.user, { eager: false })
  boards: Board[];
}
