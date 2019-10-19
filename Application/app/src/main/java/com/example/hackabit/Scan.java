package com.example.hackabit;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Point;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;

import ai.api.AIDataService;
import ai.api.AIListener;
import ai.api.android.AIConfiguration;
import ai.api.android.AIService;
import ai.api.model.AIError;
import ai.api.model.AIRequest;
import ai.api.model.AIResponse;
import ai.api.model.Result;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


public class Scan extends Fragment implements AIListener {

    Button scan, send;
    EditText texxt;
    int BARCODE_READER  =1;
    FirebaseDatabase database;
    DatabaseReference ref;

    private OnFragmentInteractionListener mListener;

    public Scan() {
        // Required empty public constructor
    }

    private AIService aiService;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_scan, container, false);
        database = FirebaseDatabase.getInstance();
        ref = database.getReference();
        scan = (Button) view.findViewById(R.id.scan);
        final AIConfiguration configuration = new AIConfiguration("Client Access Token",
                AIConfiguration.SupportedLanguages.English, AIConfiguration.RecognitionEngine.System);
        aiService = AIService.getService(getContext(), configuration);
        aiService.setListener( this);
        final AIDataService aiDataService = new AIDataService(configuration);
        final AIRequest request = new AIRequest();
//        send.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                String message = texxt.getText().toString().trim();
//                if (!message.equals("")) {
//                    ChatMessage chatMessage = new ChatMessage(message, "user");
//                    ref.child("chat").push().setValue(chatMessage);
//                    request.setQuery(message);
//                    new AsyncTask<AIRequest, Void, AIResponse>() {
//                        @Override
//                        protected AIResponse doInBackground(AIRequest... aiRequests) {
//                            final AIRequest request1 = aiRequests[0];
//                            try {
//                                final AIResponse response = aiDataService.request(request1);
//                                return response;
//                            } catch (Exception e) {
//                                return null;
//                            }
//                        }
//
//                        @Override
//                        protected void onPostExecute(AIResponse aiResponse) {
//                            if (aiResponse != null) {
//                                Result result = aiResponse.getResult();
//                                String reply = result.getFulfillment().getSpeech();
//                                ChatMessage chatMessage1 = new ChatMessage(reply, "bot");
//                                ref.child("chat").push().setValue(chatMessage1);
//                            }
//                        }
//
//
//                    }.execute(request);
//                } else {
//                    aiService.startListening();
//                }
//            }});
//        Intent intent = new Intent(getContext(), BarcodeCapture.class);
//        startActivityForResult(intent, BARCODE_READER);
        scan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getContext(), BarcodeCapture.class);
                startActivityForResult(intent, BARCODE_READER);
            }
        });
//

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

    @Override
    public void onResult(AIResponse result) {

    }

    @Override
    public void onError(AIError error) {

    }

    @Override
    public void onAudioLevel(float level) {

    }

    @Override
    public void onListeningStarted() {

    }

    @Override
    public void onListeningCanceled() {

    }

    @Override
    public void onListeningFinished() {

    }

    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
