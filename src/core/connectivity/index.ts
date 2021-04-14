// see here for asarUnpack package.json option: https://threads.js.org/getting-started
import { spawn, Thread, Worker } from "threads"
import { WorkerMessages } from '@/shared'
import { AppManager } from "../manager"



const MODULE_NAME = 'Connectivity'

let thread: any

const init = async () => {

  AppManager.on(WorkerMessages.MESSAGE, (value: any) => {
    console.log('MEssage received!', value)
  })
  thread = await spawn(new Worker('./worker.ts'))

  Thread.events(thread).subscribe(event => console.log("Thread event:", event))

  const result = await thread.init()
  console.log('RESULT FROM WORKER', result);


}

const unref = () => {
  
  Thread.terminate(thread)

}

export default {
  name: MODULE_NAME,
  init,
  close,
  unref,
}