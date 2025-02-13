import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherDTO} from '../../teacher/dto/teacher.dto';
import { Teacher as TeacherEntity } from '../../models/Teacher';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/roles/role.enum';

@Injectable()
export class SeederService {
    constructor(@InjectRepository(TeacherEntity) private userRepository: Repository<TeacherEntity>){}

    teacher : TeacherDTO= {
        name: "Ken Nnamani",
        email: "ken@gmail.com",
        password: "ken5050505",
        roles:  [Role.ADMIN]
    }


    async signup() {
        const user = this.userRepository.create(this.teacher) 
        if(user) {
            await this.userRepository.save(user)
            console.log(`User ${user} added.`);
        }
    }


}
