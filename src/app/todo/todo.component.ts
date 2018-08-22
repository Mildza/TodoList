import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Subject } from 'rxjs';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

   unfinished: number
   finished: number
   api
   counter = new Subject()

  constructor(private todoService:TodoService) {
    this.counter.subscribe({
      next: ((value) => {
      this.api = value
      this.finished = this.api.filter(word => word.finish === true).length
      this.unfinished = this.api.filter(word => word.finish === false).length
    })
    })    
  }  
  
   add:boolean = false
   newTask:string
   mesagge: string
   color:boolean

  
  ngOnInit() {  
    this.todoService.getApi()
    .subscribe((res) => this.counter.next(res))
    this.todoService.randomAdd()
    const secondsCounter = interval(5000);
    secondsCounter.subscribe(() => {
      this.todoService.getApi()
      .subscribe((res) => this.counter.next(res))
    })    
  }
  newTodo() {
    this.add = true
  }
  addTodo() {
    this.todoService.addToApi(this.newTask)
    .subscribe(
      succes => { 
      this.mesagge = succes
      this.color=true
      setTimeout(() => {
        this.mesagge = ""
        this.color=false
        }, 3000)},
      error => {
      this.mesagge = error
      setTimeout(() => {
        this.mesagge = ""
      }, 3000)
    }
    )
    this.todoService.getApi()
    .subscribe((res) => this.counter.next(res))
    this.newTask = ""
    this.add = false   
  }
  check(id) {
    this.todoService.updateApi(id)
    this.todoService.getApi()
    .subscribe((res) => this.counter.next(res))
  }
  delete(id){
    this.todoService.deleteApi(id)
    this.todoService.getApi()
    .subscribe((res) => this.counter.next(res))
  }  
}
