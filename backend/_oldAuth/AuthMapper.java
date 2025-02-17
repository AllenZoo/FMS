package com.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AuthMapper {
	public boolean doesAccountExist(@Param("username") String username, @Param("password") String password);
	public int getUserId(@Param("username") String username, @Param("password") String password);
}
