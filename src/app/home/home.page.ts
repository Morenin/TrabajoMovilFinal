import { Component, OnInit } from '@angular/core';
import { isWithinInterval } from 'date-fns/esm';
import { TaskI } from '../models/task.interface';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: TaskI[];
  startDate;
  endDate;
  filtered: any;

  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
      this.filtered = res;
    });
  }

  loadResults(){
    if (this.startDate >= this.endDate){
      this.endDate = this.startDate;
    }
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    this.filtered = this.todos.filter( item => {
      return isWithinInterval(new Date(item.dia), {start: startDate, end: endDate} )
    })
  }
}
