<template>
  <div class="au-card" @click="goToDetail">
    <div class="au-card-icon">
      <span class="au-icon">{{ au.icon || '🌍' }}</span>
    </div>
    <div class="au-card-content">
      <h3 class="au-card-title">{{ au.name }}</h3>
      <p class="au-card-desc">{{ au.description }}</p>
      <div class="au-card-meta">
        <span class="au-meta-tag">{{ au.setting }}</span>
      </div>
    </div>
    <div class="au-card-arrow">
      <span>→</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  au: {
    type: Object,
    required: true
  },
  workId: {
    type: [String, Number],
    required: true
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/works/${props.workId}/parallel-world/${props.au.id}`)
}
</script>

<style scoped>
.au-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
  cursor: pointer;
}

.au-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: #ddd;
}

.au-card-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  background: #f6efec;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.au-icon {
  font-size: 2rem;
}

.au-card-content {
  flex: 1;
}

.au-card-title {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 4px;
  font-weight: 600;
}

.au-card-desc {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 8px;
}

.au-card-meta {
  display: flex;
  gap: 8px;
}

.au-meta-tag {
  font-size: 0.7rem;
  color: #c99c89;
  background: #f6efec;
  padding: 2px 8px;
  border-radius: 12px;
}

.au-card-arrow {
  flex-shrink: 0;
  color: #ccc;
  font-size: 1.2rem;
  transition: transform 0.3s;
}

.au-card:hover .au-card-arrow {
  transform: translateX(4px);
  color: #bc775a;
}

@media (max-width: 480px) {
  .au-card {
    padding: 16px;
  }
  
  .au-card-icon {
    width: 48px;
    height: 48px;
  }
  
  .au-icon {
    font-size: 1.6rem;
  }
}
</style>