import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', type: 'varchar' })
  name!: string

  @Column({ name: 'surname', type: 'varchar' })
  surname!: string

  @Column({ name: 'email', type: 'varchar' })
  email!: string

  @Column({ name: 'password', type: 'varchar', nullable: true})
  password: string | null = null

  @Column({ name: 'language', type: 'varchar' })
  language!: string

  @Column({ name:'status', type: 'varchar', length: 10, default: 'active' })
  status!: string

  @Column({ name: 'failed_login_attempts', type: 'int', nullable: true })
  failedLoginAttempts: number | null = null

  @Column({ name: 'first_failed_login_date', type: 'timestamp', nullable: true })
  firstFailedLoginDate: Date | null = null

  @Column({ name: 'last_failed_login_date', type: 'timestamp', nullable: true })
  lastFailedLoginDate: Date | null = null

  @Column( {name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'} )
  createdAt!: Date
}