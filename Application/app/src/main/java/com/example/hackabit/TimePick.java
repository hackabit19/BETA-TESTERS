package com.example.hackabit;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

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


public class TimePick extends Fragment{
    int hour, minute;
    TimePicker timePicker;
    Button set;
    EditText name;

    public TimePick() {
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
        set.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                hour = timePicker.getCurrentHour();
                minute = timePicker.getCurrentMinute();
                Toast.makeText(getContext(), hour + " "+minute, Toast.LENGTH_LONG).show();
            }
        });
        return view;
    }



}
