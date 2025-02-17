package com.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.bean.RestResult;

@RestController
@RequestMapping(value = "/api/v1")
public class HomeController extends BaseController {

    @GetMapping(value = "")
    public RestResult<String> home() {
        return RestResult.success("Welcome to Farming Management System", RestResult.Code.SUCCESS_OK);
    }
}
