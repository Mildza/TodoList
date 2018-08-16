import {Observable } from 'rxjs'
import { of } from 'rxjs';

export class TodoService {

  Tasks = [
    {
      task: 'code',
      finish: true
    },
    {
      task: 'eat',
      finish: false
    },
    {
      task: 'sleep',
      finish: true
    },
    {
      task: 'repeat',
      finish: false
    }
  ]

  constructor() { }

  makeApi() {
    if(this.Tasks != null) {
      return of(this.Tasks);
    } 
  }
  addToApi(newTask){
    this.Tasks.unshift({task:newTask, finish:false})
  }

  updateApi(id){
    const update = this.Tasks[id]
    if(update.finish === true) {
      update.finish = false
    } else { 
      update.finish = true
    }
  }
}
