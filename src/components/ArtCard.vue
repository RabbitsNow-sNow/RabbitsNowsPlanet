<template>
  <div class="art-card" @click="handleClick">
    <div class="art-image-container">
      <img :src="image" :alt="title" class="art-image" loading="lazy">
      <!-- 删除了 art-overlay -->
    </div>
    <div class="art-info" v-if="title || description || date">
      <h4 class="art-title" v-if="title">{{ title }}</h4>
      <p class="art-desc" v-if="description">{{ description }}</p>
      <span class="art-date" v-if="date">
        <span class="icon"><img :src="DateIcon" alt="date" class="meta-icon"></span> {{ date }}
      </span>
    </div>
  </div>
</template>

<script setup>
import DateIcon from '@/assets/date.png'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ''
  },
  workId: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', {
    id: props.id,
    title: props.title,
    image: props.image,
    workId: props.workId
  })
}
</script>

<style scoped>
.art-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  width: 100%;
}

.art-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.art-image-container {
  position: relative;
  width: 100%;
  background: #f5f5f5;
  line-height: 0;
}

.art-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s;
}

.art-info {
  padding: 12px;
}

.art-title {
  font-size: 1rem;
  color: #555;
  margin-bottom: 4px;
  font-weight: 600;
}

.art-desc {
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.art-date {
  color: #999;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon {
  font-size: 0.9rem;
}

.meta-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 1px;
  margin-bottom: 4px;
}
</style>