// src/data/works/JiuJiuKeZhan/index.js
import { characters } from './characters.js'
import { stories } from './stories.js'
import { arts } from './arts.js'
import { parallelWorlds } from './parallelWorlds.js'

export const work2 = {
  id: 2,
  title: '九玖客栈',
  description: '暂时还没倒闭的小破店',
  coverImage: '/images/covers/city.jpg',
  lastUpdate: '2024-03-14',
  characters,
  stories,
  arts,
  storyCount: stories.length,  // 自动计算故事数量
  artCount: arts.length,
  characterCount: characters.length,
  parallelWorlds: parallelWorlds || []  // 确保这个字段存在
}