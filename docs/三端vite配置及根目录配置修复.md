演练：Vite 配置文件配置
我已完成 ad-multi-platform 项目中三个前端应用（user-web, advertiser-web, admin-web）的 Vite 配置。

完成的变更
前端应用配置
分别为每个应用创建了 
vite.config.ts
，包含以下关键配置：

插件: 使用 @vitejs/plugin-react 支持 React。
路径别名: 设置 @ 指向 src 目录，简化导入。
开发服务器:
user-web: 端口 3001
advertiser-web: 端口 3002
admin-web: 端口 3003
代理: 配置 /api 请求转发至 http://localhost:3000。
相关的配置文件：

user-web/vite.config.ts
advertiser-web/vite.config.ts
admin-web/vite.config.ts
工程化修复 (Side Effects)
在验证过程中，我顺便修复了 root 级别的几个配置问题：

package.json
: 添加了 packageManager 字段。
turbo.json
: 将 pipeline 重命名为 tasks 以适配 Turbo 2.0+ 版本。
验证结果
我分别为三个应用运行了生产构建（vite build），均已成功通过：

# user-web
vite v4.5.14 building for production...
✓ built in 728ms
# advertiser-web
vite v4.5.14 building for production...
✓ built in 796ms
# admin-web
vite v4.5.14 building for production...
✓ built in 707ms