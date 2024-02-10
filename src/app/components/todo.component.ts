import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  todoForm!: FormGroup;
  taskArray!: FormArray;

  ngOnInit(): void {
    this.todoForm = this.createTodoForm();
  }

  processForm() {
    const input = this.todoForm.value;
    console.log("processed form", input);
    this.newTodo.next(input); // Emitting newTodo event
    this.todoForm.reset(); // Resetting the form after submission
  }

  private createTodoForm(): FormGroup {
    // Initialize the taskArray here
    this.taskArray = this.fb.array([]);
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      comments: ['', [Validators.required, Validators.minLength(3)]],
      tasks: this.taskArray // Bind taskArray to 'tasks' form control
    });
  }

  // Send form when submitted, passed out to Parent and clear form
  @Output()
  newTodo = new Subject<Todo>();

  isTodoInvalid(): boolean {
    return this.todoForm.invalid || this.taskArray.length <= 0
  }

  private createTaskForm(): FormGroup {
    return this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['', [Validators.required]],
      completed: [false]
    });
  }

  addTask() {
    this.taskArray.push(this.createTaskForm());
  }

  deleteTask(i: number) {
    this.taskArray.removeAt(i);
  }


}
