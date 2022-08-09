package com.example.onlinequizsystem.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_quiz_answers", schema = "quiz")
public class UserQuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question questionId;
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quizId;
    private boolean isDelete;
    private Date created;
    private Date modified;

    public UserQuizAnswer() {
    }

    public UserQuizAnswer(String name, Question questionId, Quiz quizId, boolean isDelete, Date created, Date modified) {
        this.name = name;
        this.questionId = questionId;
        this.quizId = quizId;
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

    public Question getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Question questionId) {
        this.questionId = questionId;
    }

    public Quiz getQuizId() {
        return quizId;
    }

    public void setQuizId(Quiz quizId) {
        this.quizId = quizId;
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
