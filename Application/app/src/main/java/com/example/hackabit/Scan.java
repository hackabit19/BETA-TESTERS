package com.example.hackabit;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Point;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.vision.barcode.Barcode;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


public class Scan extends Fragment {

    Button scan;
    int BARCODE_READER  =1;

    private OnFragmentInteractionListener mListener;

    public Scan() {
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
        View view = inflater.inflate(R.layout.fragment_scan, container, false);
        scan = (Button) view.findViewById(R.id.scan);

                Intent intent = new Intent(getContext(), BarcodeCapture.class);
                startActivityForResult(intent, BARCODE_READER);
//                startActivity(new Intent(MainActivity.this, MAct.class));

        return view;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(requestCode == BARCODE_READER){
            if(resultCode == CommonStatusCodes.SUCCESS){
                try {
                    if (data != null) {
                        Barcode barcode = data.getParcelableExtra(BarcodeCapture.BarcodeObject);
                        Point[] p = barcode.cornerPoints;
                        Toast.makeText(getContext(), barcode.displayValue + "success", Toast.LENGTH_SHORT).show();
                        try {
                            getApi();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else {
                        Toast.makeText(getContext(), "Failed to capture", Toast.LENGTH_SHORT).show();
                    }
                }catch (Exception e){
                    startActivity(new Intent(getContext(), MAct.class));
                    Toast.makeText(getContext(), "An error occured, please try again", Toast.LENGTH_LONG).show();
                }
            }else {
                Log.v("AAA", CommonStatusCodes.getStatusCodeString(resultCode));

            }
        }else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    void getApi(){
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://iterar-mapi-us.p.rapidapi.com/api/amoxicillin/substances.json")
                .get()
                .addHeader("x-rapidapi-host", "iterar-mapi-us.p.rapidapi.com")
                .addHeader("x-rapidapi-key", "a1c8ed372fmsh901e8630dcc0404p16bb80jsn41d38cb8b4c7")
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                call.cancel();
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                final String resp = response.body().string();
                Activity activity =getActivity();
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(getContext(), resp, Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }

    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }


    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }
    
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
