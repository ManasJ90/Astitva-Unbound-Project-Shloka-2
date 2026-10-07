/**
 * Astitva Unbound - Project Shloka
 * Vedantic NLP Sentiment & Emotional Mirror Engine
 */

class VedanticSentimentEngine {
  constructor(shlokaDatabase) {
    this.shlokas = shlokaDatabase || [];
    this.initLexicons();
  }

  initLexicons() {
    // Low / Anxious / Depleted (Tamasic heavy state)
    this.lowLexicon = {
      overwhelmed: 0.95, anxious: 0.9, anxiety: 0.9, panic: 0.95, depressed: 0.9,
      depression: 0.9, sad: 0.75, sadness: 0.75, hopeless: 0.95, despair: 0.95,
      exhausted: 0.8, burnout: 0.85, tired: 0.6, drained: 0.75, failure: 0.85,
      failed: 0.8, failing: 0.8, exam: 0.65, exams: 0.65, test: 0.5,
      pressure: 0.75, nervous: 0.7, terrified: 0.9, afraid: 0.8, scared: 0.75,
      fear: 0.8, dread: 0.85, helpless: 0.9, lonely: 0.8, alone: 0.6,
      isolated: 0.8, empty: 0.75, void: 0.75, sorrow: 0.8, crying: 0.7,
      weeping: 0.75, insecure: 0.8, insecurity: 0.8, impostor: 0.85, unworthy: 0.9,
      guilt: 0.75, guilty: 0.75, shame: 0.85, stressed: 0.8, stress: 0.8,
      worry: 0.7, worried: 0.7, hurting: 0.75, grief: 0.9, broken: 0.85,
      miserable: 0.9, dark: 0.6, doomed: 0.95, hopeless: 0.9
    };

    // High / Ego / Euphoric / Intoxicated Pride (Rajasic high energy)
    this.highLexicon = {
      unstoppable: 0.95, promotion: 0.8, invincible: 0.95, untouchable: 0.95,
      genius: 0.85, supreme: 0.9, champion: 0.8, win: 0.7, won: 0.75,
      winning: 0.8, king: 0.85, god: 0.8, crush: 0.7, crushing: 0.8,
      unbeatable: 0.95, dominant: 0.85, dominate: 0.85, perfect: 0.75, superior: 0.9,
      fame: 0.7, famous: 0.7, brag: 0.85, boast: 0.9, unstoppable: 0.95,
      conquered: 0.85, elite: 0.8, flawless: 0.85, powerhouse: 0.8, pride: 0.75,
      proudest: 0.85, arrogance: 0.9, ego: 0.8, rich: 0.65, wealth: 0.6,
      euphoria: 0.9, ecstatic: 0.85, manic: 0.9, intoxicating: 0.85, untouchable: 0.95,
      "touch me": 0.95, "nobody can": 0.9, "no one can": 0.9, "best in": 0.85
    };

    // Anger / Krodha / Agitation
    this.angerLexicon = {
      angry: 0.85, anger: 0.85, furious: 0.95, rage: 0.95, betrayed: 0.95,
      betrayal: 0.95, revenge: 0.95, hate: 0.9, hatred: 0.9, cheat: 0.8,
      cheated: 0.85, injustice: 0.8, disgust: 0.75, disgusted: 0.8, bitter: 0.8,
      bitterness: 0.8, grudge: 0.85, scream: 0.7, punch: 0.85, destroy: 0.85,
      resent: 0.85, resentment: 0.85, hostile: 0.8, enemy: 0.75, unfair: 0.75,
      jealous: 0.8, jealousy: 0.8, envy: 0.8
    };

    // Confusion / Disorientation / Crossroads
    this.confusedLexicon = {
      confused: 0.8, confusion: 0.8, lost: 0.85, crossroads: 0.8, stuck: 0.75,
      paralyzed: 0.8, doubt: 0.75, doubting: 0.8, uncertain: 0.75, uncertainty: 0.75,
      indecisive: 0.8, wandering: 0.7, conflicted: 0.8, directionless: 0.85,
      dilemma: 0.8, split: 0.6, questioning: 0.65, hazy: 0.7
    };

    // Balanced / Shanta / Gratitude (Sattva)
    this.balancedLexicon = {
      peaceful: 0.85, peace: 0.85, calm: 0.85, serene: 0.9, serenity: 0.9,
      grateful: 0.9, gratitude: 0.9, thankful: 0.8, blessed: 0.85, content: 0.85,
      contentment: 0.85, quiet: 0.75, still: 0.8, stillness: 0.85, harmony: 0.85,
      centered: 0.85, breath: 0.7, clarity: 0.85, gentle: 0.75, balance: 0.8,
      balanced: 0.8, equanimity: 0.95, accepting: 0.8, simple: 0.65, blessing: 0.8
    };

    this.intensifiers = {
      totally: 1.4, completely: 1.4, utterly: 1.5, extremely: 1.5,
      so: 1.25, very: 1.3, deeply: 1.35, overly: 1.4, insanely: 1.45,
      super: 1.3, absolute: 1.4, absolutely: 1.4, heavily: 1.3
    };

    this.negators = ["not", "never", "no", "can't", "cannot", "hardly", "barely", "neither", "nor"];
  }

  tokenize(text) {
    if (!text) return [];
    // Convert to lowercase, normalize whitespace and punctuation
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, " ")
      .split(/\s+/)
      .filter(w => w.trim().length > 0);
  }

  analyze(rawText) {
    if (!rawText || !rawText.trim()) {
      return this.getDefaultNeutralAnalysis();
    }

    const text = rawText.trim();
    const words = this.tokenize(text);
    const lowerText = text.toLowerCase();

    let lowScore = 0;
    let highScore = 0;
    let angerScore = 0;
    let confusedScore = 0;
    let balancedScore = 0;

    const matchedKeywords = [];

    // Helper to evaluate matches
    const checkLexicon = (word, lexicon, category, polarity) => {
      if (lexicon[word]) {
        let weight = lexicon[word];
        matchedKeywords.push({
          word,
          category,
          polarity,
          weight: Number((weight * (polarity === "negative" ? -1 : 1)).toFixed(2))
        });
        return weight;
      }
      return 0;
    };

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let multiplier = 1.0;

      // Check preceding intensifier
      if (i > 0 && this.intensifiers[words[i - 1]]) {
        multiplier *= this.intensifiers[words[i - 1]];
      }

      // Check negation in preceding 2 words
      let isNegated = false;
      if (i > 0 && this.negators.includes(words[i - 1])) isNegated = true;
      if (i > 1 && this.negators.includes(words[i - 2])) isNegated = true;

      // Low check
      const lowVal = checkLexicon(word, this.lowLexicon, "low", "negative");
      if (lowVal > 0) {
        if (isNegated) {
          balancedScore += lowVal * 0.5 * multiplier;
        } else {
          lowScore += lowVal * multiplier;
        }
      }

      // High / Ego check
      const highVal = checkLexicon(word, this.highLexicon, "high", "positive");
      if (highVal > 0) {
        if (isNegated) {
          lowScore += highVal * 0.5 * multiplier;
        } else {
          highScore += highVal * multiplier;
        }
      }

      // Anger check
      const angerVal = checkLexicon(word, this.angerLexicon, "anger", "negative");
      if (angerVal > 0) {
        if (isNegated) {
          balancedScore += angerVal * 0.4 * multiplier;
        } else {
          angerScore += angerVal * multiplier;
        }
      }

      // Confusion check
      const confVal = checkLexicon(word, this.confusedLexicon, "confused", "negative");
      if (confVal > 0) {
        confusedScore += confVal * multiplier;
      }

      // Balanced check
      const balVal = checkLexicon(word, this.balancedLexicon, "balanced", "positive");
      if (balVal > 0) {
        if (isNegated) {
          lowScore += balVal * 0.7 * multiplier;
        } else {
          balancedScore += balVal * multiplier;
        }
      }
    }

    // Special multi-word phrases check
    if (lowerText.includes("no one can touch me") || lowerText.includes("nobody can touch me")) {
      highScore += 2.5;
      matchedKeywords.push({ word: "no one can touch me", category: "high", polarity: "positive", weight: 0.98 });
    }
    if (lowerText.includes("got the promotion") || lowerText.includes("got promoted")) {
      highScore += 1.8;
      matchedKeywords.push({ word: "promotion", category: "high", polarity: "positive", weight: 0.85 });
    }
    if (lowerText.includes("totally overwhelmed") || lowerText.includes("feel overwhelmed")) {
      lowScore += 2.2;
      matchedKeywords.push({ word: "totally overwhelmed", category: "low", polarity: "negative", weight: -0.95 });
    }
    if (lowerText.includes("upcoming exams") || lowerText.includes("exam stress")) {
      lowScore += 1.5;
      matchedKeywords.push({ word: "upcoming exams", category: "low", polarity: "negative", weight: -0.75 });
    }

    // Determine primary category & valence
    const scores = {
      low: lowScore,
      high: highScore,
      anger: angerScore,
      confused: confusedScore,
      balanced: balancedScore
    };

    // Deduplicate matched keywords
    const uniqueKeywords = [];
    const seenWords = new Set();
    for (const item of matchedKeywords) {
      if (!seenWords.has(item.word)) {
        seenWords.add(item.word);
        uniqueKeywords.push(item);
      }
    }

    // Calculate Valence Score: [-100 to +100]
    // Negative forces (low, anger, confused) pull down; positive forces pull up
    const totalNegative = lowScore + (angerScore * 1.1) + (confusedScore * 0.8);
    const totalPositive = highScore + (balancedScore * 1.2);

    let valenceScore = 0;
    if (totalNegative + totalPositive > 0) {
      valenceScore = Math.round(((totalPositive - totalNegative) / (totalPositive + totalNegative + 0.1)) * 100);
      valenceScore = Math.max(-100, Math.min(100, valenceScore));
    }

    // Volatility / Intensity Score: [0 to 100]
    const rawIntensity = (lowScore * 1.2) + (highScore * 1.3) + (angerScore * 1.4) + (confusedScore * 1.0);
    const volatilityScore = Math.min(100, Math.round((rawIntensity / (words.length > 5 ? Math.log2(words.length) : 2.5)) * 45));

    // Determine category based on dominant score
    let primaryCategory = "balanced";
    let dominantScore = 0;

    // Check low vs high vs anger vs confused
    if (angerScore > 1.2 && angerScore >= lowScore && angerScore >= highScore) {
      primaryCategory = "anger";
      dominantScore = angerScore;
    } else if (lowScore > 0.8 && lowScore >= highScore) {
      primaryCategory = "low";
      dominantScore = lowScore;
    } else if (highScore > 0.8 && highScore > lowScore) {
      primaryCategory = "high";
      dominantScore = highScore;
    } else if (confusedScore > 1.0) {
      primaryCategory = "confused";
      dominantScore = confusedScore;
    } else if (balancedScore > 0.5) {
      primaryCategory = "balanced";
      dominantScore = balancedScore;
    } else {
      // Default fallback based on valence
      if (valenceScore <= -20) primaryCategory = "low";
      else if (valenceScore >= 35) primaryCategory = "high";
      else primaryCategory = "balanced";
    }

    // Metadata & Vedantic Guna Analysis
    const meta = this.getGunaAndMeta(primaryCategory, valenceScore, volatilityScore);

    // Pick contextual Shloka
    const shloka = this.matchShloka(primaryCategory, lowerText);

    return {
      text,
      wordCount: words.length,
      primaryCategory,
      sentimentLabel: meta.label,
      badgeColor: meta.badgeColor,
      valenceScore,
      volatilityScore: Math.max(15, volatilityScore || 25),
      guna: meta.guna,
      gunaDescription: meta.gunaDescription,
      tattvaInsight: meta.tattvaInsight,
      extractedKeywords: uniqueKeywords.slice(0, 8),
      reflectionMirror: meta.reflectionMirror,
      shloka
    };
  }

  getGunaAndMeta(category, valence, volatility) {
    switch (category) {
      case "low":
        return {
          label: "Low / Anxious (Vishamata)",
          badgeColor: "amber",
          guna: "Tamas dominant (Inertia & Heaviness)",
          gunaDescription: "The mind is clouded by fatigue, fear, or self-doubt. Mental energy has contracted inward into vulnerability.",
          tattvaInsight: "Tattva 5 (Dakshinamurthy Stotram) teaches: You are not the fearful mind or anxious body. You are the unaffected, immortal observer (Sakshi).",
          reflectionMirror: "Your journal reveals feelings of being overwhelmed, anxious, or heavy-hearted. These are temporary ripples on the surface of your consciousness."
        };
      case "high":
        return {
          label: "High / Ego & Euphoria (Mada / Harsha)",
          badgeColor: "terracotta",
          guna: "Rajas dominant (Hyperactive Pride & Passion)",
          gunaDescription: "The ego (Ahankara) is riding a surge of triumph, feeling invincible or superior to others.",
          tattvaInsight: "Tattva 5 & Gita teach: When Rajas intoxicates with 'I am the doer', remember that all fruits belong to the greater universe. Return to humble stillness.",
          reflectionMirror: "Your words reflect tremendous excitement and a sense of invincibility. While victories are sweet, unbridled ego creates fragile attachment."
        };
      case "anger":
        return {
          label: "Agitated / Resentment (Krodha)",
          badgeColor: "rose",
          guna: "Fierce Rajas (Agitation & Burning)",
          gunaDescription: "Fiery emotional turbulence triggered by perceived injustice, betrayal, or unmet expectations.",
          tattvaInsight: "Tattva 5 teaches: Krodha burns the mind first. Recognize the other person as struggling in Maya, and reclaim your inner throne of equanimity.",
          reflectionMirror: "Your entry holds sharp heat, frustration, or a sense of grievance. Notice how anger contracts the chest and clouds judgment."
        };
      case "confused":
        return {
          label: "Disoriented / Searching (Moha)",
          badgeColor: "indigo",
          guna: "Rajas-Tamas mixture (Doubt & Fog)",
          gunaDescription: "The intellect (Buddhi) feels stalled at a crossroads, wrestling with contradictory desires or fears.",
          tattvaInsight: "Surrender the need to control all outcomes. Rest in the timeless presence beneath the questions.",
          reflectionMirror: "You stand at a threshold of uncertainty. Restless questions are seeking answers outside, when peace resides in quiet surrender."
        };
      case "balanced":
      default:
        return {
          label: "Balanced / Sattvic Calm (Prashanta)",
          badgeColor: "emerald",
          guna: "Sattva dominant (Purity, Light & Stillness)",
          gunaDescription: "The lake of the mind is serene, reflecting reality with unclouded lucidity and peaceful acceptance.",
          tattvaInsight: "Tattva 5 teaches: When the waters of the mind are calm, the true reflection of the Divine Witness shines through without distortion.",
          reflectionMirror: "Your entry breathes quiet poise and grounded gratitude. You are resting in harmony with what is."
        };
    }
  }

  matchShloka(category, text) {
    // If specific sub-conditions are met:
    if (category === "low") {
      if (text.includes("exam") || text.includes("overwhelm") || text.includes("burnout")) {
        // Prioritize Gita 2.20 or Dakshinamurthy 5
        return this.shlokas.find(s => s.id === "gita-2-20") || this.shlokas.find(s => s.id === "dakshinamurthy-5") || this.shlokas[0];
      }
      if (text.includes("fail") || text.includes("doubt") || text.includes("worth")) {
        return this.shlokas.find(s => s.id === "gita-6-5") || this.shlokas.find(s => s.id === "gita-2-20") || this.shlokas[0];
      }
      return this.shlokas.find(s => s.category === "low") || this.shlokas[0];
    }

    if (category === "high") {
      if (text.includes("promotion") || text.includes("unstoppable") || text.includes("touch me")) {
        return this.shlokas.find(s => s.id === "gita-2-47") || this.shlokas.find(s => s.id === "gita-3-27") || this.shlokas[1];
      }
      return this.shlokas.find(s => s.category === "high") || this.shlokas[1];
    }

    if (category === "anger") {
      return this.shlokas.find(s => s.category === "anger") || this.shlokas.find(s => s.id === "gita-2-62-63") || this.shlokas[0];
    }

    if (category === "confused") {
      return this.shlokas.find(s => s.category === "confused") || this.shlokas.find(s => s.id === "gita-2-7") || this.shlokas[0];
    }

    // Balanced
    return this.shlokas.find(s => s.category === "balanced") || this.shlokas.find(s => s.id === "gita-12-13-14") || this.shlokas[0];
  }

  getDefaultNeutralAnalysis() {
    const defaultShloka = this.shlokas[0] || {};
    return {
      text: "",
      wordCount: 0,
      primaryCategory: "balanced",
      sentimentLabel: "Centered / Neutral Awareness",
      badgeColor: "emerald",
      valenceScore: 0,
      volatilityScore: 10,
      guna: "Sattva-leaning Calm",
      gunaDescription: "A blank slate awaiting honest inquiry. The observer rests in peaceful potential.",
      tattvaInsight: "Tattva 5 (Dakshinamurthy Stotram): Consciousness is the unwritten canvas upon which all experiences arise.",
      extractedKeywords: [],
      reflectionMirror: "Pour your heart into the journal to receive timeless reflection from the Rishis.",
      shloka: defaultShloka
    };
  }
}

if (typeof window !== "undefined") {
  window.VedanticSentimentEngine = VedanticSentimentEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { VedanticSentimentEngine };
}
