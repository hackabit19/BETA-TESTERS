package com.example.hackabit;

import android.app.TimePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.room.Room;

import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import com.google.android.gms.vision.text.Line;

import java.sql.Time;
import java.util.ArrayList;


public class Chat extends Fragment {

    TimePicker timePicker;
    LinearLayout add;
    RecyclerView rv;
    ReminderAdapter reminderAdapter;
    ReminderDatabase database;
    ArrayList<Reminder> reminders;
    public Chat() {
        // Required empty public constructor
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view =  inflater.inflate(R.layout.fragment_chat, container, false);
        timePicker = (TimePicker) view.findViewById(R.id.timepicker);
        database = Room.databaseBuilder(getContext(), ReminderDatabase.class, "RemindersDB").build();
        reminders = new ArrayList<>();
        new getAllContactsAsync().execute();
//reminders.addAll(database.getReminderDAO().getAllReminders());
        rv = (RecyclerView) view.findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(getContext()));
        rv.setItemAnimator(new DefaultItemAnimator());
        reminderAdapter = new ReminderAdapter(getContext(), reminders, Chat.this);
        rv.setAdapter(reminderAdapter);
        add = (LinearLayout) view.findViewById(R.id.add);
        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Fragment fragment = new TimePick(database);
                FragmentTransaction ft = getFragmentManager().beginTransaction();
                ft.replace(R.id.fragmentFrame, fragment);
                ft.commit();
                timePicker.setVisibility(View.VISIBLE);
                timePicker.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Toast.makeText(getContext(), timePicker.getCurrentHour(), Toast.LENGTH_LONG).show();
                        timePicker.setVisibility(View.GONE);
                    }
                });
            }
        });
//        int hour  = timePicker.getCurrentHour();
//        int minute = timePicker.getCurrentMinute();
//        Log.v("AAA", hour + " " + minute);

        return view;
    }

    private class getAllContactsAsync extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void... voids) {
            reminders.addAll(database.getReminderDAO().getAllReminders());
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            reminderAdapter.notifyDataSetChanged();
        }
    }

    public void deleteReminder(int position){
        Reminder contact = reminders.get(position);
        new deleteContactAsyncTask().execute(contact);
        reminders.remove(position);
    }

    private class deleteContactAsyncTask extends AsyncTask<Reminder, Void, Void>{

        @Override
        protected Void doInBackground(Reminder... contacts) {
            database.getReminderDAO().deleteContact(contacts[0]);
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            reminderAdapter.notifyDataSetChanged();
            super.onPostExecute(aVoid);
        }
    }






}
