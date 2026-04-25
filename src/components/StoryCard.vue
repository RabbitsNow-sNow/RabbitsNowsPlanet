<template>
  <div class="story-card" @click="handleClick">
    <div class="story-content">
      <h3 class="story-title">{{ title }}</h3>
      <p class="story-preview">{{ preview }}</p>
      <div class="story-footer">
        <span class="story-date">
          <span class="icon"><img :src="DateIcon" alt="date" class="meta-icon"></span> {{ date }}
        </span>
        <span class="read-more">阅读全文 →</span>
      </div>
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
    required: true
  },
  preview: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  // 可选：如果需要跳转到特定作品下的故事详情
  workId: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  // 可以跳转到故事详情页，或者触发父组件的事件
  emit('click', {
    id: props.id,
    title: props.title,
    workId: props.workId
  })
}
</script>

<style scoped>
.story-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.story-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border-color: #ddd;
}

.story-title {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.story-preview {
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.story-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.story-date {
  color: #999;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.read-more {
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.story-card:hover .read-more {
  opacity: 1;
}

.icon {
  font-size: 1rem;
}

.meta-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 1px;
  margin-bottom: 4px;
}
</style>