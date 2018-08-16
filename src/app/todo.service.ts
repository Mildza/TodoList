import { of } from 'rxjs';
import { interval } from 'rxjs';


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

  RndTasks = [
    {
      task: 'drink',
      finish: false
    },
    {
      task: 'smoke',
      finish: false
    },
    {
      task: 'watch tv',
      finish: false
    },
    {
      task: 'play games',
      finish: false
    }
  ]

  randomItem
  api
  finished
  unfinished

  constructor() { }

  makeApi() {
    if(this.Tasks != null) {
      return of(this.Tasks.slice());
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

  deleteApi(id){
    this.Tasks.splice(id,1)
  }

  randomAdd(){
    const randomItem = this.RndTasks[Math.floor(Math.random()*this.RndTasks.length)];
    setInterval(function(randomItem) {
    
    this.Tasks.unshift(this.randomItem) 
    
    },4000);
    // const randomItem = this.RndTasks[Math.floor(Math.random()*this.RndTasks.length)];
    // this.Tasks.unshift(randomItem)
  }

  rndInterval(){
    const secondsCounter = interval(5000);
    // Subscribe to begin publishing values
    secondsCounter.subscribe(n => {
      this.randomItem = this.RndTasks[Math.floor(Math.random()*this.RndTasks.length)];
      if(this.Tasks.find( Tasks => Tasks.task === this.randomItem.task)){

      } else {
       
        this.Tasks.unshift(this.randomItem)
        
      }
      
  })
  }

}
