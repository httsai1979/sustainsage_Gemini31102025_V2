export type WorksheetPrompt = {
  id: string;
  label: string;
  help: string;
  placeholder: string;
};

export type ChangeLeadershipTool = {
  slug: string;
  title: string;
  stage: 1 | 2 | 3 | 4;
  purpose: string;
  whenToUse: string;
  limits: string;
  data: string;
  nextSlug: string;
  prompts: readonly WorksheetPrompt[];
};

const limitsEn = 'This is a structured reflection aid. It does not replace organisational diagnosis, legal advice, employee consultation or mental health care.';
const dataEn = 'Your entries are saved only in this browser. Nothing is sent to SustainSage unless you choose to copy and share it.';
const limitsZh = '這是結構化反思工具，不能取代組織診斷、法律意見、員工諮詢程序或心理健康照護。';
const dataZh = '你的輸入只會儲存在這個瀏覽器。除非你自行複製並分享，內容不會傳送給 SustainSage。';

export const enChangeLeadershipTools: ChangeLeadershipTool[] = [
  {
    slug: 'change-context-map',
    title: 'Change Context Map',
    stage: 1,
    purpose: 'Separate the business need, headquarters expectations and local operating reality before choosing an intervention.',
    whenToUse: 'Use it when a change request sounds simple at headquarters but becomes ambiguous or contested locally.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'stakeholder-resistance-map',
    prompts: [
      { id: 'change', label: 'What change is being asked for?', help: 'Describe the observable shift, not the project name.', placeholder: 'People will start, stop or do what differently?' },
      { id: 'reason', label: 'Why does the business need it now?', help: 'Name the commercial, operational or people reason.', placeholder: 'What becomes harder if nothing changes?' },
      { id: 'hq', label: 'What does headquarters expect?', help: 'Include assumptions about pace, reporting and authority.', placeholder: 'What is treated as obvious at headquarters?' },
      { id: 'local', label: 'What is true in the local operation?', help: 'Capture constraints, history and relationships.', placeholder: 'What may not be visible from headquarters?' },
      { id: 'fixed', label: 'What is fixed, and what can be adapted?', help: 'Separate genuine non-negotiables from preferences.', placeholder: 'List both categories.' },
      { id: 'learn', label: 'What must be learned before acting?', help: 'Turn uncertainty into focused inquiry.', placeholder: 'Which assumption needs evidence?' },
    ],
  },
  {
    slug: 'stakeholder-resistance-map',
    title: 'Stakeholder and Resistance Map',
    stage: 1,
    purpose: 'Read resistance as information about loss, risk, trust or feasibility instead of labelling people as difficult.',
    whenToUse: 'Use it before stakeholder engagement, especially when formal agreement is not producing real adoption.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'change-narrative-builder',
    prompts: [
      { id: 'stakeholders', label: 'Who can enable, slow or redirect the change?', help: 'Include informal influencers as well as formal decision makers.', placeholder: 'Name groups, roles or individuals.' },
      { id: 'impact', label: 'What changes for them in practice?', help: 'Consider workload, status, autonomy, identity and competence.', placeholder: 'What might they gain, lose or have to relearn?' },
      { id: 'signals', label: 'What resistance signals are visible?', help: 'Record behaviour and evidence before interpretation.', placeholder: 'Delays, silence, rework, private objections, workarounds...' },
      { id: 'meaning', label: 'What might the resistance be protecting?', help: 'Distinguish legitimate concern from habit or politics.', placeholder: 'What risk or loss could make this response rational?' },
      { id: 'response', label: 'What response fits each source of resistance?', help: 'Choose listening, clarification, involvement, boundary setting or escalation deliberately.', placeholder: 'What will you do, with whom, and why?' },
    ],
  },
  {
    slug: 'change-narrative-builder',
    title: 'Change Narrative Builder',
    stage: 2,
    purpose: 'Build a credible explanation of why change is needed, what stays stable and what people can expect next.',
    whenToUse: 'Use it before announcing, repeating or repairing a change message across locations.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'role-decision-rights',
    prompts: [
      { id: 'why', label: 'Why now?', help: 'Connect the change to a real business condition.', placeholder: 'What has changed in the market, operation or organisation?' },
      { id: 'stays', label: 'What will remain stable?', help: 'Continuity reduces avoidable uncertainty.', placeholder: 'Which purpose, commitments or ways of working remain?' },
      { id: 'changes', label: 'What will change in observable terms?', help: 'Avoid abstract transformation language.', placeholder: 'What will people experience differently?' },
      { id: 'meaning', label: 'What does this mean for this audience?', help: 'Translate the message for their actual work.', placeholder: 'What will they need to know, decide or do?' },
      { id: 'unknowns', label: 'What is not known yet?', help: 'Credibility improves when uncertainty is named honestly.', placeholder: 'What is still being decided, and by when?' },
      { id: 'next', label: 'What is the next concrete step?', help: 'End with agency and a visible route forward.', placeholder: 'Who does what next, by when?' },
    ],
  },
  {
    slug: 'role-decision-rights',
    title: 'Role and Decision Rights Map',
    stage: 2,
    purpose: 'Clarify who decides, who contributes and where UK and Asia expectations currently conflict.',
    whenToUse: 'Use it when accountability is high but authority, consultation or escalation routes are unclear.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'difficult-conversation-planner',
    prompts: [
      { id: 'decision', label: 'What decision or outcome is in scope?', help: 'Keep the boundary narrow enough to act on.', placeholder: 'State the specific decision.' },
      { id: 'decider', label: 'Who has the final decision right?', help: 'Separate formal authority from practical influence.', placeholder: 'Role, location and any conditions.' },
      { id: 'contributors', label: 'Who must contribute before the decision?', help: 'Name expertise, consultation and local knowledge needed.', placeholder: 'Who must be heard, and on what?' },
      { id: 'owners', label: 'Who owns delivery after the decision?', help: 'Decision authority and execution responsibility may differ.', placeholder: 'Who is accountable for adoption?' },
      { id: 'conflicts', label: 'Where do expectations conflict?', help: 'Look for speed, quality, risk, hierarchy and reporting differences.', placeholder: 'What is each side assuming?' },
      { id: 'reset', label: 'What agreement needs to be reset?', help: 'Turn ambiguity into one explicit conversation.', placeholder: 'What will you ask to confirm?' },
    ],
  },
  {
    slug: 'difficult-conversation-planner',
    title: 'Difficult Conversation Planner',
    stage: 3,
    purpose: 'Prepare a direct conversation that protects clarity, dignity and the working relationship across hierarchy and culture.',
    whenToUse: 'Use it before addressing performance, authority, conflict, resistance or a broken commitment.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'adoption-experiment-ladder',
    prompts: [
      { id: 'outcome', label: 'What useful outcome do you need?', help: 'Define progress, not victory.', placeholder: 'What should be clearer or different after the conversation?' },
      { id: 'facts', label: 'What are the facts, and what are your assumptions?', help: 'Separate observable evidence from interpretation.', placeholder: 'Facts first, then assumptions.' },
      { id: 'perspective', label: 'What might the other person be protecting?', help: 'Consider status, face, workload, trust and risk.', placeholder: 'What could make their position understandable?' },
      { id: 'opening', label: 'How will you open?', help: 'State purpose and concern without accusation.', placeholder: 'Draft the first two sentences.' },
      { id: 'questions', label: 'What do you genuinely need to learn?', help: 'Use questions that could change your view.', placeholder: 'List two or three questions.' },
      { id: 'boundary', label: 'What boundary or agreement is required?', help: 'Be clear about what cannot remain vague.', placeholder: 'What will you ask, offer or escalate?' },
    ],
  },
  {
    slug: 'adoption-experiment-ladder',
    title: 'Adoption Experiment Ladder',
    stage: 3,
    purpose: 'Turn a large change into a sequence of observable tests that build evidence, confidence and local ownership.',
    whenToUse: 'Use it when the direction is agreed but a full rollout would create unnecessary risk or resistance.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'resilience-capacity-check',
    prompts: [
      { id: 'behaviour', label: 'What adoption behaviour matters?', help: 'Choose something observable, not awareness or buy-in.', placeholder: 'What will people do differently?' },
      { id: 'smallest', label: 'What is the smallest credible test?', help: 'Small should still produce useful evidence.', placeholder: 'One team, one process, one meeting or one week.' },
      { id: 'support', label: 'What support must be present?', help: 'Consider authority, time, skills, tools and social permission.', placeholder: 'What would make the test fair?' },
      { id: 'signals', label: 'What will show progress or friction?', help: 'Choose behaviour and operational signals.', placeholder: 'What will you observe, not merely ask?' },
      { id: 'review', label: 'When and with whom will you review?', help: 'Create a learning loop before scaling.', placeholder: 'Date, people and decision to be made.' },
    ],
  },
  {
    slug: 'resilience-capacity-check',
    title: 'Resilience Capacity Check',
    stage: 4,
    purpose: 'Protect leadership capacity during sustained change by identifying pressure, recovery needs, boundaries and support.',
    whenToUse: 'Use it when the change is strategically important but pace, ambiguity or emotional load is eroding judgement.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'motivation-commitment-map',
    prompts: [
      { id: 'pressure', label: 'What pressure is most active?', help: 'Name the demand, uncertainty or conflict precisely.', placeholder: 'What is consuming attention or energy?' },
      { id: 'signals', label: 'What are your early warning signs?', help: 'Notice changes in judgement, behaviour and recovery.', placeholder: 'What tells you capacity is narrowing?' },
      { id: 'control', label: 'What can you influence, and what can you not control?', help: 'Direct effort where it can change the situation.', placeholder: 'Separate the two lists.' },
      { id: 'support', label: 'What support is available but underused?', help: 'Include people, information, delegation and recovery.', placeholder: 'Who or what could carry part of the load?' },
      { id: 'boundary', label: 'What boundary protects decision quality?', help: 'Choose a practical limit, not an ideal routine.', placeholder: 'What will you stop, defer, delegate or protect?' },
      { id: 'week', label: 'What will you do in the next seven days?', help: 'Select one stabilising action you can keep.', placeholder: 'Make it specific and realistic.' },
    ],
  },
  {
    slug: 'motivation-commitment-map',
    title: 'Motivation and Commitment Map',
    stage: 4,
    purpose: 'Move beyond motivational slogans by connecting change to meaning, credible agency and visible commitments.',
    whenToUse: 'Use it when people understand the change but energy, ownership or follow-through is fading.',
    limits: limitsEn,
    data: dataEn,
    nextSlug: 'change-context-map',
    prompts: [
      { id: 'outcome', label: 'What meaningful outcome is at stake?', help: 'Connect the change to work people care about.', placeholder: 'Who benefits, and how?' },
      { id: 'ambivalence', label: 'What mixed feelings or competing commitments exist?', help: 'Low motivation may be rational ambivalence.', placeholder: 'What makes people want both change and no change?' },
      { id: 'agency', label: 'Where do people have real agency?', help: 'Do not ask for ownership without meaningful choice.', placeholder: 'What can they shape, decide or improve?' },
      { id: 'obstacles', label: 'What makes follow-through difficult?', help: 'Look beyond attitude to systems and workload.', placeholder: 'Which friction is structural, social or personal?' },
      { id: 'commitment', label: 'What is the minimum visible commitment?', help: 'Choose behaviour that can be observed and reviewed.', placeholder: 'Who will do what, by when?' },
      { id: 'reinforcement', label: 'How will progress be reinforced?', help: 'Use feedback, recognition, removal of friction and review.', placeholder: 'What will help the behaviour continue?' },
    ],
  },
];

const zhToolText: Record<string, Omit<ChangeLeadershipTool, 'slug' | 'stage' | 'nextSlug' | 'limits' | 'data'>> = {
  'change-context-map': {
    title: '變革情境地圖',
    purpose: '在選擇介入方式前，先分開看商業需求、總部期待與在地營運現實。',
    whenToUse: '當變革要求在總部看來很簡單，落到在地卻變得模糊或充滿爭議時使用。',
    prompts: [
      { id: 'change', label: '實際要求的改變是什麼？', help: '描述可觀察的轉變，不只寫專案名稱。', placeholder: '大家要開始、停止或改變什麼做法？' },
      { id: 'reason', label: '為什麼企業現在需要它？', help: '說明商業、營運或人員原因。', placeholder: '若不改變，什麼會變得更困難？' },
      { id: 'hq', label: '總部期待什麼？', help: '包含對速度、回報與權責的假設。', placeholder: '哪些事在總部被視為理所當然？' },
      { id: 'local', label: '在地營運的真實情況是什麼？', help: '記錄限制、歷史與關係脈絡。', placeholder: '哪些情況可能不在總部視線內？' },
      { id: 'fixed', label: '什麼不能變，什麼可以調整？', help: '把真正的必要條件與偏好分開。', placeholder: '分別列出兩類。' },
      { id: 'learn', label: '行動前還需要知道什麼？', help: '把不確定性變成聚焦的探索。', placeholder: '哪個假設需要證據？' },
    ],
  },
  'stakeholder-resistance-map': {
    title: '利害關係人與阻力地圖',
    purpose: '把阻力視為損失、風險、信任或可行性的資訊，而不是把人貼上難合作的標籤。',
    whenToUse: '在進行利害關係人溝通前使用，尤其適合表面同意卻沒有真正採用的情況。',
    prompts: [
      { id: 'stakeholders', label: '誰能推進、拖慢或改變方向？', help: '同時納入正式決策者與非正式影響者。', placeholder: '列出群體、角色或個人。' },
      { id: 'impact', label: '這項改變實際上會如何影響他們？', help: '考慮工作量、地位、自主、身份與能力。', placeholder: '他們可能得到、失去或需要重新學習什麼？' },
      { id: 'signals', label: '目前看得到哪些阻力訊號？', help: '先記錄行為與證據，再作解讀。', placeholder: '延遲、沉默、重工、私下反對、繞道做法等。' },
      { id: 'meaning', label: '阻力可能正在保護什麼？', help: '分辨合理疑慮、習慣與政治因素。', placeholder: '哪一種風險或損失會讓這個反應變得合理？' },
      { id: 'response', label: '每一種阻力適合什麼回應？', help: '有意識地選擇傾聽、澄清、參與、設限或升級處理。', placeholder: '你會對誰做什麼，以及為什麼？' },
    ],
  },
  'change-narrative-builder': {
    title: '變革敘事建構器',
    purpose: '建立可信的說明，說清楚為何需要改變、什麼維持不變，以及下一步會發生什麼。',
    whenToUse: '適合在跨地點宣布、重述或修復一段變革訊息之前使用。',
    prompts: [
      { id: 'why', label: '為什麼是現在？', help: '把改變連結到真實商業條件。', placeholder: '市場、營運或組織發生了什麼變化？' },
      { id: 'stays', label: '什麼會維持穩定？', help: '延續性可以降低不必要的不確定。', placeholder: '哪些目的、承諾或工作方式不會改變？' },
      { id: 'changes', label: '哪些事情會明確改變？', help: '避免抽象的轉型用語。', placeholder: '大家將實際經歷什麼不同？' },
      { id: 'meaning', label: '這對目前對象意味著什麼？', help: '翻譯成他們的真實工作。', placeholder: '他們需要知道、決定或採取什麼行動？' },
      { id: 'unknowns', label: '目前還不知道什麼？', help: '誠實說明不確定能提升可信度。', placeholder: '什麼仍在決定，何時會有答案？' },
      { id: 'next', label: '下一個具體步驟是什麼？', help: '以可行動的方向收尾。', placeholder: '誰在何時做什麼？' },
    ],
  },
  'role-decision-rights': {
    title: '角色與決策權地圖',
    purpose: '釐清誰決定、誰參與，以及英國與亞洲的期待目前在哪裡衝突。',
    whenToUse: '當責任很高，但權限、諮詢方式或升級路徑仍不清楚時使用。',
    prompts: [
      { id: 'decision', label: '目前範圍內的決定或成果是什麼？', help: '把邊界縮小到足以行動。', placeholder: '寫下具體決定。' },
      { id: 'decider', label: '誰擁有最終決策權？', help: '分開看正式權力與實際影響力。', placeholder: '角色、地點與任何條件。' },
      { id: 'contributors', label: '決定前必須由誰提供意見？', help: '納入專業、諮詢與在地知識。', placeholder: '必須聽見誰，以及針對什麼？' },
      { id: 'owners', label: '決定後由誰負責落實？', help: '決策權與執行責任可能不同。', placeholder: '誰對採用結果負責？' },
      { id: 'conflicts', label: '期待在哪裡衝突？', help: '檢視速度、品質、風險、階級與回報差異。', placeholder: '雙方各自假設了什麼？' },
      { id: 'reset', label: '需要重新確認哪一項協議？', help: '把模糊變成一場明確對話。', placeholder: '你會要求確認什麼？' },
    ],
  },
  'difficult-conversation-planner': {
    title: '困難對話規劃器',
    purpose: '準備一場兼顧清楚、尊嚴與工作關係的直接對話，並跨越階級與文化。',
    whenToUse: '適合在處理績效、權責、衝突、阻力或未履行承諾之前使用。',
    prompts: [
      { id: 'outcome', label: '你需要什麼有用的結果？', help: '定義進展，而不是勝負。', placeholder: '對話後需要更清楚或有所不同的是什麼？' },
      { id: 'facts', label: '哪些是事實，哪些是你的假設？', help: '分開可觀察證據與解讀。', placeholder: '先寫事實，再寫假設。' },
      { id: 'perspective', label: '對方可能正在保護什麼？', help: '考慮地位、面子、工作量、信任與風險。', placeholder: '什麼情況會讓對方的立場變得可以理解？' },
      { id: 'opening', label: '你要如何開場？', help: '說清楚目的與疑慮，不用指控語氣。', placeholder: '寫下前兩句話。' },
      { id: 'questions', label: '你真正需要理解什麼？', help: '提出可能改變你看法的問題。', placeholder: '列出兩到三個問題。' },
      { id: 'boundary', label: '需要建立什麼界線或協議？', help: '不要讓關鍵責任繼續模糊。', placeholder: '你會提出、提供或升級處理什麼？' },
    ],
  },
  'adoption-experiment-ladder': {
    title: '採用實驗階梯',
    purpose: '把大型改變拆成可觀察的測試，逐步建立證據、信心與在地承擔。',
    whenToUse: '當方向已經同意，但全面推行會帶來不必要風險或阻力時使用。',
    prompts: [
      { id: 'behaviour', label: '哪一個採用行為最重要？', help: '選擇可觀察的行為，不只寫認知或認同。', placeholder: '大家會做什麼不同的事？' },
      { id: 'smallest', label: '最小而可信的測試是什麼？', help: '規模小，但仍要能產生有用證據。', placeholder: '一個團隊、一個流程、一場會議或一週。' },
      { id: 'support', label: '測試需要哪些支援？', help: '考慮權限、時間、能力、工具與社會許可。', placeholder: '什麼條件能讓測試公平？' },
      { id: 'signals', label: '什麼能顯示進展或摩擦？', help: '選擇行為與營運訊號。', placeholder: '你會觀察什麼，而不只詢問感受？' },
      { id: 'review', label: '何時與誰一起回顧？', help: '擴大之前先建立學習循環。', placeholder: '日期、參與者與要作的決定。' },
    ],
  },
  'resilience-capacity-check': {
    title: '韌性與承載力檢視',
    purpose: '辨識壓力、恢復需求、界線與支援，保護長期變革中的領導判斷力。',
    whenToUse: '當變革很重要，但速度、不確定或情緒負荷正逐步侵蝕判斷時使用。',
    prompts: [
      { id: 'pressure', label: '目前最主要的壓力是什麼？', help: '精準說明需求、不確定或衝突。', placeholder: '什麼正在大量消耗注意力或能量？' },
      { id: 'signals', label: '你的早期警訊是什麼？', help: '留意判斷、行為與恢復狀態的變化。', placeholder: '什麼會告訴你承載力正在縮小？' },
      { id: 'control', label: '什麼能影響，什麼無法控制？', help: '把努力放在能改變情況的地方。', placeholder: '分成兩類列出。' },
      { id: 'support', label: '有哪些支援尚未充分使用？', help: '包含人、資訊、授權與恢復。', placeholder: '誰或什麼可以承擔部分負荷？' },
      { id: 'boundary', label: '哪一條界線能保護決策品質？', help: '選擇實際可行的限制。', placeholder: '你會停止、延後、授權或保護什麼？' },
      { id: 'week', label: '未來七天要做什麼？', help: '選擇一項能維持的穩定行動。', placeholder: '具體且務實地寫下來。' },
    ],
  },
  'motivation-commitment-map': {
    title: '動機與承諾地圖',
    purpose: '把改變連結到意義、可信的自主性與可見承諾，超越空泛的激勵口號。',
    whenToUse: '當大家理解改變，但能量、承擔或持續行動正在下降時使用。',
    prompts: [
      { id: 'outcome', label: '真正重要的成果是什麼？', help: '把改變連結到人們在意的工作。', placeholder: '誰會受益，以及如何受益？' },
      { id: 'ambivalence', label: '有哪些矛盾感受或競爭承諾？', help: '低動機有時是合理的猶豫。', placeholder: '什麼讓人同時想改變又不想改變？' },
      { id: 'agency', label: '大家在哪裡擁有真正的自主？', help: '不要在沒有選擇時要求承擔。', placeholder: '他們能塑造、決定或改善什麼？' },
      { id: 'obstacles', label: '什麼讓持續行動變得困難？', help: '除了態度，也檢視制度與工作量。', placeholder: '哪些摩擦來自結構、關係或個人？' },
      { id: 'commitment', label: '最低限度的可見承諾是什麼？', help: '選擇可以被觀察與回顧的行為。', placeholder: '誰在何時做什麼？' },
      { id: 'reinforcement', label: '如何強化進展？', help: '使用回饋、肯定、移除摩擦與回顧。', placeholder: '什麼能幫助這個行為持續？' },
    ],
  },
};

export const zhChangeLeadershipTools: ChangeLeadershipTool[] = enChangeLeadershipTools.map((tool) => ({
  ...tool,
  ...zhToolText[tool.slug],
  limits: limitsZh,
  data: dataZh,
}));

export const changeLeadershipStages = {
  'en-GB': ['Read the system', 'Create alignment', 'Move adoption', 'Sustain the change'],
  'zh-TW': ['讀懂系統', '建立對齊', '推進採用', '讓改變持續'],
} as const;
