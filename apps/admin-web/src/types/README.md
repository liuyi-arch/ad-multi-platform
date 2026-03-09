# Types 目录

此目录存放 Admin-Web 应用的 TypeScript 类型定义。

## 用途

- 定义业务数据模型
- 定义 API 请求/响应类型
- 提供类型安全保障

## 规划的类型文件

- `index.ts` - 类型统一导出
- `ad.ts` - 广告相关类型
- `approval.ts` - 审批相关类型 (审批状态、审批记录等)
- `form.ts` - 动态表单类型 (表单配置、字段定义等)
- `user.ts` - 用户相关类型
- `common.ts` - 通用类型 (分页、排序、响应格式等)

## 命名规范

- 接口使用 PascalCase
- 类型别名使用 PascalCase
- 枚举使用 PascalCase
