import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";
import { Role } from "../auth/roles/role.enum";


@Entity("students")
export class Student {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    refreshToken: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: [Role.STUDENT],
        nullable: true
    })
    roles?: Role

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    is_revoked: Boolean;

    @OneToOne( () => Report)
    @JoinColumn()
    report?: Report;
}