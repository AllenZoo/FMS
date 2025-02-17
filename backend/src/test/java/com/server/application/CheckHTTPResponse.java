package com.server.application;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import com.server.bean.RestResult;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CheckHTTPResponse {
    
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Test
    public void shouldPassIfStringMatches() {
        RestResult<String> res = testRestTemplate.getForObject("http://localhost:" + port + "/api/v1", RestResult.class);
        assertEquals("Welcome to Farming Management System", res.getData());
    }
}
