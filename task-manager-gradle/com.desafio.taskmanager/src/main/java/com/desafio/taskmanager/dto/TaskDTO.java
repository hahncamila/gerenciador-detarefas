package com.desafio.taskmanager.dto;

import java.time.LocalDate;

public class TaskDTO {
    public Long id;
    public String title;
    public String description;
    public String status;
    public Long responsibleId;
    public String responsibleUsername;
    public LocalDate dueDate;
}
