import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseModel, ITask, Task } from './Model/task';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DatePipe, CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Angular-TodoList';
  taskObj: Task = new Task();
  taskList: ITask[] = [];
  filteredTaskList: ITask[] = []; // Hata burada çözülüyor.

  masterService = inject(MasterService);

  ngOnInit(): void{
    this.loadAllTask();
  }


  loadAllTask(){
    this.masterService.getAllTaskList().subscribe((res:ApiResponseModel)=>{
      this.taskList=res.data;

      this.filteredTaskList = [...this.taskList];
    });
  }
  addTask(){
    this.masterService.addNewtask(this.taskObj).subscribe((res:ApiResponseModel)=>{
    if(res.result){
      alert('Task Created Success');
      this.loadAllTask();
      this.taskObj = new Task();
    }else {
      this.updateTask(); 
    }
    },error=>{
      alert('API Call Error');
  });
  
  }
  updateTask(){
    this.masterService.Updatetask(this.taskObj).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        alert('Task Update Success');
        this.loadAllTask();
        this.taskObj = new Task();
      }
      },error=>{
        alert('API Call Error')
    })
  }
  onEdit(item:Task){
    this.taskObj = { ...item };
    setTimeout(()=>{
      const date = new Date(this.taskObj.dueDate);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + date.getMonth()).slice(-2); // Ay indeksinin 1'den başlaması gerektiği için +1 ekliyoruz.
      const today = date.getFullYear() + '-'+(month) +'-'+(day);

      // const inputValue = (<HTMLInputElement>document.getElementById('textDate')).value;
      (<HTMLInputElement>document.getElementById('textDate')).value = today;
      
     
      
    },1000);
  }
    onDelete(id:number){
      const isConfilm = confirm("Silmek istedigine emin misin?");
      if(isConfilm){
        this.masterService.Deletetask(id).subscribe((res:ApiResponseModel)=>{
          if(res.result){
            alert('Task Deleted Success');
            this.loadAllTask();
          }
          },error=>{
            alert('API Call Error')
        })
      }      
    }
   

    showAll() {
      this.filteredTaskList = [...this.taskList];
    }
  
    showCompleted() {
      this.filteredTaskList = this.taskList.filter(task => task.isCompleted);
    }
  
    showPending() {
      this.filteredTaskList = this.taskList.filter(task => !task.isCompleted);
    }
}
