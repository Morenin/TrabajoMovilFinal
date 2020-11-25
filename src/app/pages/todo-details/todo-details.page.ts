import { Component, OnInit } from '@angular/core';
import { TaskI } from '../../models/task.interface';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})

export class TodoDetailsPage implements OnInit {
  todo: TaskI = {
    actividad: '',
    dia: new Date(),
  };
  todoId = null;
  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private todoService: TodoService) { }
  ngOnInit() {
    this.todoId = this.route.snapshot.paramMap.get('id');
    if (this.todoId) {
      this.loadTodo();
    }
  }
  async loadTodo() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }
  async saveTodo() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving.....'
    });
    await loading.present();
    if (this.todoId) { // Usaremos el mismo botón para actualizar y para crear
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        this.loadingCtrl.dismiss();
        this.navCtrl.navigateForward('/');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        this.loadingCtrl.dismiss();
        this.navCtrl.navigateForward('/');
      });
    }
  }
  deleteTodo(idTodo: string) {
    this.todoService.removeTodo(idTodo);
  }
}
