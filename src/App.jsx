import React from 'react';
import styles from './App.module.css';

import { Header } from './components/Header';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';

import './global.css'

export function App() {
 return(
  <div>

    <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          <Post
            author="Yuri Barros"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, asperiores minima! Animi enim error labore perspiciatis impedit accusantium, reiciendis cupiditate temporibus recusandae ducimus at, quas voluptates. Repudiandae placeat quibusdam quos!"
          />
          <Post
            author="Luan Barros"
            content="um novo post"
          />


        </main>
      </div>

  </div>
 )
}

