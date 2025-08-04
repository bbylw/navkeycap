# WebNav Hub

一个简洁、响应式的“键帽风（Keycap UI）”网址导航单页应用。覆盖 AI 搜索、实用工具、社交媒体、云存储、邮箱与科技资讯等分类；支持主题切换（Light/Dark）、平滑滚动、粘性导航、键盘可达性与性能/SEO 优化。

预览/运行
- 直接双击打开 [`index.html`](index.html:1) 即可本地预览（纯静态，无需构建）
- 也可使用任意静态服务器（如 VSCode Live Server）以便测试缓存与相对路径

核心特性
- 视觉与交互（Keycap UI）
  - 导航与卡片采用“圆角厚胶囊/机械键帽”外观，顶部高光 + 底部暗压的斜面质感
  - 主 CTA 橙红渐变键位，Hover 悬浮阴影，Active 按压凹陷，Focus ring 高可见
  - 自适应断点（1200/768/480/360），小屏更紧凑
- 主题系统
  - 自动：跟随系统（prefers-color-scheme）
  - 手动：主题按钮一键切换 Light/Dark，持久化于 localStorage
- 可访问性
  - 键盘可达性与视觉焦点支持
  - 导航激活时自动设置 aria-current="page"
- 性能/SEO
  - 关键 CSS 预加载、Font Awesome 延迟加载（noscript 兜底）
  - preconnect/dns-prefetch 降低首包时延，JS 使用 defer
  - 完整 meta/OG/Twitter/canonical 基础（示例链接可按需替换为实际资源）

目录结构
- [`index.html`](index.html:1)
  页面结构与 meta；包含 Header、Nav、Main（分类/卡片）与 Footer，以及主题按钮的注入位置容器（JS 动态插入）。
- [`style.css`](style.css:1)
  仅保留“键帽风”主题与必要基础规则的单一来源（SST）。包含：
  - 主题 Token：kc-bg/kc-surface/kc-primary 等
  - 组件样式：导航胶囊、键帽卡片、CTA 渐变、焦点环等
  - 响应式与 prefers-reduced-motion 降级
  - 支持 :root[data-theme="light|dark"] 手动切换
- [`main.js`](main.js:1)
  行为逻辑：
  - 外链安全：为 target="_blank" 链接补全 rel="noopener noreferrer"
  - 锚点滚动：内部导航平滑滚动 + pushState 更新 URL
  - 高亮同步：hashchange / 首次载入时同步导航 active 与 aria-current="page"
  - 主题切换：在导航区域末尾动态插入 Theme 按钮，切换 documentElement 的 data-theme 并持久化

快速开始
1. 克隆或下载本仓库
2. 本地打开 [`index.html`](index.html:1) 预览
3. 如需本地 HTTP 服务，使用 Live Server/serve/http-server 均可

使用说明
- 顶部导航点击分类标签，会平滑滚动至对应区块，并在地址栏更新 hash（支持前进/后退）
- 外部链接在新窗口打开，自动补全安全属性
- 右侧/末尾的 “Theme” 按钮可切换 Light/Dark，设置会记忆在 localStorage 中

自定义与扩展
- 配色与风格
  - 修改 [`style.css`](style.css:1) 中 :root 的 Keycap Token（如 --kc-primary、--kc-bg 等）即可全局更换主题
- 分类与卡片
  - 在 [`index.html`](index.html:70) 对应分类 `section.link-grid` 中添加或调整卡片结构：
    ```html
    <div class="link-card">
      <a href="https://example.com" target="_blank"></a>
      <i class="fa-solid fa-star"></i>
      <h3>示例站点</h3>
    </div>
    ```
- 图标
  - 默认使用 Font Awesome CDN；若需进一步加速，可自托管并子集化，仅保留所需图标
- 主题默认值
  - 可在 HTML 根元素手动设置 `data-theme="light"` 或 `data-theme="dark"`；否则按系统设置与本地记忆决定

可访问性最佳实践
- 导航链接在激活时带有 `aria-current="page"`（由脚本设置）
- 建议避免仅用图标表达语义；本项目卡片含 h3 文本，屏幕阅读器可读
- 可按需添加“跳到主内容”链接以进一步优化键盘导航

性能与部署建议
- 自托管与子集化 Font Awesome 或改用 SVG sprite/iconfont
- 在生产环境为静态资源添加指纹与 Cache-Control 策略
- 将 `og:image`、`favicon`、`site.webmanifest` 等文件落地至项目并替换示例 URL
- 部署到任意静态托管（Vercel/Netlify/GitHub Pages/Cloudflare Pages/EdgeOne 等）均可零配置上线

变更日志（相对原 Neumorphism 版本）
- 样式：[`style.css`](style.css:1) 重写为 Keycap UI，移除旧的 Neumorphism/Soft UI 覆盖层与冗余变量
- 行为：[`main.js`](main.js:1) 新增主题切换按钮、主题持久化；新增 aria-current 同步；首次载入默认高亮第一个导航项（当无 hash）
- 文档：本 README 与项目结构说明已同步键帽风

许可证
本项目以 MIT 许可证开源，详见 LICENSE（如未提供可自行添加）。