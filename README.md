# TypePractice - Modern Typing Practice Web App

<div align="center">

![TypePractice](https://img.shields.io/badge/TypePractice-v2.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modern, lightweight typing practice application with neobrutalism design**

[Live Demo](#) • [Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Design Philosophy](#-design-philosophy)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**TypePractice** is a comprehensive typing practice web application inspired by [keybr.com](https://www.keybr.com), featuring a unique **neobrutalism design** with solid classic colors. The app offers two distinct modes for learning and testing your typing skills:

- **Practice Mode**: Learn touch typing by practicing specific letters
- **Test Mode**: Assess your skills with full paragraph typing tests

### Why TypePractice?

- ✅ **Progressive Learning**: Start with a few letters and gradually expand
- ✅ **Real-time Feedback**: See your mistakes instantly with color-coded characters
- ✅ **Comprehensive Stats**: Track WPM, accuracy, and errors in real-time
- ✅ **Clean Design**: Neobrutalism aesthetic with no distractions
- ✅ **Lightweight**: Fast loading, no heavy animation libraries
- ✅ **Responsive**: Works perfectly on all screen sizes
- ✅ **Free & Open Source**: No ads, no tracking, completely free

---

## ✨ Features

### 🎓 Practice Mode (Letter Selection)

Practice touch typing with a progressive learning approach:

- **Letter Selection System**
  - Click any letter to add/remove from practice
  - Visual feedback: Blue = selected, Gray = not selected
  - Start with home row keys: `a s d f g h j k l`
  
- **Quick Presets**
  - **RESET**: Back to `a s d f` (starter set)
  - **HOME**: Select all home row keys
  - **ALL**: Select all 26 letters
  - **🔄**: Reset practice with new text

- **Smart Text Generation**
  - Automatically generates random words using only your selected letters
  - Creates realistic typing patterns
  - Infinite text - automatically extends as you type
  - No pre-written sentences - pure randomized practice

- **Visual Feedback**
  - 🟢 Green = Correct characters
  - 🔴 Red = Incorrect characters (with red background)
  - 🔵 Blue cursor = Current character to type
  - 🟠 Orange = Active key on keyboard

### 🎯 Test Mode (Full Typing Tests)

Complete typing tests with realistic paragraphs:

- **5 Different Test Texts**
  - Classic pangrams
  - Technology topics
  - Programming concepts
  - Motivational content
  - Skills development

- **Test Controls**
  - **NEW TEST**: Get a random new paragraph
  - **RESET**: Retry the same text
  - Auto-completion detection

- **Results Display**
  - Final WPM score
  - Accuracy percentage
  - Total errors count
  - Time taken (in seconds)
  - Completion celebration message

### 📊 Real-time Statistics

Both modes include comprehensive stats tracking:

- **WPM (Words Per Minute)**: Standard typing speed metric (1 word = 5 characters)
- **Accuracy**: Percentage of correctly typed characters
- **Error Count**: Total number of mistakes
- **Time Tracking**: Real-time timer in test mode

### ⌨️ Virtual Keyboard

Interactive keyboard visualization:

- Shows all available keys in QWERTY layout
- Highlights pressed keys in real-time (orange)
- Grays out unavailable keys in practice mode
- Includes spacebar with proper sizing
- Responsive key press animations

### 🎨 Neobrutalism Design

Distinctive visual style:

- **Thick Black Borders**: 3px borders on all elements
- **Hard Shadows**: Solid black shadows (no blur or gradients)
- **Solid Classic Colors**: Blue, Green, Red, Orange, Purple
- **Bold Typography**: Font-black (900 weight) throughout
- **Press Animations**: Physical button press feel
- **High Contrast**: Excellent readability
- **Clean Layout**: Everything visible in single view

---

## 📸 Screenshots

### Practice Mode
```
┌─────────────────────────────────────────────────────────────┐
│ TypePractice  [📚 PRACTICE] [🎯 TEST]                       │
│                                  [WPM:45] [ACC:96%] [ERR:3] │
├───────────────────────────────┬─────────────────────────────┤
│ SELECT LETTERS                │ TYPE HERE                   │
│ [RESET][HOME][ALL][🔄]        │ ┌─────────────────────────┐ │
│                               │ │ asdf fdsa sadf dfas...  │ │
│ [q][w][e][r][t][y][u][i]...  │ │ (green/red colored)     │ │
│  [a][s][d][f][g][h][j][k]... │ │                         │ │
│   [z][x][c][v][b][n][m]      │ │ (infinite scroll)       │ │
│                               │ │                         │ │
│ 4 selected: a d f s           │ └─────────────────────────┘ │
│                               │ Click to focus • Start     │
├───────────────────────────────┤                             │
│ KEYBOARD                      │                             │
│ [q][w][e][r][t][y][u][i]...  │                             │
│  [a][s][d][f][g][h][j][k]... │                             │
│   [z][x][c][v][b][n][m]      │                             │
│   [        SPACE        ]    │                             │
└───────────────────────────────┴─────────────────────────────┘
```

### Test Mode
```
┌─────────────────────────────────────────────────────────────┐
│ TypePractice  [📚 PRACTICE] [🎯 TEST]                       │
│ [WPM:52] [ACC:98%] [ERR:2]    [🔄 RESET][📝 NEW TEST]     │
├───────────────────────────────┬─────────────────────────────┤
│ TYPING TEST                   │ KEYBOARD                    │
│ ┌─────────────────────────┐   │ [q][w][e][r][t][y]...      │
│ │ The quick brown fox...  │   │  [a][s][d][f][g]...        │
│ │ (full paragraph with    │   │   [z][x][c][v]...          │
│ │  color-coded feedback)  │   │   [     SPACE     ]        │
│ │                         │   │                             │
│ └─────────────────────────┘   │ ⌨️ Type the text to        │
│ 🎉 TEST COMPLETE!             │    complete the test        │
│ Time: 45.2s | WPM: 52 | 98%  │                             │
└───────────────────────────────┴─────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14.0 or higher)
- **npm** (v6.0 or higher) or **yarn** (v1.22 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/typing-practice-app.git
   cd typing-practice-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the app
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview
```

The production-ready files will be in the `dist/` directory.

---

## 📖 Usage

### Practice Mode

**Step 1: Select Letters**
- Click on individual letters in the keyboard grid to select/deselect them
- Use quick presets:
  - **RESET**: Start with `a s d f` (recommended for beginners)
  - **HOME**: Practice all home row keys
  - **ALL**: Practice the entire alphabet

**Step 2: Start Typing**
- Click anywhere in the typing area to focus
- Type the displayed text character by character
- Green = correct, Red = incorrect

**Step 3: Monitor Progress**
- Watch your WPM increase in real-time
- Keep accuracy above 95% for best results
- Track errors to identify problem areas

**Step 4: Add More Letters**
- Once comfortable with current letters (95%+ accuracy)
- Add 2-3 new letters
- Gradually build to full keyboard

### Test Mode

**Step 1: Switch to Test Mode**
- Click the **🎯 TEST** tab in the header

**Step 2: Read the Paragraph**
- A complete paragraph will be displayed
- Various topics: technology, programming, motivation, etc.

**Step 3: Type the Text**
- Click the text area to focus
- Type the entire paragraph
- Real-time feedback with green/red colors

**Step 4: Complete and Review**
- Test automatically ends when finished
- Review your WPM, accuracy, and time
- Click **RESET** to retry or **NEW TEST** for different text

### Tips for Best Results

1. **Start Small**: Begin with 4-6 letters from home row
2. **Accuracy First**: Speed naturally follows accuracy
3. **Proper Technique**: Use correct finger positions
4. **Regular Practice**: 10-15 minutes daily is ideal
5. **Progressive Learning**: Add letters gradually
6. **Stay Relaxed**: Tension slows you down
7. **Focus on Form**: Don't look at the keyboard
8. **Use Virtual Keyboard**: Visual aid for finger placement

---

## 🎨 Design Philosophy

### Neobrutalism

**What is Neobrutalism?**

Neobrutalism is a modern design movement inspired by Brutalist architecture, characterized by:
- Raw, honest materials (solid colors, no gradients)
- Functional, utilitarian approach
- Strong visual hierarchy
- Bold, unapologetic aesthetic
- High contrast for accessibility

**Our Implementation:**

- **Borders**: 3px thick black borders on all elements
- **Shadows**: 4-6px solid black shadows (no blur)
- **Colors**: Solid RGB colors (Blue #3498db, Green #2ecc71, Red #e74c3c, Orange #f39c12, Purple #9b59b6)
- **Typography**: Font-black (900 weight) for strong hierarchy
- **Interactions**: Press animations simulate physical buttons
- **Layout**: Grid-based, clean, efficient use of space

### Color Meanings

| Color | Hex | Usage | Psychology |
|-------|-----|-------|------------|
| 🔵 Blue | `#3498db` | Selected items, WPM, Active tab | Trust, Focus |
| 🟢 Green | `#2ecc71` | Correct characters, Accuracy | Success, Progress |
| 🔴 Red | `#e74c3c` | Errors, Incorrect text | Warning, Attention |
| 🟠 Orange | `#f39c12` | Active keys, Highlights | Action, Energy |
| 🟣 Purple | `#9b59b6` | Accent buttons | Creativity |
| ⬛ Black | `#000000` | All borders and shadows | Structure, Definition |
| ⬜ White | `#ffffff` | Card backgrounds | Clarity, Space |
| 🔳 Gray | `#f5f5f5` | Page background | Neutral, Calm |

### Accessibility

- **High Contrast**: All text meets WCAG AA standards
- **Clear Hierarchy**: Bold typography guides attention
- **Color Independence**: Not reliant on color alone for meaning
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Clear visual feedback

---

## 📁 Project Structure

```
typing-practice-app/
├── public/
│   └── vite.svg                 # Favicon
├── src/
│   ├── components/
│   │   ├── Keyboard.jsx         # Virtual keyboard display
│   │   ├── LetterSelector.jsx   # Letter selection grid
│   │   ├── Stats.jsx            # WPM/Accuracy/Errors cards
│   │   ├── TypingArea.jsx       # Practice mode text display
│   │   └── TypingTest.jsx       # Test mode component
│   ├── App.jsx                  # Main app with tab routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles + Tailwind
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── README.md                    # This file
└── FEATURES.md                  # Detailed feature list
```

### Component Breakdown

**App.jsx** (Main Component)
- Tab state management
- Routes between Practice and Test modes
- Global state for practice mode

**LetterSelector.jsx** (Practice Mode)
- Letter grid with click toggling
- Preset buttons (RESET, HOME, ALL)
- Selected letter counter

**TypingArea.jsx** (Practice Mode)
- Text display with color coding
- Hidden input field
- Auto-focus management

**TypingTest.jsx** (Test Mode)
- Complete test logic
- Test text management
- Completion detection
- Results display

**Keyboard.jsx** (Practice Mode)
- Virtual keyboard layout
- Active key highlighting
- Selected letter indication

**Stats.jsx** (Both Modes)
- WPM card (Blue)
- Accuracy card (Green)
- Errors card (Red)

---

