<template>
  <div class="work-detail" v-if="work">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span> 返回作品列表
    </button>

    <!-- 作品头部信息区 -->
    <div class="work-header">
      <div class="header-image">
        <img :src="work.coverImage" :alt="work.title">
      </div>
      <div class="header-info">
        <h1 class="work-title">{{ work.title }}</h1>
        <p class="work-description">{{ work.description }}</p>
        <div class="work-meta">
          <span class="meta-item">
            <span class="meta-icon"><img :src="DateIcon" alt="date" class="meta-icon"></span>
            最后更新：{{ work.lastUpdate }}
          </span>
          <span class="meta-item">
            <span class="meta-icon"><img :src="SayIcon" alt="say" class="meta-icon"></span>
            {{ storyCount }} 篇碎碎念
          </span>
          <span class="meta-item">
            <span class="meta-icon"><img :src="PaintIcon" alt="paint" class="meta-icon"> </span>
            {{ artCount }} 幅涂鸦
          </span>
          <span class="meta-item">
            <span class="meta-icon"><img :src="PeopleIcon" alt="people" class="meta-icon"></span>
            {{ characterCount }} 位角色
          </span>
        </div>
      </div>
    </div>

    <!-- 人物栏目 - 可左右拖动 -->
    <div class="characters-section" v-if="work.characters && work.characters.length > 0">
      <div class="section-header">
        <h2 class="section-title"><img :src="PeopleIcon" alt="people" class="meta-icon"> 角色</h2>
        <span class="section-desc">拖动查看所有角色</span>
      </div>
      
      <div class="characters-slider" ref="sliderRef">
        <div class="characters-track" :style="{ transform: `translateX(${scrollPosition}px)` }">
          <CharacterCard
            v-for="character in work.characters"
            :key="character.id"
            :id="character.id"
            :name="character.name"
            :avatar="character.mainWorldProfile?.avatar"
            :role="character.mainWorldProfile?.role"
            :description="character.mainWorldProfile?.description"

            :work-id="work.id"
            @click="openCharacterDetail"
          />
        </div>
        
        <!-- 左右滚动按钮 -->
        <button 
          class="scroll-btn scroll-left" 
          @click="scrollLeft"
          :class="{ 'show': canScrollLeft }"
          v-if="showScrollButtons"
        >
          ←
        </button>
        <button 
          class="scroll-btn scroll-right" 
          @click="scrollRight"
          :class="{ 'show': canScrollRight }"
          v-if="showScrollButtons"
        >
          →
        </button>
      </div>
    </div>

    <!-- 平行世界栏目 -->
    <div class="parallel-worlds-section" v-if="work.parallelWorlds && work.parallelWorlds.length > 0">
      <div class="section-header">
         <h2 class="section-title"><img :src="WorldIcon" alt="world" class="meta-icon"> 平行世界</h2>
       <span class="section-desc">不同世界观下的故事</span>
      </div>
  
      <div class="parallel-worlds-grid">
        <AUCard
         v-for="au in work.parallelWorlds"
          :key="au.id"
          :au="au"
          :work-id="work.id"
        />
      </div>
    </div>

    <!-- 创作分类标签 -->
    <div class="creation-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab"
        class="tab-btn"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        {{ tab }}
        <span class="tab-count" v-if="tab === '全部'">({{ totalCount }})</span>
        <span class="tab-count" v-if="tab === '碎碎念'">({{ work.stories.length }})</span>
        <span class="tab-count" v-if="tab === '涂鸦'">({{ work.arts.length }})</span>
      </button>
    </div>

    <!-- 全部内容 -->
    <div v-if="currentTab === '全部'" class="all-section">
      <div class="all-grid">
        <div 
          v-for="item in sortedAllItems" 
          :key="item.id"
          class="all-item"
        >
          <!-- 碎碎念卡片 -->
          <StoryCard
            v-if="item.type === 'story'"
            :id="item.id"
            :title="item.title"
            :preview="item.preview"
            :date="item.date"
            :work-id="work.id"
            class="story-card-full"
            @click="openStoryDetail"
          />

          <!-- 涂鸦卡片 -->
          <ArtCard
            v-if="item.type === 'art'"
            :id="item.id"
            :title="item.title"
            :description="item.description"
            :image="item.image"
            :date="item.date"
            :work-id="work.id"
            class="art-card-full"
            :class="{ 'has-description': item.description }"
            @click="openArtDetail"
          />
        </div>
      </div>
    </div>

    <!-- 碎碎念列表 -->
    <div v-if="currentTab === '碎碎念'" class="stories-section">
      <div class="stories-grid">
        <StoryCard
          v-for="story in work.stories"
          :key="story.id"
          :id="story.id"
          :title="story.title"
          :preview="story.preview"
          :date="story.date"
          :work-id="work.id"
          @click="openStoryDetail"
        />
      </div>
    </div>

    <!-- 涂鸦列表 - 两栏布局 -->
    <div v-if="currentTab === '涂鸦'" class="arts-section">
      <div class="arts-masonry">
        <ArtCard
          v-for="art in work.arts"
          :key="art.id"
          :id="art.id"
          :title="art.title"
          :description="art.description"
          :image="art.image"
          :date="art.date"
          :work-id="work.id"
          class="art-card-masonry"
          :class="{ 'has-description': art.description }"
          @click="openArtDetail"
        />
      </div>
    </div>

    <!-- 空状态显示 -->
    <div v-if="currentTab === '全部' && sortedAllItems.length === 0" class="empty-state">
      <p class="empty-text">这里还什么都没有QwQ</p>
    </div>

    <div v-if="currentTab === '碎碎念' && work.stories.length === 0" class="empty-state">
      <p class="empty-text">还没有碎碎念QwQ</p>
    </div>

    <div v-if="currentTab === '涂鸦' && work.arts.length === 0" class="empty-state">
      <p class="empty-text">还没有涂鸦QwQ</p>
    </div>
  </div>

  <!-- 加载状态 -->
  <div v-else class="loading-state">
    <div class="loading-spinner"></div>
    <p>加载中...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getWorkById } from '@/data/index.js'
import StoryCard from '@/components/StoryCard.vue'
import ArtCard from '@/components/ArtCard.vue'
import CharacterCard from '@/components/CharacterCard.vue'
import PaintIcon from '@/assets/bxs-paint.png'
import SayIcon from '@/assets/say.png'
import DateIcon from '@/assets/date.png'
import PeopleIcon from '@/assets/people_fill.png'
import AUCard from '@/components/AUCard.vue'
import WorldIcon from '@/assets/world.png'

const route = useRoute()
const router = useRouter()
const work = ref(null)
const currentTab = ref('全部')
const tabs = ['全部', '碎碎念', '涂鸦']

// 人物滚动相关
const sliderRef = ref(null)
const scrollPosition = ref(0)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const showScrollButtons = ref(true)
const scrollStep = 200 // 每次滚动距离

// 检查滚动按钮状态
const checkScrollButtons = () => {
  if (!sliderRef.value) return
  
  const container = sliderRef.value
  const track = container.querySelector('.characters-track')
  if (!track) return
  
  const containerWidth = container.clientWidth
  const trackWidth = track.scrollWidth
  
  canScrollLeft.value = scrollPosition.value < 0
  canScrollRight.value = Math.abs(scrollPosition.value) + containerWidth < trackWidth
  
  // 如果内容宽度小于容器宽度，隐藏按钮
  showScrollButtons.value = trackWidth > containerWidth
}

// 滚动方法
const scrollLeft = () => {
  const newPosition = Math.min(scrollPosition.value + scrollStep, 0)
  scrollPosition.value = newPosition
  checkScrollButtons()
}

const scrollRight = () => {
  if (!sliderRef.value) return
  
  const container = sliderRef.value
  const track = container.querySelector('.characters-track')
  if (!track) return
  
  const containerWidth = container.clientWidth
  const trackWidth = track.scrollWidth
  const maxScroll = -(trackWidth - containerWidth)
  
  const newPosition = Math.max(scrollPosition.value - scrollStep, maxScroll)
  scrollPosition.value = newPosition
  checkScrollButtons()
}

// 监听窗口大小变化
const handleResize = () => {
  checkScrollButtons()
}

onMounted(() => {
  const workId = parseInt(route.params.id) 
  // 从数据文件中查找对应的作品
  //work.value = worksData.find(w => w.id === workId)
  work.value = getWorkById(workId)
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
  setTimeout(checkScrollButtons, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const storyCount = computed(() => {
  return work.value?.stories?.length || 0
})

const artCount = computed(() => {
  return work.value?.arts?.length || 0
})

const characterCount = computed(() => {
  return work.value?.characters?.length || 0
})

// 计算总数
const totalCount = computed(() => {
  if (!work.value) return 0
  return work.value.stories.length + work.value.arts.length
})

// 合并并排序所有内容（按时间倒序）
const sortedAllItems = computed(() => {
  if (!work.value) return []
  
  const stories = work.value.stories.map(story => ({
    ...story,
    type: 'story'
  }))
  
  const arts = work.value.arts.map(art => ({
    ...art,
    type: 'art'
  }))
  
  return [...stories, ...arts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
})

const goBack = () => {
  router.push('/works')
}

const openStoryDetail = (story) => {
  console.log('打开故事：', story)
  // router.push(`/works/${story.workId}/story/${story.id}`)
}

const openArtDetail = (art) => {
  console.log('打开涂鸦：', art)
  // router.push(`/works/${art.workId}/art/${art.id}`)
}

const openCharacterDetail = (character) => {
  console.log('打开角色：', character)
  // router.push(`/works/${character.workId}/character/${character.id}`)
}
</script>

<style scoped>
.work-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 50px;
}

/* 返回按钮 */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  background: none;
  border: none;
  color: #c99c89;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 30px;
  transition: color 0.3s;
}

.back-btn:hover {
  color: #bc775a;
}

.back-icon {
  font-size: 1.2rem;
}

/* 作品头部 */
.work-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-bottom: 40px;
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header-image {
  width: 300px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.header-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.work-title {
  font-size: 2.2rem;
  color: #555;
  margin-bottom: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.work-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 24px;
}

.work-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555;
  font-size: 0.95rem;
}

.meta-icon {
  font-size: 1.1rem;
}

/* 人物栏目 */
.characters-section {
  margin-bottom: 05px;
  padding: 20px 0;
  background: #fafafa;
  border-radius: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  padding: 0 20px;
}

.section-title {
  font-size: 1.3rem;
  color: #bc775a;
  font-weight: 600;
}

.section-desc {
  font-size: 0.9rem;
  color: #d4ac9c;
}

/* 人物滑动容器 */
.characters-slider {
  position: relative;
  overflow: hidden;
  padding: 0 20px;
  margin-top: 30px;
  min-height: 290px;
}

.characters-track {
  display: flex;
  gap: 16px;
  transition: transform 0.3s ease;
  will-change: transform;
}

/* 滚动按钮 */
.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #dec3b8;
  transition: all 0.3s;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
}

.scroll-btn.show {
  opacity: 1;
  pointer-events: auto;
}

.scroll-btn:hover {
  background: #f5f5f5;
  color: #cea08d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.scroll-left {
  left: 10px;
}

.scroll-right {
  right: 10px;
}

/* 创作分类标签 */
.creation-tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
}

.tab-btn {
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #c99c89;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.tab-btn:hover {
  color: #bc775a;
}

.tab-btn.active {
  color: #bc775a;
  font-weight: 600;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: #bc775a;
  border-radius: 3px 3px 0 0;
}

.tab-count {
  margin-left: 6px;
  font-size: 0.9rem;
  color: #d4ac9c;
}

/* 全部视图 */
.all-section {
  margin-top: 20px;
}

.all-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.all-item {
  width: 100%;
}

.story-card-full {
  width: 100%;
}

.art-card-full {
  width: 100%;
}

/* 涂鸦分类 - 两栏布局 */
.arts-section {
  margin-top: 20px;
}

.arts-masonry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.art-card-masonry {
  width: 100%;
  margin-bottom: 0;
  break-inside: avoid;
}

.art-card-masonry :deep(.art-image-container) {
  height: auto;
  aspect-ratio: auto;
  background: #f5f5f5;
}

.art-card-masonry :deep(.art-image) {
  position: relative;
  width: 100%;
  height: auto;
  object-fit: contain;
  background: #f5f5f5;
}

/* 碎碎念列表 */
.stories-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f9f9f9;
  border-radius: 16px;
  margin-top: 20px;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  color: #d4ac9c;
  font-size: 1rem;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #d4ac9c;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #bc775a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

/* 平行世界栏目 */
.parallel-worlds-section {
  margin-bottom: 20px;
  padding: 20px 20px;
  background: #fafafa;
  border-radius: 16px;
}

.parallel-worlds-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .work-header {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }

  .header-image {
    width: 100%;
    height: 250px;
  }

  .work-title {
    font-size: 1.8rem;
  }

  .work-meta {
    gap: 16px;
  }

  .creation-tabs {
    gap: 10px;
  }

  .tab-btn {
    padding: 10px 16px;
    font-size: 1rem;
  }

  .arts-masonry {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .characters-section {
    padding: 15px 0;
  }

  .section-header {
    padding: 0 15px;
  }

  .characters-slider {
    padding: 0 15px;
  }

  .character-card {
    width: 140px;
  }
}

@media (max-width: 480px) {
  .work-detail {
    padding: 20px 15px;
  }

  .work-title {
    font-size: 1.5rem;
  }

  .work-description {
    font-size: 1rem;
  }

  .meta-item {
    font-size: 0.85rem;
  }

  .all-grid {
    gap: 20px;
  }

  .character-card {
    width: 120px;
  }

  .scroll-btn {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
}
  .meta-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 1px;
  margin-bottom: 8px;
}
</style>