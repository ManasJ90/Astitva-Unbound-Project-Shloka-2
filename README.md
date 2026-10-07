# Astitva Unbound - Project Shloka
### *Mindfulness & Grounding through Timeless Wisdom*

> **"Consciousness is beyond the body and mind. Your emotions are transient mental states—you are the calm observer."**  
> — *Tattva 5 (Dakshinamurthy Stotram)*

---

## 🌸 Overview

**Astitva Unbound - Project Shloka** is a modern, serene, and responsive Web Application that serves as an AI-powered interactive journal and spiritual emotional mirror. It helps users process daily emotional volatility (stress, euphoria, sadness, anger, doubt) by analyzing their journal entries using Vedantic NLP sentiment analysis and providing contextual Sanskrit Shlokas, English translations, and emotional counter-balancing advice rooted in **Advaita Vedanta** and **Tattva 5 (Dakshinamurthy Stotram)**.

---

## ✨ Key Features & Architecture

### 1. Journaling Input & Voice Recognition
- **Expressive Text Area:** Ample writing space with real-time word and character counters.
- **Voice Dictation:** Web Speech API integration (`SpeechRecognition`) with animated soundwaves and fallback simulation for instant hands-free journaling.
- **Quick Sample Pills:** One-click presets for immediate testing:
  - *Low / Anxious:* "I feel totally overwhelmed and anxious about my upcoming exams."
  - *High / Ego:* "I got the promotion and I feel unstoppable, like no one can touch me!"
  - *Anger / Agitated:* "Someone betrayed my trust and I cannot stop dwelling on anger and revenge."
  - *Balanced / Sattvic:* "Quiet morning, feeling grateful for life's simple blessings."

### 2. Vedantic NLP Sentiment Engine & Emotional Balance Gauge
- **Multidimensional Lexicon Analysis:** Evaluates valence (-100 to +100), emotional intensity/volatility, and Guna alignment (*Tamas*, *Rajas*, *Sattva*).
- **Interactive Balance Gauge:** Dynamic visual slider displaying current emotional posture across the spectrum.
- **Extracted Inner Currents:** Highlights key emotional words detected with polarity weights.

### 3. Wisdom & Contextual Shloka Card
- **Authentic Sanskrit Typography:** Displayed in pristine Devanagari script (`Noto Serif Devanagari`) alongside standard Roman IAST transliteration.
- **Source Attribution:** Verses from the *Bhagavad Gita* (2.20, 2.47, 2.14, 2.56, 3.27, 6.5, 12.13), *Dakshinamurthy Stotram* (Verse 1, Verse 5 / Tattva 5), and *Isha Upanishad*.
- **Adaptive Counter-Balancing Guidance:**
  - *When Low/Anxious:* Uplifting reminders of *Atman* (the immortal, untouched Self).
  - *When High/Ego:* Grounding counsel on *Samatvam* (equanimity) and *Nishkama Karma* (detachment from fruits).
- **Dual Audio Experience:**
  - **Pronunciation Audio Player:** Speech synthesis reciting the Sanskrit verse with temple bell chimes.
  - **432Hz Tanpura Meditation Drone:** Offline Web Audio API harmonic oscillator generating soothing ambient drone.
- **Action Toolbar:** Copy Shloka, save to local reflection history, or export formatted reflection card.

### 4. Philosophy Deep Dive (Tattva 5)
- Collapsible interactive card explaining **Tattva 5**:
  - The illusion of identifying the Self with transient thoughts or physical body.
  - The concept of **Sākṣī Bhāva** (The Witness Consciousness).
  - Visual diagram of the **Pancha Koshas** (The Five Sheaths of Being).

### 5. Pranayama Breathwork (4-7-8 Sama Vritti)
- Built-in breathing circle modal with guided Inhale (*Pūraka*), Hold (*Kumbhaka*), and Exhale (*Recaka*) cycles to calm the nervous system.

### 6. Design & Aesthetics
- **Color Palette:** Deep Indigo, Warm Terracotta, Sacred Saffron accents, Sandalwood Cream background, and subtle gold borders.
- **Theme Support:** Seamless toggle between Light mode (Sandalwood Parchment) and Dark mode (Midnight Cosmos).
- **Zero-Dependency & Standalone:** Runs straight out of the box in any modern browser without requiring `npm install` or backend servers.

---

## 🚀 How to Run the Application

1. Open your browser (Google Chrome, Microsoft Edge, Brave, Firefox, or Safari).
2. Open the file directly:
   ```
   C:\Users\Dell\.gemini\antigravity\scratch\astitva-unbound\index.html
   ```
   *(Or double-click `index.html` in File Explorer).*
3. Enjoy your journey of journaling and inner peace!

---

## 📁 Project Structure

```
astitva-unbound/
├── index.html            # Main responsive single-page application
├── styles.css            # Meditative spiritual styles, themes, and animations
├── app.js                # Core controller, Web Audio synthesizer, and UI events
├── sentiment-engine.js   # Vedantic NLP sentiment & Guna analysis engine
├── shlokas-data.js       # Curated authentic Sanskrit Shlokas database
└── README.md             # Project documentation and guide
```

---

## 🕉️ Recommended Workspace Setup

To set this project directory as your active workspace in Antigravity:
1. Open Antigravity / your editor.
2. Select **Open Folder** and choose:
   ```
   C:\Users\Dell\.gemini\antigravity\scratch\astitva-unbound
   ```
