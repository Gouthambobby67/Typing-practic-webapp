# 🎯 TypePractice - Features Overview

## 📋 What You Got

A **complete typing practice website** like keybr.com with:

### ✨ Core Features

1. **Letter Selection System** (Like keybr!)
   - Click any letter to add/remove from practice
   - Start with home row: `a s d f g h j k l`
   - Quick buttons:
     - **RESET** → Back to `a s d f`
     - **HOME ROW** → All home row keys
     - **SELECT ALL** → All 26 letters

2. **Smart Text Generation**
   - Automatically creates random words using only your selected letters
   - Generates 50 words at a time
   - Auto-extends when you reach the end (infinite practice!)
   - No pre-written sentences - pure randomized practice

3. **Real-Time Stats**
   - **WPM** (Words Per Minute) - Blue card
   - **Accuracy %** - Green card  
   - **Error Count** - Red card
   - Updates as you type!

4. **Visual Feedback**
   - ✅ Green = Correct characters
   - ❌ Red = Wrong characters (with red background)
   - 🔵 Blue cursor = Current character to type
   - 🟠 Orange keys = Currently pressed on keyboard

5. **Virtual Keyboard**
   - Shows which keys are available (gray)
   - Highlights active key press (orange)
   - Keyboard layout matches QWERTY
   - Spacebar included!

6. **Reset Button**
   - Big red RESET button
   - Clears everything and generates new text
   - Resets all stats to zero

---

## 🎨 Neobrutalism Design

### Style Elements

✅ **Thick Black Borders** (3px) on everything
✅ **Hard Shadows** (4-6px, no blur, solid black)
✅ **Solid Classic Colors** (no gradients or pastels)
✅ **Chunky Buttons** with press animations
✅ **Sharp Corners** (minimal rounding)
✅ **Bold Typography** (font-black = 900 weight)
✅ **High Contrast** for readability

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| 🔵 Blue | #3498db | Selected letters, WPM |
| 🟢 Green | #2ecc71 | Correct text, Accuracy |
| 🔴 Red | #e74c3c | Errors, Reset button |
| 🟠 Orange | #f39c12 | Active keys, Home Row |
| 🟣 Purple | #9b59b6 | Select All button |
| ⚪ Gray | #95a5a6 | Reset preset button |
| ⬛ Black | #000000 | All borders & shadows |
| ⬜ White | #ffffff | Card backgrounds |

---

## 🎮 How to Use

### For Beginners

1. **Start with Home Row**
   - Click "HOME ROW" button
   - Practice keys: `a s d f g h j k l`
   - Reach 95%+ accuracy

2. **Add More Letters**
   - Click 2-3 new letters to add
   - Practice until comfortable
   - Gradually expand your letter set

3. **Monitor Progress**
   - Watch your WPM increase
   - Keep accuracy above 90%
   - Speed comes with time!

### For Advanced Users

1. Click "SELECT ALL" for full keyboard practice
2. Focus on maintaining high accuracy at speed
3. Reset and try again to beat your best

---

## 🎯 Interactive Elements

### Hover Effects
- **Letter buttons** - Lift up slightly
- **All buttons** - Shadow grows
- **Cards** - Static (neobrutalism style)

### Click Effects
- **Buttons** - Press down (shadow shrinks)
- **Letter toggle** - Select/deselect
- **Text area** - Focus for typing

---

## ⌨️ Keyboard Shortcuts

- **Just type!** - The input is always focused
- Click anywhere on text to refocus
- **Space** - Types space (duh! 😄)

---

## 📊 Stats Explanation

### WPM (Words Per Minute)
- Standard = 5 characters = 1 word
- Calculated in real-time
- Updates every keystroke

### Accuracy
- Correct characters ÷ Total characters
- Shown as percentage
- Aim for 95%+ always!

### Errors
- Count of incorrect keystrokes
- Red characters on screen
- Lower is better!

---

## 🎨 Design Philosophy

### Why Neobrutalism?

1. **Functional** - Form follows function
2. **Honest** - No fake depth or skeuomorphism  
3. **Accessible** - High contrast, clear hierarchy
4. **Fast** - No heavy effects or animations
5. **Memorable** - Bold and distinctive
6. **Classic** - Timeless aesthetic

### Inspiration

- 🖥️ **1980s computers** - Solid colors, sharp edges
- 📱 **Brutalist architecture** - Raw, honest materials
- 🎨 **Swiss design** - Grid systems, typography
- ⌨️ **keybr.com** - Letter selection method
- 🎯 **Y2K aesthetics** - Bold, unapologetic design

---

## 🚀 Run Your App

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm preview
```

Then open: **http://localhost:5173**

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main app logic
├── main.jsx            # React entry point
├── index.css           # Global styles
└── components/
    ├── LetterSelector.jsx   # Letter selection UI
    ├── TypingArea.jsx       # Text display & input
    ├── Stats.jsx            # WPM/Accuracy/Errors
    └── Keyboard.jsx         # Virtual keyboard
```

---

## 🎯 Perfect For

- ✅ Learning touch typing
- ✅ Improving typing speed
- ✅ Practicing specific letters
- ✅ Building muscle memory
- ✅ Progressive learning
- ✅ Home row mastery

---

## 💡 Tips for Best Results

1. **Start Small** - Don't select all letters at once
2. **Accuracy First** - Speed will come naturally
3. **Proper Technique** - Use correct finger positions
4. **Regular Practice** - 10-15 minutes daily
5. **Progressive** - Add letters gradually
6. **Stay Relaxed** - Tension slows you down

---

**Happy Typing! 🎯⌨️✨**

