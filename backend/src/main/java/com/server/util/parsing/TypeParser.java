package com.server.util.parsing;

import com.fasterxml.jackson.databind.ObjectMapper;

public class TypeParser {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static <T> T parse(String value, Class<T> type) {
        if (value == null) {
            return null;
        }

        try {
            return objectMapper.convertValue(value.toUpperCase(), type);
        } catch (Exception e) {
            return null;
        }
    }
}
