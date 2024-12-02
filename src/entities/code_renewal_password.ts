import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'code_renewal_password' })
export default class CodeRenewalPassword {
  @PrimaryColumn()
  id!: number

  @Column({ name: 'email', type: 'varchar' })
  email!: string

  @Column({ name: 'code', type: 'int', nullable: false})
  code!: number

  @Column({ name: 'message_id', type: 'varchar'})
  messageId!: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt!: Date

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt!: Date

}