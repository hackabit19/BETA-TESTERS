package com.example.hackabit;

import android.content.Context;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.room.Room;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.sql.Time;
import java.util.ArrayList;


public class TimePick extends Fragment{
    int hour, minute;
    TimePicker timePicker;
    Button set;
    EditText name;
    ReminderDatabase database;
    ArrayList<Reminder> reminders;
    ReminderAdapter reminderAdapter;
    public TimePick(ReminderDatabase database) {
        this.database =database;
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_time_pick, container, false);
        timePicker = (TimePicker) view.findViewById(R.id.timepicker);
        name = (EditText) view.findViewById(R.id.name);
        set = (Button) view.findViewById(R.id.set);
        reminders = new ArrayList<>();
//        reminderAdapter = new ReminderAdapter(getContext(), reminders, Chat.class);
        set.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                hour = timePicker.getCurrentHour();
                minute = timePicker.getCurrentMinute();
                Toast.makeText(getContext(), hour + " "+minute, Toast.LENGTH_LONG).show();
                createContact(name.getText().toString().trim(), hour+ ":" + minute);
            }
        });
        return view;
    }

    public void createContact(String name, String  time){
        new createContactAsyncTask().execute(new Reminder(name, time, 0));
    }

    private class createContactAsyncTask extends AsyncTask<Reminder, Void, Void> {

        @Override
        protected Void doInBackground(Reminder... reminderss) {
            long id = database.getReminderDAO().addReminder(reminderss[0]);
            Reminder reminder = database.getReminderDAO().getReminder(id);
            if(reminder!=null){
                reminders.add(0, reminder);

            }
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
//            reminderAdapter.notifyDataSetChanged();
        }
    }



}
