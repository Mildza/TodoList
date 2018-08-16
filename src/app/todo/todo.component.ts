import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService:TodoService) { }

  api
  add:boolean = false
  newTask:string
  unfinished: number
  finished: number

  ngOnInit() {  
    this.todoService.makeApi()
    .subscribe( (res) => {
      this.api = res
      this.finished = this.api.filter(word => word.finish === true).length
      this.unfinished = this.api.filter(word => word.finish === false).length
    })
  }

  newTodo() {
    this.add = true
  }
  
  addTodo() {
    this.todoService.addToApi(this.newTask)
    this.newTask = ""
    this.todoService.makeApi()
    .subscribe( (res)=> {
      this.api = res
      this.finished = this.api.filter(word => word.finish === true).length
      this.unfinished = this.api.filter(word => word.finish === false).length
      this.add=false
    })    
  }
  check(id) {
    this.todoService.updateApi(id)
    this.todoService.makeApi()
    .subscribe( (res)=> {
      this.api = res
      this.finished = this.api.filter(word => word.finish === true).length
      this.unfinished = this.api.filter(word => word.finish === false).length
      this.add=false
    })
  }

  delete(id){
    this.todoService.deleteApi(id)
    this.todoService.makeApi()
    .subscribe( (res)=> {
      this.api = res
      this.finished = this.api.filter(word => word.finish === true).length
      this.unfinished = this.api.filter(word => word.finish === false).length
      this.add=false
    })
  }
}
