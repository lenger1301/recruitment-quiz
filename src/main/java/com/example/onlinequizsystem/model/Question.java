package com.example.onlinequizsystem.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "questions", schema = "quiz")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "question_type_id")
    private QuestionType questionTypeId;
    @ManyToOne
    @JoinColumn(name = "question_level_id")
    private QuestionLevel questionLevelId;
    private Date timeout;
    private boolean isDelete;
    private boolean status;
    private Date created;
    private Date modified;

    public Question() {
    }

    public Question(String name, QuestionType questionTypeId, QuestionLevel questionLevelId, Date timeout, boolean isDelete, boolean status, Date created, Date modified) {
        this.name = name;
        this.questionTypeId = questionTypeId;
        this.questionLevelId = questionLevelId;
        this.timeout = timeout;
        this.isDelete = isDelete;
        this.status = status;
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

    public QuestionType getQuestionTypeId() {
        return questionTypeId;
    }

    public void setQuestionTypeId(QuestionType questionTypeId) {
        this.questionTypeId = questionTypeId;
    }

    public QuestionLevel getQuestionLevelId() {
        return questionLevelId;
    }

    public void setQuestionLevelId(QuestionLevel questionLevelId) {
        this.questionLevelId = questionLevelId;
    }

    public Date getTimeout() {
        return timeout;
    }

    public void setTimeout(Date timeout) {
        this.timeout = timeout;
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
