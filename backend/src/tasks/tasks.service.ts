import { Injectable } from '@nestjs/common';
import  { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    async create(userId: string, title: string, description?: string): Promise<Task> {
        const newTask = new this.taskModel({ title, description, userId });
        return newTask.save();
    }

    async findAll(userId: string): Promise<Task[]> {
        return this.taskModel.find({ userId }).exec();
    }

    async findOne(userId: string, id: string): Promise<Task | null> {
        return this.taskModel.findOne({ _id: id, userId }).exec();
    }

    async update(userId: string, id: string, updateData: Partial<Task>): Promise<Task | null> {
        return this.taskModel.findByIdAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    }

    async remove(userId: string, id: string): Promise<Task | null> {
        return this.taskModel.findByIdAndDelete({ _id: id, userId }).exec();
    }
}
