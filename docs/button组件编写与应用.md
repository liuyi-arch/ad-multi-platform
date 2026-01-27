## button组件代码解读
原生属性：
- extends React.ButtonHTMLAttributes表示继承原生 button 所有属性（onClick、disabled、type、form 等）

组件封装时暴露的属性：
- children：react内置概念
- className：tailwind供用户输入自定义样式
- ...props：放置组件原生属性
- icon?: React.ReactNode和children?: React.ReactNode表示允许传入字符串、SVG、img 等任何可渲染内容
- variant属性可设置下列值：'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'reject'
- size属性可设置下列值：'sm' | 'md' | 'lg'

button组件参数是如何透传的？
- 未显示解构的属性，比如button组件中onClick、type等原生属性收集至...props，再将{...props}展开传递给原生button；对于显示解构的自定义属性，通过统一拼接到className中改变button样式；
- 需要注意的是，组件默认样式、供用户选择的自定义样式、用户传入className中的样式拼接到className过程中，会将组件基础样式放在前面，供用户选择的自定义样式、用户传入className中的样式放在后面；这是因为tailwind类名前面的样式会覆盖后面的样式，组件默认样式放在前面，可以保证用户自定义样式对默认样式的覆盖；
子元素部分：
- {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}表示如果传入了 icon 属性（例如 icon="add"），就渲染一个 ，内容就是 icon 的值；material-symbols-outlined text-xl是tailwind属性值，表示使用 Material Symbols 图标字体、图标大小 1.25rem
- children：按钮中间文字

button组件代码：
```tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'reject';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = 'flex items-center justify-center gap-2 rounded-lg font-bold transition-all active:scale-95 cursor-pointer shadow-sm';

    const variantStyles = {
        primary: 'bg-primary hover:bg-primary/90 text-white',
        secondary: 'bg-[#e7ebf3] dark:bg-gray-800 hover:bg-[#dbe1ee] dark:hover:bg-gray-700 text-[#0d121b] dark:text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        ghost: 'bg-transparent border border-[#e7ebf3] dark:border-gray-700 text-primary hover:bg-primary/5 shadow-none',
        success: 'bg-[#135bec] text-white hover:bg-[#135bec]/90',
        reject: 'bg-[#fff1f2] text-[#e11d48] border border-[#fecdd3] hover:bg-[#ffe4e6]',
    };

    const sizeStyles = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant as keyof typeof variantStyles]} ${sizeStyles[size as keyof typeof sizeStyles]} ${className}`}
            {...props}
        >
            {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
            {children}
        </button>
    );
};
```

## button组件应用示例
```tsx
import React from 'react';
import { Button } from '@repo/ui-components';
import './style.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Button variant初始值为primary，size初始值为md，icon初始值为空，children初始值为按钮，className初始值为空，props初始值为空</h1>
            <p>1. 使用组件供用户选择的variant、size属性</p>
            <Button variant="danger">variant="danger"</Button>
            <Button size="sm">size="sm"</Button>

            <p>2. 使用暴露icon属性，在button子元素中插入icon</p>
            <Button icon="edit">icon="edit"</Button>

            <p>3. 使用children自定义button中间文字，默认是按钮</p>
            <Button>使用children自定义button中间文字</Button>

            <p>4. 用户通过className="w-full"自定义样式</p>
            <Button className="w-full">用户通过className="w-full"自定义样式</Button>
        </div>
    );
};

export default Home;
```

页面效果：
<img width="1421" height="363" alt="截屏2026-01-24 18 55 30" src="https://github.com/user-attachments/assets/d47e6626-ccb2-4723-af2c-afcce7505f3d" />

