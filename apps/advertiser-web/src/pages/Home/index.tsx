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
