package com.poker.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.poker.entity.UserHand;
import org.apache.ibatis.annotations.Mapper;

/**
 * 玩家手牌 Mapper
 */
@Mapper
public interface UserHandMapper extends BaseMapper<UserHand> {
}
