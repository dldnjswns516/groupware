package com.team02.groupware.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.team02.groupware.dto.ChatMessage;




@Mapper
public interface MessengerMapper {
	
	public void insertChatMessage(ChatMessage chatMessage);

	public List<Map<String, Object>> selectChatRoomList(String userId);

	public List<Map<String, Object>> selectChatRoomView(String roomCode);
	
}
