<template>
  <div class="works-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">作品集</h1>
      <p class="page-subtitle">一些幻想、臆想、意淫产物</p>
    </div>

    <!-- 作品卡片列表 - 一列一张，居中显示 -->
    <div class="works-list">
      <WorkCard
        v-for="work in works"
        :key="work.id"
        v-bind="work"
        class="work-card-item"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WorkCard from '@/components/WorkCard.vue'
//import avatar from '@/assets/avatar.jpg'
//import { worksData } from '@/data/content.js'
import { worksList } from '@/data/index.js'  // 改这里

const works = ref(worksList)
//const works = ref(worksData)

</script>

<style scoped>
.works-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 2.5rem;
  color: #c99c89;
  margin-bottom: 10px;
  font-weight: 600;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #c99c89;
  opacity: 0.8;
}

.works-list {
  display: flex;
  flex-direction: column;
  align-items: center;  /* 水平居中 */
  gap: 30px;  /* 卡片之间的间距 */
  width: 100%;
}

.work-card-item {
  width: 100%;
  max-width: 1000px;  /* 限制卡片最大宽度 */
  margin: 0 auto;  /* 确保居中 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .works-page {
    padding: 30px 15px;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .works-list {
    gap: 20px;
  }

  .work-card-item {
    max-width: 100%;  /* 小屏幕上占满宽度 */
  }
}
</style>