package com.example.hackabit;


import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {Reminder.class}, version = 1)
public abstract class ReminderDatabase extends RoomDatabase {
public abstract RemDAO getReminderDAO();

}
