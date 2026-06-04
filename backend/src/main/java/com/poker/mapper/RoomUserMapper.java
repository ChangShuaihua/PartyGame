package com.poker.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.poker.entity.RoomUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * 房间玩家 Mapper
 */
@Mapper
public interface RoomUserMapper extends BaseMapper<RoomUser> {
}
