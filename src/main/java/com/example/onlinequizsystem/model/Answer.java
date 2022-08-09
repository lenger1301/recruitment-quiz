package com.example.onlinequizsystem.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "answers", schema = "quiz")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long score;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question questionId;
    private boolean isCorrect;
    private boolean isDelete;
    private Date created;
    private Date modified;

    public Answer() {
    }

    public Answer(String name, long score, Question questionId, boolean isCorrect, boolean isDelete, Date created, Date modified) {
        this.name = name;
        this.score = score;
        this.questionId = questionId;
        this.isCorrect = isCorrect;
        this.isDelete = isDelete;
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

    public long getScore() {
        return score;
    }

    public void setScore(long score) {
        this.score = score;
    }

    public Question getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Question questionId) {
        this.questionId = questionId;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
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
