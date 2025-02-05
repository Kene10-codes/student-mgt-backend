import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) { }

    @ApiTags('health')
    @ApiOperation({ summary: "Get the health status" })
    @ApiResponse({ status: 200, description: "Returns the health status" })
    @Get()
    @HealthCheck()
    checkHealth() {
        return this.health.check([
            async () => this.db.pingCheck('typeorm'),
            // async () => this.http.pingCheck('google', 'https://www.google.com')
        ])

    }

}
