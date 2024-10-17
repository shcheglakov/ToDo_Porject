import { tasksService } from '../../services/task.services'
import styles from './Task.module.scss'

export default function Task({title, status, id}:{title:string, status: boolean, id: number}) {

  return (
    <div className={styles.task} onClick={() => tasksService.setStatusTask(id, status)}>
      <img src={status ? "./src/assets/completed.svg" : ""} alt="" style={status ? {padding: "3px"} : {padding: "10px"}}/>
      <p style={status ? {textDecoration: "line-through", opacity: 0.2}: {textDecoration: ""}}>{title}</p>
    </div>
  )
}
