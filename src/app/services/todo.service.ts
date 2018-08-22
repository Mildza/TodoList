import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { interval } from 'rxjs';
import { Model } from '../todo/todo.model';

export class TodoService {

  public data : Model
  private randomItem: any
  
  constructor() {this.data = new Model(); }

  getApi() {
    if(this.data.Tasks != null) {
      return of(this.data.Tasks.slice());
    } 
  }    
  addToApi(newTask){
    return Observable.create( message =>{
    if(!this.data.Tasks.find( Tasks => Tasks.task === newTask)){
      this.data.Tasks.unshift({task:newTask, finish:false}) 
      message.next("Task added")
    } else {
      message.error("Task with this name already exist!!!")
    }
  })
  }
  updateApi(id){
    const update = this.data.Tasks[id]
    if(update.finish === true) {
      update.finish = false
    } else { 
      update.finish = true
    }
  }
  deleteApi(id){
    this.data.Tasks.splice(id,1)
  }
  randomAdd(){
    const secondsCounter = interval(5000);
    secondsCounter.subscribe(n => {
      this.randomItem = this.data.RndTasks[Math.floor(Math.random()*this.data.RndTasks.length)];
      if(!this.data.Tasks.find( Tasks => Tasks.task === this.randomItem.task)){
        this.data.Tasks.unshift(this.randomItem)
      }
    })
  }
}
