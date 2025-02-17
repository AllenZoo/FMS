package com.server.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class BaseController {
    protected Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
}
