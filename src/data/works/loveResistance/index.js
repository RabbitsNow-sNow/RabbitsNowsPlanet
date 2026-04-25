// src/data/works/work-1/index.js
import { characters } from './characters.js'
import { stories } from './stories.js'
import { arts } from './arts.js'
import { parallelWorlds } from './parallelWorlds.js'

export const work1 = {
  id: 1,
  title: 'LoveResistance',
  description: '我的粉毛小肥兔是不是超可爱',
  coverImage: '/images/covers/LoveResistance.png',
  lastUpdate: '2024-03-15',
  characters,
  stories,
  arts,
  storyCount: stories.length,  // 自动计算故事数量
  artCount: arts.length,
  characterCount: characters.length,
  parallelWorlds
}