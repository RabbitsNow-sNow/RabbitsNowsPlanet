<template>
  <div class="relation-card" @click="handleClick">
    <div class="relation-avatar">
      <img :src="avatar" :alt="name">
    </div>
    <div class="relation-info">
      <h4 class="relation-name">{{ name }}</h4>
      <span class="relation-type">{{ relation }}</span>
      <p class="relation-desc">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  characterId: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true
  },
  description: {
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
    characterId: props.characterId,
    name: props.name,
    workId: props.workId
  })
}
</script>

<style scoped>
.relation-card {
  display: flex;
  gap: 16px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #f0f0f0;
}

.relation-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #ddd;
}

.relation-avatar {
  width: 150px;
  height: 150px;
  border-radius: 0%;
  overflow: hidden;
  flex-shrink: 0;
}

.relation-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.relation-info {
  flex: 1;
}

.relation-name {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 4px;
}

.relation-type {
  display: inline-block;
  padding: 2px 8px;
  background: #f6efec;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #c99c89;
  margin-bottom: 8px;
}

.relation-desc {
  font-size: 0.9rem;
  color: #777;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .relation-card {
    padding: 20px;
  }
  
  .relation-avatar {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .relation-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .relation-avatar {
    width: 120px;
    height: 120px;
  }
}
</style>