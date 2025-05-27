import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Analytics } from "@vercel/analytics/react"
import './App.css'

// 定義課程結構
const courseStructure = [
  {
    day: 1,
    title: "高級時裝珠寶的歷史與演變",
    contentPath: "/assets/day1_content.md",
    slidesPath: "/assets/day1_slides.html",
    quizPath: "/assets/day1_quiz.html"
  },
  {
    day: 2,
    title: "材質與工藝",
    contentPath: "/assets/day2_content.md",
    slidesPath: "/assets/day2_slides.html",
    quizPath: "/assets/day2_quiz.html"
  },
  {
    day: 3,
    title: "設計美學與品牌特色",
    contentPath: "/assets/day3_content.md",
    slidesPath: "/assets/day3_slides.html",
    quizPath: "/assets/day3_quiz.html"
  },
  {
    day: 4,
    title: "收藏與鑑賞",
    contentPath: "/assets/day4_content.md",
    slidesPath: "/assets/day4_slides.html",
    quizPath: "/assets/day4_quiz.html"
  },
  {
    day: 5,
    title: "當代趨勢與實踐應用",
    contentPath: "/assets/day5_content.md",
    slidesPath: "/assets/day5_slides.html",
    quizPath: "/assets/day5_quiz.html"
  }
];

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'slides', 'quiz'
  const [markdownContent, setMarkdownContent] = useState('');

  // 獲取當前選中日期的課程
  const currentCourse = courseStructure.find(course => course.day === selectedDay);

  // 動態加載Markdown內容
  useEffect(() => {
    if (currentCourse && activeTab === 'content') {
      fetch(currentCourse.contentPath)
        .then(response => response.text())
        .then(text => setMarkdownContent(text))
        .catch(error => console.error('Error fetching markdown content:', error));
    }
  }, [selectedDay, activeTab, currentCourse]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>《Costume Jewelry for Haute Couture》課程</h1>
        <p className="subtitle">基於Florence Muller著作，Patrick Sigal編輯</p>
      </header>

      <nav className="day-navigation">
        {courseStructure.map(course => (
          <button 
            key={course.day}
            className={`day-button ${selectedDay === course.day ? 'active' : ''}`}
            onClick={() => setSelectedDay(course.day)}
          >
            第{course.day}天
          </button>
        ))}
      </nav>

      <div className="course-title">
        <h2>第{selectedDay}天：{currentCourse?.title}</h2>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          課程內容
        </button>
        <button 
          className={`tab-button ${activeTab === 'slides' ? 'active' : ''}`}
          onClick={() => setActiveTab('slides')}
        >
          投影片
        </button>
        <button 
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          測驗
        </button>
      </div>

      <div className="content-container">
        {activeTab === 'content' && (
          <div className="markdown-content">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        )}
        
        {activeTab === 'slides' && (
          <iframe 
            src={currentCourse?.slidesPath} 
            title={`第${selectedDay}天投影片`}
            className="slides-frame"
          />
        )}
        
        {activeTab === 'quiz' && (
          <iframe 
            src={currentCourse?.quizPath} 
            title={`第${selectedDay}天測驗`}
            className="quiz-frame"
          />
        )}
      </div>

      <footer className="app-footer">
        <p>© 2025 高級時裝珠寶課程 | 所有內容基於《Costume Jewelry for Haute Couture》</p>
      </footer>
    <Analytics />
    </div>
  )
}

export default App
