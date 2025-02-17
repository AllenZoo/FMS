package com.server.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.server.bean.RestResult;
import com.server.dto.UserDto;
import com.server.service.interfaces.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/user")
public class UserController extends BaseController {

    @Autowired
    private IUserService service;

    private Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd")
            .create();

    /* -------------------------------------------------------------------------- */
    /*                                USER REQUESTS                               */
    /* -------------------------------------------------------------------------- */
    
    /**
     * Handles Retrieving User Requests
     * <p>
     * GET /api/v1/user
     */
    @GetMapping(value = "")
    public RestResult<List<UserDto>> getUser() {
        List<UserDto> user = service.getUser();
        return RestResult.success(user, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Retrieving User Requests by ID
     * <p>
     * GET /api/v1/user/{userID}
     */
    @GetMapping(value = "/{userID}")
    public RestResult<UserDto> getUser(@PathVariable("userID") int userID) {
        UserDto user = service.getUser(userID);
        return RestResult.success(user, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Insert User Requests
     * <p>
     * POST /api/v1/user
     */
    @PostMapping(value = "")
    public RestResult<UserDto> insertUser(@RequestBody String jsonPayload) {
        UserDto userDto = gson.fromJson(jsonPayload, UserDto.class);
        UserDto insertedUserDto = service.insertUser(userDto);
        return RestResult.success(insertedUserDto, RestResult.Code.SUCCESS_CREATED);
    }

    /**
     * Handles Update User Requests
     * <p>
     * PUT /api/v1/user/{userID}
     */
    @PutMapping(value = "/{userID}")
    @ResponseBody
    public RestResult<UserDto> updateUser(@RequestBody String jsonPayload, @PathVariable("userID") int userID) {
        // TODO: validate that all fields are present in jsonPayload
        UserDto userDto = gson.fromJson(jsonPayload, UserDto.class);
        service.updateUser(userDto, userID);
        return RestResult.success(userDto, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Partially Updating User Requests
     * <p>
     * PATCH /api/v1/user/{userID}
     */
    @PatchMapping(value = "/{userID}")
    public RestResult<UserDto> patchUser(@RequestBody String jsonPayload, @PathVariable("userID") int userID) {
        // TODO: implement
        UserDto userDto = gson.fromJson(jsonPayload, UserDto.class);
        service.patchUser(userDto, userID);
        return RestResult.success(userDto, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Delete User Requests
     * <p>
     * DELETE /api/v1/user/{userID}
     */
    @DeleteMapping(value = "/{userID}")
    @ResponseBody
    public RestResult<UserDto> deleteUser(@PathVariable("userID") int userID) {
        service.deleteUser(userID);
        return RestResult.success(null, RestResult.Code.SUCCESS_NO_CONTENT);
    }
}
