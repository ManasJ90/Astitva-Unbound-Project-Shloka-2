/**
 * Astitva Unbound - Project Shloka
 * Core Application Logic, Web Audio Synthesizer, Speech Recognition, & UI Controller
 */

class AstitvaApp {
  constructor() {
    this.engine = new VedanticSentimentEngine(SHLOKA_DATABASE);
    this.currentAnalysis = null;
    this.audioContext = null;
    this.droneGainNode = null;
    this.isDronePlaying = false;
    this.isSpeechPlaying = false;
    this.speechUtterance = null;
    this.recognition = null;
    this.isRecording = false;
    this.breathInterval = null;

    this.initElements();
    this.initEventListeners();
    this.initSpeechRecognition();
    this.loadTheme();
    this.updateClock();
    setInterval(() => this.updateClock(), 60000);

    // Initial default analysis render
    this.runAnalysis("I feel totally overwhelmed and anxious about my upcoming exams.");
  }

  initElements() {
    // Header controls
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.ambientSoundBtn = document.getElementById("ambientSoundBtn");
    this.breathworkBtn = document.getElementById("breathworkBtn");
    this.historyBtn = document.getElementById("historyBtn");
    this.liveClock = document.getElementById("liveClock");

    // Journal Input
    this.journalInput = document.getElementById("journalInput");
    this.charCounter = document.getElementById("charCounter");
    this.voiceInputBtn = document.getElementById("voiceInputBtn");
    this.clearInputBtn = document.getElementById("clearInputBtn");
    this.reflectBtn = document.getElementById("reflectBtn");
    this.samplePills = document.querySelectorAll(".sample-pill");

    // Loading & Display States
    this.loadingOverlay = document.getElementById("loadingOverlay");
    this.resultsContainer = document.getElementById("resultsContainer");

    // Sentiment Gauge Elements
    this.sentimentStatusPill = document.getElementById("sentimentStatusPill");
    this.spectrumNeedle = document.getElementById("spectrumNeedle");
    this.valenceScoreVal = document.getElementById("valenceScoreVal");
    this.volatilityScoreVal = document.getElementById("volatilityScoreVal");
    this.gunaVal = document.getElementById("gunaVal");
    this.keywordChipsContainer = document.getElementById("keywordChipsContainer");

    // Shloka Card Elements
    this.shlokaSourceBadge = document.getElementById("shlokaSourceBadge");
    this.shlokaTagPill = document.getElementById("shlokaTagPill");
    this.sanskritText = document.getElementById("sanskritText");
    this.transliterationText = document.getElementById("transliterationText");
    this.audioPlayBtn = document.getElementById("audioPlayBtn");
    this.soundwaveVisualizer = document.getElementById("soundwaveVisualizer");
    this.shlokaMeaningText = document.getElementById("shlokaMeaningText");
    this.counterBalanceText = document.getElementById("counterBalanceText");
    this.copyShlokaBtn = document.getElementById("copyShlokaBtn");
    this.saveJournalBtn = document.getElementById("saveJournalBtn");
    this.shareCardBtn = document.getElementById("shareCardBtn");

    // Accordion
    this.philosophyAccordionHeader = document.getElementById("philosophyAccordionHeader");
    this.philosophyAccordionBody = document.getElementById("philosophyAccordionBody");

    // Modals
    this.breathModal = document.getElementById("breathModal");
    this.closeBreathModal = document.getElementById("closeBreathModal");
    this.breathCircle = document.getElementById("breathCircle");
    this.breathInstruction = document.getElementById("breathInstruction");
    this.breathTimer = document.getElementById("breathTimer");
    this.startBreathBtn = document.getElementById("startBreathBtn");

    this.historyModal = document.getElementById("historyModal");
    this.closeHistoryModal = document.getElementById("closeHistoryModal");
    this.historyListContainer = document.getElementById("historyListContainer");
    this.clearHistoryBtn = document.getElementById("clearHistoryBtn");

    this.toastContainer = document.getElementById("toastContainer");
  }

  initEventListeners() {
    // Theme toggle
    this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());

    // Ambient sound toggle
    this.ambientSoundBtn.addEventListener("click", () => this.toggleAmbientSound());

    // Character counter
    this.journalInput.addEventListener("input", () => {
      const len = this.journalInput.value.length;
      const words = this.journalInput.value.trim().split(/\s+/).filter(w => w).length;
      this.charCounter.textContent = `${words} words · ${len} chars`;
    });

    // Voice input
    this.voiceInputBtn.addEventListener("click", () => this.toggleVoiceInput());

    // Clear text
    this.clearInputBtn.addEventListener("click", () => {
      this.journalInput.value = "";
      this.charCounter.textContent = "0 words · 0 chars";
      this.showToast("Journal entry cleared", "info");
    });

    // Reflect primary button
    this.reflectBtn.addEventListener("click", () => {
      const text = this.journalInput.value.trim();
      if (!text) {
        this.showToast("Please write a few thoughts or choose a sample prompt first.", "warning");
        return;
      }
      this.runAnalysis(text);
    });

    // Sample pills
    this.samplePills.forEach(pill => {
      pill.addEventListener("click", () => {
        const sampleText = pill.getAttribute("data-sample");
        if (sampleText) {
          this.journalInput.value = sampleText;
          const len = sampleText.length;
          const words = sampleText.trim().split(/\s+/).filter(w => w).length;
          this.charCounter.textContent = `${words} words · ${len} chars`;
          this.runAnalysis(sampleText);
        }
      });
    });

    // Audio Play button for Shloka
    this.audioPlayBtn.addEventListener("click", () => this.toggleShlokaAudio());

    // Copy Shloka button
    this.copyShlokaBtn.addEventListener("click", () => this.copyShlokaToClipboard());

    // Save Journal button
    this.saveJournalBtn.addEventListener("click", () => this.saveCurrentReflection());

    // Share / Export Card button
    this.shareCardBtn.addEventListener("click", () => this.exportReflectionCard());

    // Philosophy Accordion
    this.philosophyAccordionHeader.addEventListener("click", () => {
      const isExpanded = this.philosophyAccordionHeader.classList.toggle("expanded");
      this.philosophyAccordionBody.classList.toggle("open", isExpanded);
    });

    // Modals
    this.breathworkBtn.addEventListener("click", () => this.openBreathworkModal());
    this.closeBreathModal.addEventListener("click", () => this.closeBreathworkModal());
    this.startBreathBtn.addEventListener("click", () => this.toggleBreathworkCycle());

    this.historyBtn.addEventListener("click", () => this.openHistoryModal());
    this.closeHistoryModal.addEventListener("click", () => this.closeHistoryModalFn());
    this.clearHistoryBtn.addEventListener("click", () => this.clearHistory());

    // Close modals on background click
    window.addEventListener("click", (e) => {
      if (e.target === this.breathModal) this.closeBreathworkModal();
      if (e.target === this.historyModal) this.closeHistoryModalFn();
    });
  }

  /* --- SENTIMENT & ANALYSIS PIPELINE --- */
  runAnalysis(text) {
    // Show spinner & smooth transition
    this.loadingOverlay.classList.add("active");
    this.resultsContainer.style.opacity = "0.2";
    this.playSingingBowlChime(440, 0.4);

    // Dynamic contemplative loading delay for serene mindful feel
    setTimeout(() => {
      const result = this.engine.analyze(text);
      this.currentAnalysis = result;
      this.renderAnalysis(result);

      this.loadingOverlay.classList.remove("active");
      this.resultsContainer.style.opacity = "1";
      this.playSingingBowlChime(528, 0.5); // 528 Hz transformation tone chime
    }, 650);
  }

  renderAnalysis(result) {
    // 1. Update Gauge & Metrics
    this.sentimentStatusPill.className = `sentiment-status-pill ${result.badgeColor}`;
    this.sentimentStatusPill.innerHTML = `
      <span class="live-dot" style="background-color: currentColor;"></span>
      ${result.sentimentLabel}
    `;

    // Calculate needle left percentage: map [-100, 100] to [5%, 95%]
    const percent = Math.min(95, Math.max(5, 50 + (result.valenceScore * 0.45)));
    this.spectrumNeedle.style.left = `${percent}%`;

    this.valenceScoreVal.textContent = (result.valenceScore > 0 ? `+` : ``) + `${result.valenceScore}`;
    this.volatilityScoreVal.textContent = `${result.volatilityScore}%`;
    this.gunaVal.textContent = result.guna.split(" ")[0];

    // Extracted keyword chips
    this.keywordChipsContainer.innerHTML = "";
    if (result.extractedKeywords && result.extractedKeywords.length > 0) {
      result.extractedKeywords.forEach(kw => {
        const chip = document.createElement("span");
        chip.className = `keyword-chip ${kw.polarity}`;
        chip.innerHTML = `${kw.word} <span style="font-size: 0.65rem; opacity: 0.8;">(${kw.weight > 0 ? '+' : ''}${kw.weight})</span>`;
        this.keywordChipsContainer.appendChild(chip);
      });
    } else {
      this.keywordChipsContainer.innerHTML = `<span style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">No extreme emotional polarities detected. Mind is centered.</span>`;
    }

    // 2. Update Shloka Card
    const s = result.shloka;
    this.shlokaSourceBadge.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
      ${s.source}
    `;
    this.shlokaTagPill.textContent = s.emotionTag || result.primaryCategory.toUpperCase();
    this.sanskritText.textContent = s.sanskrit;
    this.transliterationText.textContent = s.transliteration;
    this.shlokaMeaningText.textContent = s.meaning;
    this.counterBalanceText.textContent = s.counterBalanceAdvice;

    // Reset audio player button state
    this.stopShlokaAudio();
  }

  /* --- AUDIO PRONUNCIATION & CHANT SYNTHESIZER --- */
  toggleShlokaAudio() {
    if (this.isSpeechPlaying) {
      this.stopShlokaAudio();
    } else {
      this.playShlokaAudio();
    }
  }

  playShlokaAudio() {
    if (!this.currentAnalysis || !this.currentAnalysis.shloka) return;
    const shloka = this.currentAnalysis.shloka;

    // Check if SpeechSynthesis is supported
    if (!('speechSynthesis' in window)) {
      this.showToast("Speech synthesis not supported on this browser.", "warning");
      return;
    }

    window.speechSynthesis.cancel();

    // Prefer Hindi / Sanskrit voice if available, otherwise gentle melodious cadence
    const textToChant = shloka.audioPronunciationText || shloka.sanskrit;
    this.speechUtterance = new SpeechSynthesisUtterance(textToChant);

    const voices = window.speechSynthesis.getVoices();
    const sanskritOrHindiVoice = voices.find(v => v.lang.includes("hi") || v.lang.includes("sa") || v.name.toLowerCase().includes("india"));
    if (sanskritOrHindiVoice) {
      this.speechUtterance.voice = sanskritOrHindiVoice;
    }

    this.speechUtterance.rate = 0.85; // Meditative, calm pacing
    this.speechUtterance.pitch = 0.95; // Grounded warm tone

    // Play temple bell chime on start
    this.playSingingBowlChime(396, 0.6);

    this.speechUtterance.onstart = () => {
      this.isSpeechPlaying = true;
      this.soundwaveVisualizer.classList.add("playing");
      this.audioPlayBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;
    };

    this.speechUtterance.onend = () => {
      this.stopShlokaAudio();
      this.playSingingBowlChime(528, 0.5);
    };

    this.speechUtterance.onerror = () => {
      this.stopShlokaAudio();
    };

    window.speechSynthesis.speak(this.speechUtterance);
  }

  stopShlokaAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeechPlaying = false;
    this.soundwaveVisualizer.classList.remove("playing");
    this.audioPlayBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    `;
  }

  /* --- WEB AUDIO AMBIENT DRONE SYNTHESIZER (432Hz Om & Tanpura) --- */
  initAudioContext() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  toggleAmbientSound() {
    this.initAudioContext();
    if (this.isDronePlaying) {
      this.stopAmbientDrone();
      this.ambientSoundBtn.classList.remove("active");
      this.ambientSoundBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
        <span>Tanpura Drone: Off</span>
      `;
      this.showToast("Ambient sound paused", "info");
    } else {
      this.startAmbientDrone();
      this.ambientSoundBtn.classList.add("active");
      this.ambientSoundBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"></path>
        </svg>
        <span>Tanpura Drone: 432Hz</span>
      `;
      this.showToast("432Hz Sacred Tanpura Drone playing", "success");
    }
  }

  startAmbientDrone() {
    if (this.isDronePlaying) return;
    this.isDronePlaying = true;

    // Harmonic frequencies for rich spiritual Tanpura drone (Root 108Hz / 216Hz / 432Hz)
    const baseFreq = 108; // Sacred octave root
    const harmonics = [1, 1.5, 2, 3, 4]; // Pa (Fifth), Sa (Octaves)

    this.droneGainNode = this.audioContext.createGain();
    this.droneGainNode.gain.setValueAtTime(0.001, this.audioContext.currentTime);
    this.droneGainNode.gain.exponentialRampToValueAtTime(0.06, this.audioContext.currentTime + 3);
    this.droneGainNode.connect(this.audioContext.destination);

    this.droneOscillators = [];

    harmonics.forEach((mult, idx) => {
      const osc = this.audioContext.createOscillator();
      const pan = this.audioContext.createStereoPanner ? this.audioContext.createStereoPanner() : null;
      const oscGain = this.audioContext.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(baseFreq * mult, this.audioContext.currentTime);

      // Subtle detune for shimmer & warmth
      osc.detune.setValueAtTime((idx - 2) * 4, this.audioContext.currentTime);

      oscGain.gain.value = 1 / (idx + 1.8);

      if (pan) {
        pan.pan.value = (idx % 2 === 0 ? -0.3 : 0.3);
        osc.connect(oscGain);
        oscGain.connect(pan);
        pan.connect(this.droneGainNode);
      } else {
        osc.connect(oscGain);
        oscGain.connect(this.droneGainNode);
      }

      osc.start();
      this.droneOscillators.push(osc);
    });
  }

  stopAmbientDrone() {
    if (!this.isDronePlaying) return;
    this.isDronePlaying = false;
    if (this.droneGainNode && this.audioContext) {
      this.droneGainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 1.5);
      setTimeout(() => {
        if (this.droneOscillators) {
          this.droneOscillators.forEach(osc => {
            try { osc.stop(); } catch (e) {}
          });
          this.droneOscillators = [];
        }
      }, 1600);
    }
  }

  playSingingBowlChime(freq = 440, duration = 1.2) {
    try {
      this.initAudioContext();
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      gain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      // AudioContext may be muted/restricted until user gesture
    }
  }

  /* --- VOICE INPUT / SPEECH RECOGNITION --- */
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = "en-US";

      this.recognition.onstart = () => {
        this.isRecording = true;
        this.voiceInputBtn.classList.add("listening");
        this.showToast("Listening... speak from the heart", "info");
      };

      this.recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        this.journalInput.value = transcript;
        this.charCounter.textContent = `${transcript.split(/\s+/).filter(w => w).length} words · ${transcript.length} chars`;
      };

      this.recognition.onerror = (err) => {
        console.warn("Speech recognition error:", err);
        this.stopVoiceInput();
        this.showToast("Microphone error or permission denied.", "warning");
      };

      this.recognition.onend = () => {
        this.stopVoiceInput();
        if (this.journalInput.value.trim().length > 3) {
          this.showToast("Voice transcribed! Click 'Analyze & Reflect' to review.", "success");
        }
      };
    }
  }

  toggleVoiceInput() {
    if (this.isRecording) {
      this.stopVoiceInput();
    } else {
      this.startVoiceInput();
    }
  }

  startVoiceInput() {
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        this.simulateVoiceDictation();
      }
    } else {
      // Browser doesn't support Web Speech API natively -> provide simulated voice dictation demo
      this.simulateVoiceDictation();
    }
  }

  stopVoiceInput() {
    this.isRecording = false;
    this.voiceInputBtn.classList.remove("listening");
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
  }

  simulateVoiceDictation() {
    this.isRecording = true;
    this.voiceInputBtn.classList.add("listening");
    this.showToast("Simulating voice dictation (Speech API unavailable)...", "info");

    const sampleDictations = [
      "I feel restless and scattered today, like I am being pulled in ten directions at once.",
      "Everything is going so well and I feel a great wave of pride, but I want to remain balanced.",
      "Deep anxiety is bubbling up about my future and whether I am good enough."
    ];
    const picked = sampleDictations[Math.floor(Math.random() * sampleDictations.length)];

    let currentIdx = 0;
    this.journalInput.value = "";

    const streamInterval = setInterval(() => {
      if (currentIdx < picked.length) {
        this.journalInput.value += picked[currentIdx];
        currentIdx++;
        this.charCounter.textContent = `${this.journalInput.value.split(/\s+/).filter(w => w).length} words · ${this.journalInput.value.length} chars`;
      } else {
        clearInterval(streamInterval);
        this.stopVoiceInput();
        this.showToast("Voice dictation simulated successfully!", "success");
      }
    }, 40);
  }

  /* --- PRANAYAMA BREATHWORK MODAL --- */
  openBreathworkModal() {
    this.breathModal.classList.add("active");
  }

  closeBreathworkModal() {
    this.breathModal.classList.remove("active");
    if (this.breathInterval) {
      clearInterval(this.breathInterval);
      this.breathInterval = null;
    }
    this.startBreathBtn.textContent = "Begin 4-7-8 Breathing Cycle";
    this.breathCircle.className = "breath-circle";
    this.breathInstruction.textContent = "Center Yourself";
    this.breathTimer.textContent = "Ready";
  }

  toggleBreathworkCycle() {
    if (this.breathInterval) {
      clearInterval(this.breathInterval);
      this.breathInterval = null;
      this.startBreathBtn.textContent = "Begin 4-7-8 Breathing Cycle";
      this.breathCircle.className = "breath-circle";
      this.breathInstruction.textContent = "Paused";
      this.breathTimer.textContent = "";
      return;
    }

    this.startBreathBtn.textContent = "Pause Breath Cycle";
    let phase = "inhale"; // inhale (4s) -> hold (7s) -> exhale (8s)
    let countdown = 4;

    const setPhase = () => {
      if (phase === "inhale") {
        this.breathCircle.className = "breath-circle inhale";
        this.breathInstruction.textContent = "Inhale (Pūraka)";
        this.playSingingBowlChime(396, 0.4);
      } else if (phase === "hold") {
        this.breathCircle.className = "breath-circle hold";
        this.breathInstruction.textContent = "Hold (Kumbhaka)";
      } else if (phase === "exhale") {
        this.breathCircle.className = "breath-circle exhale";
        this.breathInstruction.textContent = "Exhale (Recaka)";
        this.playSingingBowlChime(528, 0.5);
      }
      this.breathTimer.textContent = `${countdown}s`;
    };

    setPhase();

    this.breathInterval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        if (phase === "inhale") {
          phase = "hold";
          countdown = 7;
        } else if (phase === "hold") {
          phase = "exhale";
          countdown = 8;
        } else if (phase === "exhale") {
          phase = "inhale";
          countdown = 4;
        }
      }
      setPhase();
    }, 1000);
  }

  /* --- JOURNAL REFLECTIONS HISTORY (LOCALSTORAGE) --- */
  saveCurrentReflection() {
    if (!this.currentAnalysis) return;
    const history = this.getHistory();
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      text: this.journalInput.value.trim() || this.currentAnalysis.text,
      sentimentLabel: this.currentAnalysis.sentimentLabel,
      shlokaSource: this.currentAnalysis.shloka.source,
      shlokaSanskrit: this.currentAnalysis.shloka.sanskrit,
      advice: this.currentAnalysis.shloka.counterBalanceAdvice
    };

    history.unshift(entry);
    // Keep last 30 entries
    if (history.length > 30) history.pop();
    localStorage.setItem("astitva_journal_history", JSON.stringify(history));
    this.showToast("Reflection saved to your Sacred Journal History", "success");
  }

  getHistory() {
    try {
      const data = localStorage.getItem("astitva_journal_history");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  openHistoryModal() {
    const history = this.getHistory();
    this.historyListContainer.innerHTML = "";

    if (history.length === 0) {
      this.historyListContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
          <p>No reflections saved yet.</p>
          <p style="font-size: 0.8rem; margin-top: 0.3rem;">Journal your thoughts and click "Save to Reflections" to track your spiritual journey.</p>
        </div>
      `;
    } else {
      history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
          <div class="history-header">
            <span>${item.date}</span>
            <span style="font-weight: 600; color: var(--brand-saffron);">${item.sentimentLabel}</span>
          </div>
          <div class="history-snippet">${item.text}</div>
          <div class="history-shloka-tag">${item.shlokaSource}</div>
        `;
        div.addEventListener("click", () => {
          this.journalInput.value = item.text;
          this.charCounter.textContent = `${item.text.split(/\s+/).filter(w => w).length} words · ${item.text.length} chars`;
          this.runAnalysis(item.text);
          this.closeHistoryModalFn();
          this.showToast(`Loaded reflection from ${item.date}`, "info");
        });
        this.historyListContainer.appendChild(div);
      });
    }

    this.historyModal.classList.add("active");
  }

  closeHistoryModalFn() {
    this.historyModal.classList.remove("active");
  }

  clearHistory() {
    if (confirm("Are you sure you want to clear your saved reflections?")) {
      localStorage.removeItem("astitva_journal_history");
      this.openHistoryModal();
      this.showToast("Journal history cleared", "info");
    }
  }

  /* --- UTILITIES --- */
  copyShlokaToClipboard() {
    if (!this.currentAnalysis || !this.currentAnalysis.shloka) return;
    const s = this.currentAnalysis.shloka;
    const textToCopy = `✨ ASTITVA UNBOUND - ${s.source}\n\n${s.sanskrit}\n\n[Transliteration]:\n${s.transliteration}\n\n[Meaning]:\n${s.meaning}\n\n[Counter-Balancing Guidance]:\n${s.counterBalanceAdvice}\n\n- Project Shloka (Tattva 5)`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.showToast("Sanskrit Shloka & Wisdom copied to clipboard!", "success");
    }).catch(() => {
      this.showToast("Failed to copy to clipboard", "warning");
    });
  }

  exportReflectionCard() {
    if (!this.currentAnalysis) return;
    const s = this.currentAnalysis.shloka;
    const dateStr = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const fullCard = `════════════════════════════════════════════════
✦ ASTITVA UNBOUND · SPIRITUAL EMOTIONAL MIRROR ✦
Date: ${dateStr}
Emotional State: ${this.currentAnalysis.sentimentLabel}
Guna: ${this.currentAnalysis.guna}
────────────────────────────────────────────────
JOURNAL ENTRY:
"${this.journalInput.value.trim() || this.currentAnalysis.text}"
────────────────────────────────────────────────
VEDIC WISDOM (${s.source}):
${s.sanskrit}

TRANSLITERATION:
${s.transliteration}

MEANING:
${s.meaning}

COUNTER-BALANCING GUIDANCE:
${s.counterBalanceAdvice}
────────────────────────────────────────────────
"Consciousness is beyond the body and mind. 
Your emotions are transient mental states—you are the calm observer." (Tattva 5)
════════════════════════════════════════════════`;

    const blob = new Blob([fullCard], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Astitva-Unbound-Reflection-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast("Spiritual reflection card exported!", "success");
  }

  toggleTheme() {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    if (nextTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
    localStorage.setItem("astitva_theme", nextTheme);
    this.updateThemeButton(nextTheme);
    this.showToast(`Switched to ${nextTheme} theme`, "info");
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("astitva_theme") || "light";
    if (savedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
    this.updateThemeButton(savedTheme);
  }

  updateThemeButton(theme) {
    if (theme === "dark") {
      this.themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      this.themeToggleBtn.setAttribute("title", "Switch to Light Mode");
    } else {
      this.themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      this.themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
    }
  }

  updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    if (this.liveClock) {
      this.liveClock.textContent = `${dateStr} · ${timeStr}`;
    }
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = "toast";

    let iconColor = "var(--brand-saffron)";
    if (type === "success") iconColor = "#10B981";
    if (type === "warning") iconColor = "#F59E0B";

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Instantiate on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.astitvaApp = new AstitvaApp();
});
