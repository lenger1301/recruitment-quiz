package com.example.onlinequizsystem.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "quizzes", schema = "quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "quiz_levels")
    private QuizLevel quizLevelId;
    private boolean isDelete;
    private boolean status;
    @ManyToMany
    @JoinTable(name = "quiz_questions", schema = "quiz",
    joinColumns = {@JoinColumn(name = "quiz_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name = "question_id", referencedColumnName = "id")})
    private List<Question> questions;
    private Date created;
    private Date modified;

    public Quiz() {
    }

    public Quiz(String name, String description, QuizLevel quizLevelId, boolean isDelete, boolean status, List<Question> questions, Date created, Date modified) {
        this.name = name;
        this.description = description;
        this.quizLevelId = quizLevelId;
        this.isDelete = isDelete;
        this.status = status;
        this.questions = questions;
        this.created = created;
        this.modified = modified;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public QuizLevel getQuizLevelId() {
        return quizLevelId;
    }

    public void setQuizLevelId(QuizLevel quizLevelId) {
        this.quizLevelId = quizLevelId;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getModified() {
        return modified;
    }

    public void setModified(Date modified) {
        this.modified = modified;
    }
}
