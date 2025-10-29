package com.todo.todoApplication.controller;

import com.todo.todoApplication.model.Todo;
import com.todo.todoApplication.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {
    private final TodoService todoService;
    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }
    @GetMapping
    public List<Todo> getAllTodos(){
        return todoService.getAllTodos();
    }
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo){
        return todoService.createTodo(todo);
    }
    @PutMapping("/{id}/status")
    public Optional<Todo> updateTodoStatus(@PathVariable Long id, @RequestParam boolean completed){
        return todoService.updateTodoStatus(id, completed);
    }
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }


}
