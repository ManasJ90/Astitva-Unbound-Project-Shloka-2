/**
 * Astitva Unbound - Project Shloka
 * Authentic Curated Shloka Database with Vedanta & Dakshinamurthy Stotram Foundations
 */

const SHLOKA_DATABASE = [
  // --- LOW / ANXIOUS / OVERWHELMED / GRIEF / STRESS ---
  {
    id: "gita-2-20",
    category: "low",
    subCategory: "stress_grief",
    emotionTag: "Stress & Anxiety",
    sanskrit: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
    transliteration: "na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato'yaṁ purāṇo\nna hanyate hanyamāne śarīre ||",
    source: "Bhagavad Gita 2.20",
    sourceContext: "Lord Krishna dispelling Arjuna's grief on the battlefield of Kurukshetra",
    meaning: "The Soul is never born, nor does it ever die. It has not come into being, does not come into being, and will not come into being. Unborn, eternal, ever-existing, and primeval, it is not slain when the body is slain.",
    counterBalanceAdvice: "Remember that stress, failure, and anxiety are temporary modifications of the mind (Manomaya Kosha). Your true essence (Atman) is untouched by outer storms. Rest as the calm witness of this temporary distress.",
    vedantaConcept: "Atma Tatva (Immortal Self)",
    gunaFocus: "Transcending Tamas into Sattva",
    audioPronunciationText: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे।"
  },
  {
    id: "dakshinamurthy-5",
    category: "low",
    subCategory: "overwhelmed_burnout",
    emotionTag: "Overwhelm & Identity Crisis",
    sanskrit: "देहं प्राणमपि इन्द्रियाण्यपि चलां बुद्धिं च शून्यं विदुः\nस्त्रीबालान्धजडोपमास्त्वहमिति भ्रान्ता भृशं वादिनः।\nमायाशक्तिविलासकल्पितमहाव्यामोहसंहारिणे\nतस्मै श्रीगुरुमूर्तये नम इदं श्रीदक्षिणामूर्तये॥",
    transliteration: "dehaṁ prāṇamapi indriyāṇyapi calāṁ buddhiṁ ca śūnyaṁ viduḥ\nstrībālāndhajaḍopamāstvahamiti bhrāntā bhṛśaṁ vādinaḥ |\nmāyāśaktivilāsakalpitamahāvyāmohasaṁhāriṇe\ntasmai śrīgurumūrtaye nama idaṁ śrīdakṣiṇāmūrtaye ||",
    source: "Dakshinamurthy Stotram 5 (Tattva 5)",
    sourceContext: "Adi Shankaracharya revealing the true Self beyond the five sheaths",
    meaning: "Those who identify the pure 'I' with the physical body, the vital breaths, the senses, the fleeting intellect, or mere voidness are like children, the blind, or the confused. Salutations to Sri Dakshinamurthy, the divine teacher who shatters this great delusion born of Maya.",
    counterBalanceAdvice: "When work or life overwhelms you, recognize that you are confusing your job, deadlines, or emotions with your identity. You are not the exhausted mind or racing heart; you are the silent, spacious awareness observing them.",
    vedantaConcept: "Tattva 5: Sakshi Bhava (The Witness)",
    gunaFocus: "Dissolving Mental Projections",
    audioPronunciationText: "देहं प्राणमपि इन्द्रियाण्यपि चलां बुद्धिं च शून्यं विदुः। स्त्रीबालान्धजडोपमास्त्वहमिति भ्रान्ता भृशं वादिनः। तस्मै श्रीदक्षिणामूर्तये नमः।"
  },
  {
    id: "gita-2-14",
    category: "low",
    subCategory: "pain_adversity",
    emotionTag: "Adversity & Temporary Pain",
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    transliteration: "mātrā-sparśāstu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino'nityās-tāṁs-titikṣasva bhārata ||",
    source: "Bhagavad Gita 2.14",
    sourceContext: "Instruction to Arjuna on enduring life's dualities with fortitude",
    meaning: "Contact of the senses with their objects creates cold and heat, pleasure and pain. These experiences are fleeting and impermanent. Endure them patiently with an unbroken spirit.",
    counterBalanceAdvice: "Like winter turns into spring, this wave of low spirits has an arrival and an inevitable departure. Cultivate 'Titiksha' (forbearing endurance). Do not judge yourself for feeling down; simply allow the sensation to pass.",
    vedantaConcept: "Titiksha (Calm Endurance)",
    gunaFocus: "Equanimity in Dualities (Dvandvas)",
    audioPronunciationText: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत।"
  },
  {
    id: "gita-6-5",
    category: "low",
    subCategory: "self_doubt",
    emotionTag: "Self-Doubt & Helplessness",
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ ||",
    source: "Bhagavad Gita 6.5",
    sourceContext: "The power of self-mastery and internal support",
    meaning: "Elevate yourself through the power of your own higher self; do not degrade yourself. For the self alone is your trusted friend, and the self alone can be your own worst enemy.",
    counterBalanceAdvice: "Cease harsh self-criticism. Right now, your turbulent thoughts are acting as an adversary. Turn inward with gentleness and become your own closest spiritual ally. You have within you the light to rise again.",
    vedantaConcept: "Atma-Kripa (Grace from Within)",
    gunaFocus: "Awakening Buddhi (Higher Will)",
    audioPronunciationText: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः।"
  },

  // --- HIGH / EGO / EUPHORIA / PRIDE / ARROGANCE ---
  {
    id: "gita-2-47",
    category: "high",
    subCategory: "euphoria_arrogance",
    emotionTag: "Pride & Attachment to Wins",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras-te mā phaleṣu kadācana |\nmā karma-phala-hetur-bhūr-mā te saṅgo'stv-akarmaṇi ||",
    source: "Bhagavad Gita 2.47",
    sourceContext: "The cardinal foundation of Nishkama Karma Yoga",
    meaning: "You have a right only to perform your prescribed duty, never to the fruits of action. Never consider yourself the sole cause of the results, nor be attached to inaction.",
    counterBalanceAdvice: "Celebrate your victory with warmth, but remain grounded. Success is a confluence of innumerable unseen forces and timing—not solely individual ego. Anchor your peace in your integrity of effort, not the intoxication of praise.",
    vedantaConcept: "Nishkama Karma (Detached Action)",
    gunaFocus: "Sublimating Rajas into Pure Sattva",
    audioPronunciationText: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।"
  },
  {
    id: "gita-3-27",
    category: "high",
    subCategory: "invincibility_ego",
    emotionTag: "Ego of Doership (Kartritva)",
    sanskrit: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः।\nअहङ्कारविमूढात्मा कर्ताहमिति मन्यते॥",
    transliteration: "prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ |\nahaṅkāra-vimūḍhātmā kartāham iti manyate ||",
    source: "Bhagavad Gita 3.27",
    sourceContext: "Unmasking the illusion of the ego as the supreme doer",
    meaning: "All actions are in truth carried out by the energetic modes of Nature (Gunas). Yet, bewildered by false ego, the deluded soul thinks: 'I am the lone doer.'",
    counterBalanceAdvice: "Feeling invincible is a fleeting surge of Rajas. Keep your feet on the earth. When pride whispers 'I did this alone,' remind yourself: true greatness is humble, serene, and recognizes the interconnected web of all life.",
    vedantaConcept: "Akartritva (Freedom from False Agency)",
    gunaFocus: "Tempering Ego with Humility",
    audioPronunciationText: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः। अहङ्कारविमूढात्मा कर्ताहमिति मन्यते।"
  },
  {
    id: "gita-2-56",
    category: "high",
    subCategory: "hyperactivity_euphoria",
    emotionTag: "Sensory Intoxication",
    sanskrit: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥",
    transliteration: "duḥkheṣv-anudvigna-manāḥ sukheṣu vigata-spṛhaḥ |\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr-munir-ucyate ||",
    source: "Bhagavad Gita 2.56",
    sourceContext: "Description of the Sthitaprajna (The Person of Steady Wisdom)",
    meaning: "One whose mind remains unshaken amidst distress, who is free from feverish craving amidst pleasures, and who has transcended passionate attachment, fear, and rage—is called a sage of steady wisdom.",
    counterBalanceAdvice: "Do not let intense euphoria unmoor your center. Just as deep grief blinds, intoxicating excitement can cause reckless judgment. Strive for 'Sthita-prajna'—steady, joyful serenity that neither panics in valleys nor swoons on peaks.",
    vedantaConcept: "Samatvam (Equanimity of Mind)",
    gunaFocus: "Centering Rajas into Deep Equilibrium",
    audioPronunciationText: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः। वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते।"
  },

  // --- ANGER / FRUSTRATION / RESENTMENT ---
  {
    id: "gita-2-62-63",
    category: "anger",
    subCategory: "rage_resentment",
    emotionTag: "Anger & Burning Frustration",
    sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥\nक्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
    transliteration: "dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate |\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho'bhijāyate ||\nkrodhād bhavati sammohaḥ sammohāt smṛti-vibhramaḥ |\nsmṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati ||",
    source: "Bhagavad Gita 2.62-63",
    sourceContext: "The ladder of emotional fall caused by uncontrolled fury",
    meaning: "Dwelling on sensory desires breeds obsession; from desire arises wrath. From wrath comes delusion, from delusion loss of memory, and from ruined memory the intellect perishes, leading to spiritual ruin.",
    counterBalanceAdvice: "Anger is fire that burns the vessel holding it before touching anyone else. Step back. Do not act or speak in the heat of resentment. Inhale deeply, observe the heat in your body without judgment, and let your intellect (Buddhi) reclaim sovereignty.",
    vedantaConcept: "Buddhi Yoga (Clear Discernment)",
    gunaFocus: "Quelling Violent Rajas",
    audioPronunciationText: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति।"
  },
  {
    id: "isha-upanishad-6",
    category: "anger",
    subCategory: "conflict_betrayal",
    emotionTag: "Bitterness & Conflict",
    sanskrit: "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति।\nसर्वभूतेषु चात्मानं ततो न विजुगुप्सते॥",
    transliteration: "yastu sarvāṇi bhūtāny-ātmany-evānupaśyati |\nsarva-bhūteṣu cātmānaṁ tato na vijugupsate ||",
    source: "Isha Upanishad 6",
    sourceContext: "Realization of the non-dual Oneness of all beings",
    meaning: "One who sees all beings in the Self, and the Self in all beings, never harbors hatred or disgust toward anyone.",
    counterBalanceAdvice: "When someone hurts or betrays you, their actions stem from their own ignorance, fear, or suffering. Holding a grudge tethers your spirit to their wrongdoing. Forgive not to excuse them, but to set your own heart free.",
    vedantaConcept: "Sarva-Atma-Bhava (Universal Oneness)",
    gunaFocus: "Transcending Otherness (Dvaita)",
    audioPronunciationText: "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति। सर्वभूतेषु चात्मानं ततो न विजुगुप्सते।"
  },

  // --- CONFUSION / RESTLESSNESS / DISORIENTATION ---
  {
    id: "gita-2-7",
    category: "confused",
    subCategory: "dilemma_lost",
    emotionTag: "Confusion & Crossroads",
    sanskrit: "कार्पण्यदोषोपहतस्वभावः\nपृच्छामि त्वां धर्मसंमूढचेताः।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे\nशिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम्॥",
    transliteration: "kārpaṇya-doṣopahata-svabhāvaḥ\npṛcchāmi tvāṁ dharma-sammūḍha-cetāḥ |\nyac-chreyaḥ syān-niścitaṁ brūhi tan-me\nśiṣyas-te'haṁ śādhi māṁ tvāṁ prapannam ||",
    source: "Bhagavad Gita 2.7",
    sourceContext: "Arjuna surrendering to Krishna when paralyzed by doubt",
    meaning: "With my true nature paralyzed by weakness, and my mind utterly bewildered about duty, I ask you: tell me decisively what is truly good for me. I am your disciple; guide me as I surrender to you.",
    counterBalanceAdvice: "It is honorable to admit when you are lost. Paralysis of choice vanishes when you drop the need to control every consequence. Seek quiet counsel within your deeper conscience. Trust that the right step forward will reveal itself in quietude.",
    vedantaConcept: "Sharanagati (Spiritual Surrender)",
    gunaFocus: "Clarity over Mental Turbulence",
    audioPronunciationText: "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसंमूढचेताः। यच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे।"
  },

  // --- BALANCED / PEACEFUL / GRATITUDE / EQUANIMITY ---
  {
    id: "gita-12-13-14",
    category: "balanced",
    subCategory: "peace_gratitude",
    emotionTag: "Inner Harmony & Compassion",
    sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥\nसन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥",
    transliteration: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||\nsantuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ |\nmayy-arpita-mano-buddhir-yo mad-bhaktaḥ sa me priyaḥ ||",
    source: "Bhagavad Gita 12.13-14",
    sourceContext: "The noble qualities of the peaceful devotee of truth",
    meaning: "Free from malice toward all beings, friendly and compassionate, devoid of possessiveness and ego, poised equally in joy and sorrow, forgiving, ever contented and self-controlled—such a steady soul is deeply dear to Truth.",
    counterBalanceAdvice: "Cherish this precious state of Sattva. You are aligned with peace, clarity, and kindness. Maintain this gentle gratitude, share this calm with those around you, and anchor this centered stillness in your daily actions.",
    vedantaConcept: "Sattva-Samsiddhi (Abiding in Light)",
    gunaFocus: "Sustaining Pure Sattva",
    audioPronunciationText: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी। सन्तुष्टः सततं योगी।"
  },
  {
    id: "dakshinamurthy-1",
    category: "balanced",
    subCategory: "witness_perspective",
    emotionTag: "Mirror of Consciousness",
    sanskrit: "विश्वं दर्पणदृश्यमाननगरीतुल्यं निजान्तर्गतं\nपश्यन्नात्मनि मायया बहिरिवोद्भूतं यथा निद्रया।\nयः साक्षात्कुरुते प्रबोधसमये स्वात्मानमेवाद्वयं\nतस्मै श्रीगुरुमूर्तये नम इदं श्रीदक्षिणामूर्तये॥",
    transliteration: "viśvaṁ darpaṇa-dṛśyamāna-nagarī-tulyaṁ nijāntargataṁ\npaśyann-ātmani māyayā bahir-ivodbhūtaṁ yathā nidrayā |\nyaḥ sākṣāt-kurute prabodha-samaye svātmānam-evādvayaṁ\ntasmai śrīgurumūrtaye nama idaṁ śrīdakṣiṇāmūrtaye ||",
    source: "Dakshinamurthy Stotram 1",
    sourceContext: "The cosmos as a luminous reflection in the mirror of the Self",
    meaning: "The entire universe is like a city seen within a mirror, existing essentially within oneself, yet appearing as if outside through the power of Maya, like an unfolding dream. Salutations to Sri Dakshinamurthy, who awakens us to the non-dual Truth.",
    counterBalanceAdvice: "Observe your world with wonder. All sights, sounds, and events are reflections in the tranquil lake of your awareness. As you remain undisturbed as the mirror, life flows with effortless grace.",
    vedantaConcept: "Sakshi Darshana (The Mirror Analogy)",
    gunaFocus: "Pure Non-Dual Abidance",
    audioPronunciationText: "विश्वं दर्पणदृश्यमाननगरीतुल्यं निजान्तर्गतं पश्यन्नात्मनि मायया बहिरिवोद्भूतम्। तस्मै श्रीदक्षिणामूर्तये नमः।"
  }
];

if (typeof window !== "undefined") {
  window.SHLOKA_DATABASE = SHLOKA_DATABASE;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SHLOKA_DATABASE };
}
