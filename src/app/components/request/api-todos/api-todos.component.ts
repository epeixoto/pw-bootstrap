import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todos } from '../../todos.model';

@Component({
  selector: 'app-api-todos',
  templateUrl: './api-todos.component.html',
  styleUrls: ['./api-todos.component.css']
})
export class ApiTodosComponent implements OnInit {

  baseURL = 'https://jsonplaceholder.typicode.com/todos';

  todos: Todos[] = [];

  todosOBJ: Todos = {
    title: '',
    completed: false,
  };

  id = 1;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    //GET
    this.http.get<Todos[]>(this.baseURL).
    subscribe((todos) => {
      this.todos = todos;
      console.log('->', todos);
    });


    //get Obj
    let url = `${this.baseURL}/${this.id}`;
    this.http.get<Todos>(url).subscribe((todos) => {
      this.todosOBJ = todos;
      console.log('get/id(1) todosOBJ->', this.todosOBJ);

      this.todosOBJ.title = "2323";
      this.todosOBJ.completed = true;

      console.log('(update 1): ', this.todosOBJ);
      this.http.put<Todos>(url, this.todosOBJ).
        subscribe((todos) => {
        console.log('Update:', todos);
      });
    });
  }

}
