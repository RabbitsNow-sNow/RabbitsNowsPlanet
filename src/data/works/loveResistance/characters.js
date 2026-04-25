// src/data/works/work-1/characters.js
export const characters = [
  {
    id: 101,
    name: '刘幸',
    // 基础设定（所有世界通用的）
    baseInfo: {
      gender: '女',
      birthday: '3月6日',
      height: '160cm',
      weight: '55kg',
    },
    // 主世界设定
    mainWorldProfile: {
      age: 18,
      role: '学生',
      avatar: '/images/characters/LiuXing1-normal.png',
      appearance: '粉色卷毛软乎乎。小肚腩也软乎乎。',
      personality: '内向害羞的女生。\n喜欢胡思乱想，常常自卑，常常不开心。\n老是冒出一些扭曲的想法，过后又反思自己的不好。\n实际本性善良，即使对不喜欢的人也很温柔，只会让自己受委屈。拧巴的讨好型人格。',
      description: '总是在胡思乱想的女孩',
      fullDescription: '。',
      likes: ['偷拍', '摄影', '看小说','涩涩'],
      dislikes: ['运动', ]
    },
    // 不同平行世界的具体设定
    auProfiles: {
      'au-WesternFantasy': {
        age: 18,
        role: '兔兽灵',
        avatar: '/images/characters/LiuXing1-smile.png',
        appearance: '兔耳朵，兔尾巴。',
        personality: '内向害羞的兔子。\n喜欢胡思乱想，常常自卑，常常不开心。\n老是冒出一些扭曲的想法，过后又反思自己的不好。\n实际本性善良，即使对不喜欢的人也很温柔，只会让自己受委屈。拧巴的讨好型人格。',
        description: '总是在胡思乱想的兔子',
        fullDescription: '被魔药师凌奈捡到的兔子。',
        likes: ['观星', '天文', '奶茶'],
        dislikes: ['数学', '考试']
      },
      'au-Idol': {
        age: 19,
        role: '少女偶像',
        avatar: '/images/characters/LiuXing1-smile.png',
        appearance: 'xox',
        personality: 'xox',
        description: 'xox',
        fullDescription: 'xox',
        likes: ['xox', 'xox'],
        dislikes: ['xox', 'xox']
      },
      'au-xianxia': {
        age: 18,
        role: '入门弟子',
        avatar: '/images/characters/ellis-xianxia.jpg',
        appearance: 'xox',
        personality: 'xox',
        description: 'xox',
        fullDescription: 'xox',
        likes: ['xox', 'xox'],
        dislikes: ['xox', 'xox']
      }
    },
    relations: [
      { characterId: 102, relation: 'xox', description: 'xox' },
      { characterId: 103, relation: 'xox', description: 'xox' }
    ],
    gallery: []
  },
  {
    id: 102,
    name: '凌奈',
    baseInfo: {
      gender: '男',
      birthday: '2月5日',
      height: '180cm',
      weight: '55kg'
    },
    mainWorldProfile: {
      age: 28,
      role: 'xox',
      avatar: '/images/characters/LingNai1-smile.png',
      appearance: 'xox',
      personality: 'xox',
      description: 'xox',
      fullDescription: 'xox',
      likes: ['xox', 'xox'],
      dislikes: ['xox', 'xox']
    },
    auProfiles: {
      'au-WesternFantasy': {
        age: 32,
        role: 'xox',
        avatar: '/images/characters/leon-school.jpg',
        appearance: 'xox',
        personality: 'xox',
        description: 'xox',
        fullDescription: 'xox',
        likes: ['xox', 'xox'],
        dislikes: ['xox', 'xox']
      },
      'au-Idol': {
        age: 30,
        role: 'xox',
        avatar: '/images/characters/leon-cyber.jpg',
        appearance: 'xox',
        personality: 'xox',
        description: 'xox',
        fullDescription: 'xox',
        likes: ['xox', 'xox'],
        dislikes: ['xox', 'xox']
      }
    },
    relations: [
      { characterId: 101, relation: '学生', description: '艾莉丝是他的学生' }
    ],
    gallery: []
  },
  {
    id: 103,
    name: '萧恩',
    baseInfo: {
      gender: '男',
      birthday: '12月25日',
      height: '187cm',
      weight: '73kg'
    },
    mainWorldProfile: {
      age: 21,
      role: 'xox',
      avatar: '/images/characters/Shawn1-normal.png',
      appearance: 'xox',
      personality: 'xox',
      description: 'xox',
      fullDescription: 'xox',
      likes: ['xox', 'xox'],
      dislikes: ['xox', 'xox']
    },
    auProfiles: {
      'au-WesternFantasy': {
        age: 'xox',
        role: 'xox',
        avatar: '/images/characters/shadow-school.jpg',
        appearance: 'xox',
        personality: 'xox',
        description: 'xox',
        fullDescription: 'xox',
        likes: ['xox', 'xox'],
        dislikes: ['xox', 'xox']
      }
    },
    relations: [
      { characterId: 101, relation: 'xox', description: 'xox' }
    ],
    gallery: []
  }
]