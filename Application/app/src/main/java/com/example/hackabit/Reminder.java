package com.example.hackabit;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

import java.sql.Time;

@Entity(tableName = "reminders")
public class Reminder {

    @ColumnInfo(name = "reminder_name")
    private String name;

    @ColumnInfo(name = "reminder_time")
    private String time;

    @ColumnInfo(name = "reminder_id")
    @PrimaryKey(autoGenerate = true)
    private int id;

    @Ignore
    public Reminder(){

    }

    public Reminder(String name, String time, int id){
        this.id = id;
        this.name = name;
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public String getTime() {
        return time;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
