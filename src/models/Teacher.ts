import { Role } from "../auth/roles/role.enum";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity("teacher")
@Unique(['email'])
export class Teacher {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    
    @Column()
    refreshToken: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: [Role.ADMIN],
        nullable: true
    })
    roles?: Role[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    is_revoked: Boolean;

    @Column()
    password: string;
}