import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Request() req, @Body('title') title: string, @Body('description') description?: string): Promise<Task> {
        return this.tasksService.create(req.user.userId, title, description);
    }

    @Get()
    findAll(@Request() req): Promise<Task[]> {
        return this.tasksService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id: string): Promise<Task | null> { 
        return this.tasksService.findOne(req.user.userId, id);
    }

    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateData: Partial<Task>): Promise<Task | null> {
        return this.tasksService.update(req.user.userId, id, updateData);
    }

    @Delete(':id')
    remove(@Request() req, @Param('id') id: string): Promise<Task | null> {
        return this.tasksService.remove(req.user.userId, id);
    }
}
