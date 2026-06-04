package com.poker.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.poker.entity.Room;
import org.apache.ibatis.annotations.Mapper;

/**
 * 房间 Mapper
 */
@Mapper
public interface RoomMapper extends BaseMapper<Room> {
}
