package com.example.onlinequizsystem.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_positions", schema = "quiz")
public class UserPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean isDelete;
    private Date created;
    private Date modified;

    public UserPosition() {
    }

    public UserPosition(String name, boolean isDelete, Date created, Date modified) {
        this.name = name;
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
