import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString} from 'class-validator'
export class ReportDTO {
  @ApiProperty({ example: "75" , description: "Enter student's maths score" })
  @IsNotEmpty()
  @IsNumberString()
  mathematics: number;

  @ApiProperty({ example: "40", description: "Enter student's english score" })
  @IsNotEmpty()
  @IsNumberString()
  english: number;
  
  @ApiProperty({ example: "70" , description: "Enter student's science score" })
  @IsNotEmpty()
  @IsNumberString()
  science: number;
  
  @ApiProperty({ example: "145", description: "Total - auto generated or calculated" })
  @IsNotEmpty()
  @IsNumberString()
  total: number;
     
}