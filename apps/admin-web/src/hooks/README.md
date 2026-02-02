# Hooks 目录

此目录存放 Admin-Web 应用的自定义 React Hooks。

## 用途

- 封装可复用的业务逻辑
- 管理组件状态和副作用
- 简化组件代码,提高可维护性

## 规划的 Hooks

- `useApproval.ts` - 审批相关逻辑 (获取审批列表、审批/驳回操作等)
- `useForm.ts` - 动态表单逻辑 (表单配置、验证、提交等)
- `usePagination.ts` - 分页逻辑 (页码管理、数据加载等)
- `useAuth.ts` - 认证逻辑 (登录状态、权限检查等)

## 命名规范

- 使用 `use` 前缀
- 使用驼峰命名法
- 文件名与 Hook 名称保持一致
