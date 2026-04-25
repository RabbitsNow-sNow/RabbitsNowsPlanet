<template>
  <div class="about">
    <h2>关于我</h2>
    <div class="profile">
      <img :src="snow1" alt="头像" class="avatar">
      <p>你好，我叫RabbitsNow</p>
      <p>如你所见，我非常喜欢兔子</p>
    </div>
  </div>
</template>

<script setup>
import snow1 from '@/assets/snow1.png'
</script>

<style scoped>
.about {
  text-align: center;
  padding: 50px;
  color:#c99c89;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 0%;
  object-fit: cover;
}
</style>