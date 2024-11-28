export interface ITask{
    completed: unknown;    
    itemId: number;
    taskName: string;
    taskDescription: string;
    dueDate: Date;
    createdOn: Date;
    isCompleted: boolean;
    tags: string;
    completedOn: Date;
}
export class Task{    
    itemId: number;
    taskName: string;
    taskDescription: string;
    dueDate: Date;
    createdOn: Date;
    isCompleted: boolean;
    tags: string;
    completedOn: Date;

    constructor(){
        this.itemId = 0;
        this.taskDescription = '';
        this.completedOn = new Date();
        this.createdOn = new Date();
        this.isCompleted = false,
        this.tags='';
        this.taskName = '';
        this.dueDate = new Date();
    }
}
export interface ApiResponseModel{
    message: string;
    result: string;
    data: any;
}