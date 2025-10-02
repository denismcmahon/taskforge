import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body('title') title: string, @Body('description') description?: string): Promise<Task> {
        return this.tasksService.create(title, description);
    }

    @Get()
    findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Task | null> { 
        return this.tasksService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<Task>): Promise<Task | null> {
        return this.tasksService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Task | null> {
        return this.tasksService.remove(id);
    }
}
