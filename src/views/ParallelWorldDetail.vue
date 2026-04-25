<template>
  <div class="parallel-world-detail" v-if="parallelWorld">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span> 返回 {{ workTitle }}
    </button>

    <!-- 平行世界头部 -->
    <div class="world-header">
      <div class="world-icon-large">
        <span class="world-icon">{{ parallelWorld.icon || '🌍' }}</span>
      </div>
      <div class="world-info">
        <h1 class="world-name">{{ parallelWorld.name }}</h1>
        <p class="world-desc">{{ parallelWorld.description }}</p>
      </div>
    </div>

    <!-- 世界观设定详情 -->
    <div class="world-detail-section">
      <div class="detail-card" v-if="parallelWorld.worldSetting?.setting">
        <h3><img :src="SettingIcon" alt="setting" class="section-icon"> 世界观设定</h3>
        <p class="detail-text">{{ parallelWorld.worldSetting.setting }}</p>
      </div>

      <div class="detail-card" v-if="parallelWorld.worldSetting?.background">
        <h3><img :src="BgIcon" alt="background" class="section-icon"> 背景故事</h3>
        <p class="detail-text">{{ parallelWorld.worldSetting.background }}</p>
      </div>

      <div class="detail-card" v-if="parallelWorld.worldSetting?.worldRules">
        <h3><img :src="RuleIcon" alt="rule" class="section-icon"> 世界规则</h3>
        <p class="detail-text">{{ parallelWorld.worldSetting.worldRules }}</p>
      </div>

      <div class="detail-card" v-if="parallelWorld.worldSetting?.history">
        <h3><img :src="HistoryIcon" alt="history" class="section-icon"> 历史背景</h3>
        <p class="detail-text">{{ parallelWorld.worldSetting.history }}</p>
      </div>
    </div>

    <!-- 该世界观下的角色 - 使用 CharacterCard 组件 -->
    <div class="world-characters-section" v-if="worldCharacters && worldCharacters.length > 0">
      <div class="section-header">
        <h2 class="section-title"><img :src="PeopleIcon" alt="people" class="section-icon"> 登场角色</h2>
        <span class="section-desc">在这个世界中的角色形象</span>
      </div>
      
      <div class="characters-slider" ref="sliderRef">
        <div class="characters-track" :style="{ transform: `translateX(${scrollPosition}px)` }">
          <CharacterCard
            v-for="character in worldCharacters"
            :key="character.id"
            :id="character.id"
            :name="character.name"
            :avatar="character.profile.avatar"
            :role="character.profile.role"
            :description="character.profile.description"
            :work-id="workId"
            @click="goToCharacterDetail"
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

    <!-- 该世界观下的故事 -->
    <div class="world-stories-section" v-if="parallelWorld.stories && parallelWorld.stories.length > 0">
      <div class="section-header">
        <h2 class="section-title"><img :src="StoryIcon" alt="story" class="section-icon"> 相关故事</h2>
      </div>
      <div class="stories-grid">
        <StoryCard
          v-for="story in parallelWorld.stories"
          :key="story.id"
          :id="story.id"
          :title="story.title"
          :preview="story.preview"
          :date="story.date"
          :work-id="workId"
          @click="openStoryDetail"
        />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="!worldCharacters?.length && !parallelWorld.stories?.length" class="empty-state">
      <span class="empty-icon">🌍</span>
      <p class="empty-text">这个世界还在建设中...</p>
      <p class="empty-hint">敬请期待更多内容~</p>
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
import CharacterCard from '@/components/CharacterCard.vue'
import StoryCard from '@/components/StoryCard.vue'

import SettingIcon from '@/assets/setting.png'
import BgIcon from '@/assets/bg.png'
import RuleIcon from '@/assets/rule.png'
import HistoryIcon from '@/assets/history.png'
import PeopleIcon from '@/assets/people_fill.png'
import StoryIcon from '@/assets/say.png'

const route = useRoute()
const router = useRouter()
const work = ref(null)
const parallelWorld = ref(null)
const workTitle = ref('')
const workId = ref(null)

// 滚动相关
const sliderRef = ref(null)
const scrollPosition = ref(0)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const showScrollButtons = ref(true)
const scrollStep = 200

// 获取该世界观下的角色
const worldCharacters = computed(() => {
  if (!work.value || !parallelWorld.value) return []
  
  return work.value.characters
    ?.filter(char => {
      // 找出在该平行世界有设定的角色
      if (parallelWorld.value.id === 'main') {
        return char.mainWorldProfile
      }
      return char.auProfiles?.[parallelWorld.value.id]
    })
    .map(char => {
      let profile
      if (parallelWorld.value.id === 'main') {
        profile = char.mainWorldProfile
      } else {
        profile = char.auProfiles?.[parallelWorld.value.id]
      }
      return {
        id: char.id,
        name: char.name,
        profile: profile
      }
    }) || []
})

const checkScrollButtons = () => {
  if (!sliderRef.value) return
  const container = sliderRef.value
  const track = container.querySelector('.characters-track')
  if (!track) return
  
  const containerWidth = container.clientWidth
  const trackWidth = track.scrollWidth
  
  canScrollLeft.value = scrollPosition.value < 0
  canScrollRight.value = Math.abs(scrollPosition.value) + containerWidth < trackWidth
  showScrollButtons.value = trackWidth > containerWidth
}

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

const handleResize = () => {
  checkScrollButtons()
}

onMounted(() => {
  const workIdParam = parseInt(route.params.workId)
  const auId = route.params.auId
  
  workId.value = workIdParam
  work.value = getWorkById(workIdParam)
  
  if (work.value) {
    workTitle.value = work.value.title
    parallelWorld.value = work.value.parallelWorlds?.find(w => w.id === auId)
  }
  
  window.addEventListener('resize', handleResize)
  setTimeout(checkScrollButtons, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const goBack = () => {
  router.push(`/works/${workId.value}`)
}

const goToCharacterDetail = ({ characterInfo }) => {
  // 跳转时带上平行世界参数
  router.push({
    path: `/works/${workId.value}/character/${characterInfo.id}`,
    query: { world: parallelWorld.value?.id }
  })
}

const openStoryDetail = (story) => {
  console.log('打开故事：', story)
}
</script>

<style scoped>
.parallel-world-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px 50px;
}

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

/* 平行世界头部 */
.world-header {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.world-icon-large {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: #f6efec;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.world-icon {
  font-size: 3.5rem;
}

.world-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.world-name {
  font-size: 2rem;
  color: #555;
  margin-bottom: 8px;
  font-weight: 700;
}

.world-desc {
  font-size: 1rem;
  color: #888;
  line-height: 1.6;
}

/* 详情卡片 */
.world-detail-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.detail-card {
  background: #f9f9f9;
  border-radius: 16px;
  padding: 20px;
}

.detail-card h3 {
  font-size: 1.2rem;
  color: #bc775a;
  margin-bottom: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-text {
  color: #666;
  line-height: 1.7;
  white-space: pre-wrap;
}

/* 角色区域 */
.world-characters-section {
  margin-bottom: 40px;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-desc {
  font-size: 0.9rem;
  color: #d4ac9c;
}

.section-icon {
  width: 22px;
  height: 22px;
}

/* 人物滑动容器 - 复用作品详情页的样式 */
.characters-slider {
  position: relative;
  overflow: hidden;
  padding: 0 20px;
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

/* 故事区域 */
.world-stories-section {
  margin-top: 20px;
}

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
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 0.85rem;
  color: #bbb;
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

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 响应式 */
@media (max-width: 768px) {
  .world-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .world-name {
    font-size: 1.6rem;
  }
  
  .characters-slider {
    min-height: 260px;
  }

  .scroll-btn {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
  
  .scroll-left {
    left: 5px;
  }
  
  .scroll-right {
    right: 5px;
  }
}

@media (max-width: 480px) {
  .parallel-world-detail {
    padding: 20px 15px;
  }
  
  .world-icon-large {
    width: 70px;
    height: 70px;
  }
  
  .world-icon {
    font-size: 2.5rem;
  }
}
</style>