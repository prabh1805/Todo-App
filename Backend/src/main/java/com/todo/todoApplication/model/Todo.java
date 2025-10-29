package com.todo.todoApplication.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDate;
@Entity
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private Boolean completed = false;

}
