import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('raids')
export class Raid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  raid_id: string;

  @Column('text')
  raw: string;

  @Column('jsonb')
  parsed: Object;
}