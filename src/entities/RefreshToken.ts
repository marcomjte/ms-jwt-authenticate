import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'refresh_token' })
export default class RefreshToken {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @Column({ name: 'expires_at', type: 'datetime' })
  expiresAt!: Date 
}