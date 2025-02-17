package com.server.exceptions;

import com.google.gson.JsonSyntaxException;
import com.server.bean.RestResult;
import com.server.exceptions.exceptions.InvalidRequestBodyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidRequestBodyException.class)
    public ResponseEntity<Object> handleValidationException(InvalidRequestBodyException ex) {
        RestResult<String> response = RestResult.fail(ex.getLocalizedMessage(), "Invalid Request Body", RestResult.Code.ERROR_BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(com.google.gson.JsonSyntaxException.class)
    public ResponseEntity<Object> handleValidationException(JsonSyntaxException ex) {
        RestResult<String> response =
                RestResult.fail("Invalid request body value: " + ex.getLocalizedMessage(),"" + ex.getCause(),
                RestResult.Code.ERROR_BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
