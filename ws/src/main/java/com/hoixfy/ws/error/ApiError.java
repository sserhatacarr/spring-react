package com.hoixfy.ws.error;

import java.util.HashMap;

import java.util.Map;

import lombok.Data;

@Data
public class ApiError {
    private int status;
    private String message;
    private String path;
    private long timestamp = System.currentTimeMillis();
    private Map<String, String> validationErrors = new HashMap<>();

}
