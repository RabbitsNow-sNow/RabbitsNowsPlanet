<template>
  <div class="character-detail" v-if="character">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span> 返回 {{ workTitle }}
    </button>

    <!-- 角色头部信息 -->
    <div class="character-header">
      <div class="header-avatar">
        <img :src="currentProfile?.avatar || character?.mainWorldProfile?.avatar" :alt="character.name">
      </div>
      <div class="header-info">
        <h1 class="character-name">{{ character.name }}</h1>
        <p class="character-role">{{ currentProfile?.role || '未知' }}</p>
        <p class="character-brief">{{ currentProfile?.description || '暂无简介' }}</p>
      </div>
    </div>

    <!-- 平行世界切换标签 -->
    <div class="world-tabs">
      <button 
        v-for="world in parallelWorlds" 
        :key="world.id"
        class="world-tab-btn"
        :class="{ active: currentWorldId === world.id }"
        @click="switchWorld(world.id)"
      >
        <span class="world-icon">{{ world.icon }}</span>
        <span class="world-name">{{ world.name }}</span>
      </button>
    </div>

    <!-- 角色详情内容（根据不同世界显示不同内容） -->
    <div class="character-content">
      <!-- 基础信息卡片（所有世界通用） -->
      <div class="info-card">
        <h3><img :src="InfoIcon" alt="Info" class="meta-icon">基本信息</h3>
        <div class="basic-info-grid">

          <div class="info-item">
            <span class="info-label">性别：</span>
            <span class="info-value">{{ character.baseInfo?.gender || '未知' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">年龄：</span>
            <span class="info-value">{{ currentProfile?.age || '未知' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">生日：</span>
            <span class="info-value">{{ character.baseInfo?.birthday || '未知' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">身高：</span>
            <span class="info-value">{{ character.baseInfo?.height || '未知' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">体重：</span>
            <span class="info-value">{{ character.baseInfo?.weight || '未知' }}</span>
          </div>
        </div>
      </div>

      <!-- 当前世界的外貌 -->
      <div class="info-card" v-if="currentProfile?.appearance">
        <h3><img :src="EyeIcon" alt="eye" class="meta-icon">外貌</h3>
        <p class="info-text">{{ currentProfile.appearance }}</p>
      </div>

      <!-- 当前世界的性格 -->
      <div class="info-card" v-if="currentProfile?.personality">
        <h3><img :src="TagIcon" alt="tag" class="meta-icon">性格</h3>
        <p class="info-text">{{ currentProfile.personality }}</p>
      </div>

      <!-- 当前世界的详细介绍 -->
      <div class="info-card" v-if="currentProfile?.fullDescription">
        <h3><img :src="DetailIcon" alt="detail" class="meta-icon">详细介绍</h3>
        <p class="info-text">{{ currentProfile.fullDescription }}</p>
      </div>

      <!-- 当前世界的喜好与厌恶 -->
      <div class="info-row" v-if="currentProfile?.likes?.length || currentProfile?.dislikes?.length">
        <div class="info-card" v-if="currentProfile?.likes?.length">
          <h3><img :src="LikeIcon" alt="like" class="meta-icon">喜欢</h3>
          <div class="tags-list">
            <span v-for="like in currentProfile.likes" :key="like" class="tag like-tag">
              {{ like }}
            </span>
          </div>
        </div>

        <div class="info-card" v-if="currentProfile?.dislikes?.length">
          <h3><img :src="DislikeIcon" alt="dislike" class="meta-icon">不喜欢</h3>
          <div class="tags-list">
            <span v-for="dislike in currentProfile.dislikes" :key="dislike" class="tag dislike-tag">
              {{ dislike }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 人际关系（所有世界通用） -->
    <div class="relations-section" v-if="character.relations && character.relations.length">
      <div class="section-header">
        <h2 class="section-title">🤝 人际关系</h2>
      </div>
      <div class="relations-grid">
        <RelationCard
          v-for="relation in character.relations"
          :key="relation.characterId"
          :character-id="relation.characterId"
          :name="getCharacterName(relation.characterId)"
          :avatar="getCharacterAvatar(relation.characterId)"
          :relation="relation.relation"
          :description="relation.description"
          :work-id="work?.id"
          @click="goToCharacter"
        />
      </div>
    </div>
  </div>

  <!-- 加载状态 -->
  <div v-else class="loading-state">
    <div class="loading-spinner"></div>
    <p>加载中...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getWorkById } from '@/data/index.js'
import RelationCard from '@/components/RelationCard.vue'

import TagIcon from '@/assets/tag-faces.png'
import InfoIcon from '@/assets/infomation.png'
import DetailIcon from '@/assets/doc-detail-filled.png'
import EyeIcon from '@/assets/eye-fill.png'
import LikeIcon from '@/assets/like-fill.png'
import DislikeIcon from '@/assets/dislike.png'

const route = useRoute()
const router = useRouter()
const work = ref(null)
const character = ref(null)
const workTitle = ref('')
const currentWorldId = ref('main')
const parallelWorlds = ref([])

// 获取当前世界的角色档案（添加默认值）
const currentProfile = computed(() => {
  if (!character.value) return {}
  if (currentWorldId.value === 'main') {
    return character.value.mainWorldProfile || {}
  }
  return character.value.auProfiles?.[currentWorldId.value] || character.value.mainWorldProfile || {}
})

// 获取同作品中其他角色的信息
const getCharacterById = (charId) => {
  return work.value?.characters?.find(c => c.id === charId)
}

const getCharacterName = (charId) => {
  const char = getCharacterById(charId)
  return char?.name || '未知角色'
}

const getCharacterAvatar = (charId) => {
  const char = getCharacterById(charId)
  // 根据当前世界返回对应的头像
  if (char && currentWorldId.value !== 'main') {
    const auProfile = char.auProfiles?.[currentWorldId.value]
    if (auProfile?.avatar) return auProfile.avatar
  }
  return char?.mainWorldProfile?.avatar || '/images/placeholder.jpg'
}

// 切换平行世界
const switchWorld = (worldId) => {
  currentWorldId.value = worldId
  // 更新URL参数，但不刷新页面
  router.replace({
    query: { world: worldId }
  })
}

onMounted(() => {
  const workId = parseInt(route.params.workId)
  const characterId = parseInt(route.params.characterId)
  const worldFromQuery = route.query.world
  
  work.value = getWorkById(workId)
  if (work.value) {
    workTitle.value = work.value.title
    character.value = work.value.characters?.find(c => c.id === characterId)
    parallelWorlds.value = work.value.parallelWorlds || []
    
    // 如果有world参数且存在该世界，则切换到该世界
    if (worldFromQuery && parallelWorlds.value.some(w => w.id === worldFromQuery)) {
      currentWorldId.value = worldFromQuery
    } else {
      currentWorldId.value = 'main'
    }
  }
})

const goBack = () => {
  router.push(`/works/${route.params.workId}`)
}

const goToCharacter = ({ characterId }) => {
  // 跳转时带上当前世界参数
  router.push({
    path: `/works/${route.params.workId}/character/${characterId}`,
    query: { world: currentWorldId.value }
  })
}
</script>

<style scoped>
.character-detail {
  max-width: 900px;
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

/* 角色头部 */
.character-header {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header-avatar {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 0%;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.header-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character-name {
  font-size: 2rem;
  color: #555;
  margin-bottom: 8px;
  font-weight: 700;
}

.character-role {
  font-size: 1.1rem;
  color: #c99c89;
  margin-bottom: 12px;
}

.character-brief {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

/* 平行世界切换标签 */
.world-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  border-bottom: 2px solid #eee;
  padding-bottom: 0;
}

.world-tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 0.95rem;
  color: #c99c89;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  border-radius: 30px;
}

.world-tab-btn:hover {
  background: #f6efec;
  color: #bc775a;
}

.world-tab-btn.active {
  background: #f6efec;
  color: #bc775a;
  font-weight: 500;
}

.world-icon {
  font-size: 1.2rem;
}

/* 角色内容 */
.character-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card {
  background: #f9f9f9;
  border-radius: 16px;
  padding: 20px;
}

.info-card h3 {
  font-size: 1.2rem;
  color: #bc775a;
  margin-bottom: 16px;
  font-weight: 600;
}

/* 基本信息网格 */
.basic-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.info-label {
  font-size: 0.9rem;
  color: #888;
  min-width: 50px;
}

.info-value {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

/* 信息文本 */
.info-text {
  color: #666;
  line-height: 1.7;
  white-space: pre-wrap;
}

/* 喜好标签行 */
.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 6px 14px;
  background: white;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #555;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.like-tag {
  background: #f6efec;
  color: #bc775a;
}

.dislike-tag {
  background: #f6efec;
  color: #bc775a;
}

/* 人际关系 */
.relations-section {
  margin-top: 30px;
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: 1.3rem;
  color: #bc775a;
  font-weight: 600;
}

.relations-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.meta-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 8px;
  margin-bottom: 5px;
}

/* 响应式 */
@media (max-width: 768px) {
  .character-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    padding: 20px;
  }

  .header-avatar {
    width: 150px;
    height: 150px;
  }

  .character-name {
    font-size: 1.6rem;
  }

  .info-row {
    grid-template-columns: 1fr;
  }

  .world-tabs {
    justify-content: center;
  }

  .world-tab-btn {
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  .basic-info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .character-detail {
    padding: 20px 15px;
  }
  
  .world-tab-btn .world-name {
    display: none;
  }
  
  .world-tab-btn {
    padding: 8px 12px;
  }
}
</style>