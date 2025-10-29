package com.todo.todoApplication.service;

import com.todo.todoApplication.model.Todo;
import com.todo.todoApplication.respository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }
    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }
    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }
    public Optional<Todo> updateTodoStatus(Long id, boolean completed){
        Optional<Todo> todoOpt = todoRepository.findById(id);
        todoOpt.ifPresent(todo -> {
            todo.setCompleted(completed);
            todoRepository.save(todo);
        });
        return todoOpt;
    }
    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }
}
