# Server 端目录结构说明

本文档说明 server 端的目录结构和各文件的用途。

## 目录结构

```
src/
├── app.ts                      # Koa 应用实例配置
├── bootstrap.ts                # 应用启动入口
├── config/                     # 配置文件
├── middlewares/                # 中间件
├── modules/                    # 业务模块
├── routes/                     # 路由配置
├── utils/                      # 工具函数
├── types/                      # 全局类型定义
└── constants/                  # 常量定义
```

## 核心目录说明

### `config/` - 配置管理
- `database.ts` - 数据库连接配置
- `upload.ts` - 文件上传限制配置
- `ssr.ts` - 服务端渲染配置
- `index.ts` - 配置统一导出

### `middlewares/` - 中间件层
- `error.ts` - 统一错误处理
- `logger.ts` - 请求日志记录
- `cors.ts` - 跨域配置
- `auth.ts` - JWT 认证和权限验证
- `validator.ts` - 请求参数验证

### `modules/` - 业务模块层
采用 Controller-Service-Repository 分层架构:

#### `ad/` - 广告模块
- `ad.controller.ts` - 处理 HTTP 请求
- `ad.service.ts` - 业务逻辑处理
- `ad.repository.ts` - 数据访问层
- `ad.types.ts` - 类型定义

#### `approval/` - 审批模块
- 管理广告审批流程
- 支持审批通过/驳回
- 记录审批历史

#### `upload/` - 上传模块
- 处理视频/图片上传
- 文件类型和大小验证
- 支持分片上传

#### `form/` - 动态表单模块
- 表单配置管理
- 动态字段定义
- 表单数据验证

#### `user/` - 用户模块
- 用户认证(登录/注册)
- 用户信息管理

#### `ssr/` - SSR 模块
- React 服务端渲染
- 页面预渲染

### `routes/` - 路由层
- `api.routes.ts` - API 路由总入口
- `ad.routes.ts` - 广告路由
- `approval.routes.ts` - 审批路由
- `upload.routes.ts` - 上传路由
- `form.routes.ts` - 表单路由
- `user.routes.ts` - 用户路由
- `ssr.routes.ts` - SSR 路由
- `index.ts` - 路由导出

### `utils/` - 工具函数
- `response.ts` - 统一 API 响应格式
- `file.ts` - 文件操作工具
- `validation.ts` - 数据验证工具
- `date.ts` - 日期处理工具

### `types/` - 全局类型
- `common.ts` - 通用类型(分页、排序等)
- `api.ts` - API 请求/响应类型
- `context.ts` - Koa Context 扩展类型

### `constants/` - 常量定义
- `status.ts` - 状态码常量
- `messages.ts` - 消息常量
- `upload.ts` - 上传相关常量

## API 路由规范

所有 API 路由统一使用 `/api` 前缀:

- `GET /api/ads` - 获取广告列表
- `POST /api/ads` - 创建广告
- `GET /api/approvals/pending` - 获取待审批列表
- `POST /api/upload/video` - 上传视频
- `GET /api/forms/:formId` - 获取表单配置

## 开发规范

1. **分层架构**: 严格遵循 Controller-Service-Repository 分层
2. **类型安全**: 所有接口使用 TypeScript 类型定义
3. **错误处理**: 使用统一的错误处理中间件
4. **响应格式**: 使用统一的响应格式工具
5. **认证授权**: 敏感接口使用认证和权限中间件

## 后续开发

当前目录结构已搭建完成,包含所有模块的骨架代码。后续开发时:

1. 实现各模块的具体业务逻辑
2. 完善 Prisma 数据模型
3. 实现 JWT 认证逻辑
4. 添加数据验证规则
5. 实现文件上传功能
6. 实现 SSR 渲染逻辑
