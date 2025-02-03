import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";


@Entity("report")
export class Report {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    studentId: number;

    @Column()
    mathematics: number;

    @Column()
    english: number;

    @Column()
    science: number;

    @Column()
    total: number;
}