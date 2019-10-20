package com.example.hackabit;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import java.util.ArrayList;


public class ReminderAdapter extends RecyclerView.Adapter<ReminderAdapter.ReminderViewHolder> {
    Chat fragment;
    Context context;
    ArrayList<Reminder> reminders;
    public ReminderAdapter(Context context, ArrayList<Reminder> reminders, Chat fragment){
        this.context = context;
        this.reminders = reminders;
        this.fragment = fragment;
    }

    @NonNull
    @Override
    public ReminderAdapter.ReminderViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.reminder_item, parent, false);
return new ReminderViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReminderAdapter.ReminderViewHolder holder, final int position) {
        final Reminder reminder = reminders.get(position);
        holder.name.setText(reminder.getName());
        holder.time.setText(reminder.getTime().toString());
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                fragment.deleteReminder(position);
            }
        });
    }

    @Override
    public int getItemCount() {
        return reminders.size();
    }

    public class ReminderViewHolder extends RecyclerView.ViewHolder{
        TextView name;
        TextView time;
        public ReminderViewHolder(View view){
            super(view);
            name =view.findViewById(R.id.name);
            time = view.findViewById(R.id.time);
        }
    }
}
