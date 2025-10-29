package com.todo.todoApplication.respository;

import com.todo.todoApplication.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
