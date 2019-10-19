package com.example.hackabit;

import android.app.TimePickerDialog;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TimePicker;
import android.widget.Toast;

import com.google.android.gms.vision.text.Line;

import java.sql.Time;


public class Chat extends Fragment {

    TimePicker timePicker;
    LinearLayout add;
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
        timePicker = (TimePicker) view.findViewById(R.id.timepick);
        add = (LinearLayout) view.findViewById(R.id.add);
        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Fragment fragment = new TimePick();
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



}
