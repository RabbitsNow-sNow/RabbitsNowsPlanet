<template>
  <div class="work-card" @click="goToDetail">
    <div class="card-image">
      <img :src="coverImage" :alt="title">
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <div class="card-meta">
        <span class="story-count">
        <img :src="SayIcon" alt="say" class="meta-icon"> {{ storyCount }} 个碎碎念</span>
        <span class="art-count">
        <img :src="PaintIcon" alt="paint" class="meta-icon"> {{ artCount }} 幅涂鸦</span>
        <span class="art-count">
        <img :src="PeopleIcon" alt="people" class="meta-icon"> {{ characterCount }} 位角色</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PaintIcon from '@/assets/bxs-paint.png'
import SayIcon from '@/assets/say.png'
import PeopleIcon from '@/assets/people_fill.png'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: '/default-cover.png'
  },
  storyCount: {
    type: Number,
    default: 0
  },
  artCount: {
    type: Number,
    default: 0
  },
  characterCount: {
    type: Number,
    default: 0
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/works/${props.id}`)
}
</script>

<style scoped>
.work-card {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  background: white;
  height: 250px; /* 固定高度 */
  width: 1000px;
}

.work-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  width: 250px; /* 固定宽度 */
  height: 250px;
  flex-shrink: 0; /* 防止图片区域被压缩 */
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  flex: 1; /* 占据剩余空间 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 防止flex溢出 */
}

.card-title {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #555;
  font-weight: 800;
}

.card-description {
  margin: 0 0 15px 0;
  color: #888;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1; /* 让描述区域自动填充空间 */
}

.card-meta {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #888;
  margin-top: auto; /* 推到底部 */
  padding-top: 10px;
  border-top: 1px solid #eee; /* 添加一条分隔线 */
}

@media (max-width: 640px) {
  .work-card {
    flex-direction: column;
    height: auto;
  }
  
  .card-image {
    width: 100%;
    height: 180px;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .card-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
  
  .card-description {
    margin-bottom: 12px;
  }
  
  .card-meta {
    padding-top: 8px;
  }
}

.meta-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 1px;
}
</style>