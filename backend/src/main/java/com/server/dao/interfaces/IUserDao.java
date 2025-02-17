package com.server.dao.interfaces;

import java.util.List;

import com.server.model.user.UserModel;

public interface IUserDao {
    public List<UserModel> getUser();
    public UserModel getUser(int userID);
    public void insertUser(UserModel userModel);
    public void updateUser(UserModel userModel, int userID);
    public void patchUser(UserModel userModel, int userID);
    public void deleteUser(int userID);
}
