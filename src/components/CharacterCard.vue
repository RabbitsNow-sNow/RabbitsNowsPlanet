<template>
  <div class="character-card" @click="goToDetail">
    <div class="character-avatar">
      <img :src="avatar" :alt="name">
      <!-- 删除 status 标签 -->
    </div>
    <div class="character-info">
      <h4 class="character-name">{{ name }}</h4>
      <p class="character-role" v-if="role">{{ role }}</p>
      <p class="character-desc" v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: { type: [String, Number], required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, default: '' },
  description: { type: String, default: '' },
  // 删除 status
  workId: { type: [String, Number], default: null }
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/works/${props.workId}/character/${props.id}`)
}
</script>

<style scoped>
.character-card {
  flex: 0 0 auto;
  width: 160px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.character-avatar {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f5f5f5;
}

.character-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.character-info {
  padding: 12px;
}

.character-name {
  font-size: 1rem;
  color: #555;
  margin-bottom: 4px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.character-role {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.character-desc {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>