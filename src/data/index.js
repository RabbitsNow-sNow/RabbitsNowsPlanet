// src/data/index.js
import { work1 } from './works/LoveResistance/index.js'
import { work2 } from './works/JiuJiuKeZhan/index.js'

// 所有作品的列表
export const worksList = [work1, work2]

// 根据id获取作品
export const getWorkById = (id) => {
  return worksList.find(work => work.id === id)
}

// 获取作品的平行世界列表
export const getParallelWorldsByWorkId = (workId) => {
  const work = getWorkById(workId)
  return work?.parallelWorlds || []
}

// 获取指定平行世界
export const getParallelWorldById = (workId, auId) => {
  const work = getWorkById(workId)
  return work?.parallelWorlds?.find(w => w.id === auId)
}

// 获取角色在指定世界的设定
export const getCharacterProfileInWorld = (character, worldId) => {
  if (worldId === 'main') {
    return character.mainWorldProfile
  }
  return character.auProfiles?.[worldId] || null
}