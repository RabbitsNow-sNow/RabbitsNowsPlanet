<template>
  <div id="app" class="app-container">
    <!-- 顶栏 - 固定 -->
    <header class="app-header">
      <nav class="navbar">
        <div class="nav-container">
          <router-link to="/" class="logo">RabbitsNow's Planet</router-link>
          <div class="nav-links">
            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">首页</router-link>
            <router-link to="/works" class="nav-link" :class="{ active: $route.path.includes('/works') }">作品</router-link>
            <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">关于</router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- 主要内容区 - 可滚动 -->
    <main class="app-main">
      <router-view></router-view>
    </main>

    <!-- 底栏 - 固定 -->
    <footer class="app-footer">
      <div class="footer-container">
        <p>&copy; 2026 RabbitsNow's Planet. All rights reserved.</p>
        <div class="footer-links">
          <a href="#" class="footer-link">隐私政策</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// import RabbitIcon from '@/assets/rabbit.png'
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #E8D5BE;
}

/* 应用容器 - 使用视口高度 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 占满整个视口高度 */
  overflow: hidden; /* 防止整个页面滚动 */
}

/* 顶栏样式 */
.app-header {
  flex-shrink: 0; /* 防止被压缩 */
  background-color: #c99c89;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000; /* 确保顶栏在最上层 */
}

.navbar {
  height: 64px; /* 固定高度 */
  display: flex;
  align-items: center;
}

.nav-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s;
}

.logo:hover {
  color: #ffffff;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: #ebdfd4;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover {
  color: white;
}

.nav-link.active {
  color: white;
  font-weight: 500;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: white;
}

/* 主要内容区 - 可滚动 */
.app-main {
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 垂直滚动 */
  background-color: #fafafa;
  scroll-behavior: smooth; /* 平滑滚动 */
}

/* 自定义滚动条样式（可选） */
.app-main::-webkit-scrollbar {
  width: 12px;
}

.app-main::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.app-main::-webkit-scrollbar-thumb {
  background: #e6d3c0;
  border-radius: 4px;
  
}

.app-main::-webkit-scrollbar-thumb:hover {
  background: #dec3b8;
}

/* 底栏样式 */
.app-footer {
  flex-shrink: 0; /* 防止被压缩 */
  background-color: #c99c89;
  border-top: 1px solid #eee;
  padding: 20px 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.02);
  z-index: 1000;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-link {
  color: #ebdfd4;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }

  .logo {
    font-size: 1.2rem;
  }

  .nav-links {
    gap: 15px;
  }

  .footer-container {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .footer-links {
    gap: 15px;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .navbar {
    height: 56px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}
</style>