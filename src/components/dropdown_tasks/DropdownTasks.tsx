import {useState } from "react";
import styles from "./DropdownTasks.module.scss"
import { useQuery } from "react-query";
import { tasksService } from "../../services/task.services";
import Task from "../task/Task";
import { motion } from 'framer-motion';

export default function DropdownTasks() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const {data} = useQuery({
    queryKey: ['tasks list'],
    queryFn: () => tasksService.getTasks(),
  });

  const countTasksComp = data?.filter(task => task.status == false).length || 0;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredTasks = () => {
    if (!data) return [];
    switch (filter) {
      case "completed":
        return data.filter(task => task.status);
      case "active":
        return data.filter(task => !task.status);
      default:
        return data; // "all"
    }
  };

  const clearCompleted = () => {

  };


  return (
    <div className={styles.dropdown_tasks}>
      <button onClick={toggleDropdown} style={{borderBottom: isOpen ? "0.1rem solid": ""}}>
        <motion.img 
          src="../src/assets/arrow_icon.svg" 
          alt="Arrow"  
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <p>Whats needs to be done?</p>
      </button>
      {isOpen && (
        <div>
          {filteredTasks().map((item) => (
            <Task key={item.id} title={item.title} status={item.status} id={item.id}/>
          ))}
          <div className={styles.filters}>
            <p>{countTasksComp} items left</p>
            <button onClick={() => handleFilterChange("all")}>All</button>
            <button onClick={() => handleFilterChange("active")}>Active</button>
            <button onClick={() => handleFilterChange("completed")}>Completed</button>
            <button onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>
      )}
    </div>
  )
}