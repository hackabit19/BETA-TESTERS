package com.example.hackabit;


public class ChatMessage {
    String message;
    String sender;

    public ChatMessage(String message, String sender){
        this.message = message;
        this.sender = sender;
    }
    public ChatMessage(){}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
