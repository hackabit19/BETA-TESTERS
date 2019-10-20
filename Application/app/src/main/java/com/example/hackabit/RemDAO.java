package com.example.hackabit;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface RemDAO {

    @Insert
    public long addReminder(Reminder reminder);

    @Update
    public void updateContact(Reminder reminder);

    @Delete
    public void deleteContact(Reminder reminder);

    @Query("SELECT * FROM reminders")
    public List<Reminder> getAllReminders();

    @Query("SELECT * from reminders where reminder_id  == :reminderId")
    public Reminder getReminder(long reminderId);
}
