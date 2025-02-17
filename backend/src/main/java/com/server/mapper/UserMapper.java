package com.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.server.model.user.UserModel;

import java.util.List;

@Mapper
public interface UserMapper {

    List<UserModel> getAllUser();
    UserModel getUserByID(@Param("userID") int userID);
    void insertUser(@Param("user") UserModel userModel);
    void updateUser(@Param("user") UserModel userModel, @Param("userID") int userID);
    void patchUser(@Param("user") UserModel userModel, @Param("userID") int userID);
    void deleteUser(@Param("userID") int userID);
}
