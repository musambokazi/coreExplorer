export const journeySteps = [
  {
    title: "Take the quiz",
    text: "Students answer a short set of questions about their values and interests.",
  },
  {
    title: "Match strengths",
    text: "CoreExplore links those answers to school subjects and career themes.",
  },
  {
    title: "Explore opportunities",
    text: "The app recommends careers, institutions, and useful learning resources.",
  },
];

export const principles = [
  "Clear guidance for learners who are still discovering their direction.",
  "A simple experience that connects personal values to real opportunities.",
  "A strong foundation for future quiz, recommendation, and institution features.",
];

export const pathwayOptions = [
  { label: "People", value: "people" },
  { label: "STEM", value: "stem" },
  { label: "Creative", value: "creative" },
  { label: "Business", value: "business" },
];

export const quizModules = [
  {
    id: "values",
    title: "Values and purpose",
    intro: "These questions help CoreExplore understand what matters to you most.",
    questions: [
      {
        id: "q1",
        prompt: "Which kind of challenge feels most meaningful to you?",
        options: [
          { label: "Building something practical that helps people", value: "stem" },
          { label: "Creating something memorable or beautiful", value: "creative" },
          { label: "Supporting people through care or guidance", value: "people" },
          { label: "Leading a project or building a future", value: "business" },
        ],
      },
      {
        id: "q2",
        prompt: "What kind of impact do you want to make in your community?",
        options: [
          { label: "Improve systems, technology, or health", value: "stem" },
          { label: "Bring ideas and stories to life", value: "creative" },
          { label: "Support growth, wellbeing, and belonging", value: "people" },
          { label: "Create opportunities, services, or growth", value: "business" },
        ],
      },
      {
        id: "q3",
        prompt: "Which type of work would feel energising over time?",
        options: [
          { label: "Solving technical or scientific problems", value: "stem" },
          { label: "Designing, performing, or expressing ideas", value: "creative" },
          { label: "Working closely with people and helping them", value: "people" },
          { label: "Planning strategy and creating value", value: "business" },
        ],
      },
    ],
  },
  {
    id: "learning",
    title: "How you learn best",
    intro: "CoreExplore uses this to suggest subjects and environments that fit your style.",
    questions: [
      {
        id: "q4",
        prompt: "What kind of learning environment do you enjoy most?",
        options: [
          { label: "Labs, experiments, and hands-on practice", value: "stem" },
          { label: "Studio spaces, design work, and creativity", value: "creative" },
          { label: "Teamwork, discussion, and community projects", value: "people" },
          { label: "Leadership rooms, strategy, and planning", value: "business" },
        ],
      },
      {
        id: "q5",
        prompt: "When you learn something new, what do you want first?",
        options: [
          { label: "The logic behind it and how it works", value: "stem" },
          { label: "The creative freedom to explore it", value: "creative" },
          { label: "The human story and why it matters", value: "people" },
          { label: "The practical opportunity it creates", value: "business" },
        ],
      },
      {
        id: "q6",
        prompt: "What kind of classroom experience feels most motivating?",
        options: [
          { label: "Building, testing, and debugging", value: "stem" },
          { label: "Presenting ideas, making things, and telling stories", value: "creative" },
          { label: "Collaborating and supporting others", value: "people" },
          { label: "Pitching ideas and organising action", value: "business" },
        ],
      },
    ],
  },
  {
    id: "curiosity",
    title: "What sparks your curiosity",
    intro: "These questions connect your interests to real opportunities and resources.",
    questions: [
      {
        id: "q7",
        prompt: "Which topic would you happily explore for hours?",
        options: [
          { label: "How technology changes the world", value: "stem" },
          { label: "How design and culture shape experiences", value: "creative" },
          { label: "How people grow, learn, and thrive", value: "people" },
          { label: "How ideas become successful ventures", value: "business" },
        ],
      },
      {
        id: "q8",
        prompt: "What kind of future feels exciting to you?",
        options: [
          { label: "Inventing tools or solving big problems", value: "stem" },
          { label: "Creating content, experiences, or beauty", value: "creative" },
          { label: "Building stronger communities and support", value: "people" },
          { label: "Creating opportunities and leading change", value: "business" },
        ],
      },
      {
        id: "q9",
        prompt: "Which kind of opportunity would you be proud to pursue?",
        options: [
          { label: "A career in research, engineering, or health", value: "stem" },
          { label: "A career in design, media, or the arts", value: "creative" },
          { label: "A career in teaching, counselling, or care", value: "people" },
          { label: "A career in leadership, entrepreneurship, or management", value: "business" },
        ],
      },
    ],
  },
];

export const resultsMap = {
  stem: {
    title: "STEM and innovation pathway",
    description:
      "You are likely to enjoy practical problem solving, technical learning, and creating solutions that improve everyday life.",
    careers: ["Software Engineer", "Civil Engineer", "Medical Scientist"],
    subjects: ["Mathematics", "Physical Sciences", "Computer Applications"],
    learningStyle: "You learn best through experiments, logic, and hands-on problem solving.",
    nextSteps: [
      "Explore coding clubs, science fairs, and robotics opportunities.",
      "Ask about engineering, health sciences, and technology pathways.",
      "Look for institutions with strong STEM subjects and practical labs.",
    ],
  },
  creative: {
    title: "Creative and expressive pathway",
    description: "You may thrive in design, storytelling, media, and expressive problem solving.",
    careers: ["Graphic Designer", "Content Creator", "Architect"],
    subjects: ["Visual Arts", "Design", "Communication Studies"],
    learningStyle: "You learn best by creating, experimenting, and shaping ideas into something visible.",
    nextSteps: [
      "Explore creative portfolios, media projects, and design clubs.",
      "Ask about visual arts, architecture, and communication courses.",
      "Look for institutions that support studios, digital media, and innovation.",
    ],
  },
  people: {
    title: "People-focused pathway",
    description:
      "You are likely to enjoy working closely with others and supporting growth, wellbeing, and belonging.",
    careers: ["Teacher", "Social Worker", "Counsellor"],
    subjects: ["Life Orientation", "English", "Psychology"],
    learningStyle: "You learn best through conversation, community, mentorship, and meaningful connection.",
    nextSteps: [
      "Explore volunteer roles, peer support, and community projects.",
      "Ask about education, social work, and care-related training pathways.",
      "Look for institutions with strong student support and community engagement.",
    ],
  },
  business: {
    title: "Business and leadership pathway",
    description: "You may enjoy planning, leadership, entrepreneurship, and creating value for others.",
    careers: ["Entrepreneur", "Project Manager", "Marketing Specialist"],
    subjects: ["Economics", "Business Studies", "Accounting"],
    learningStyle: "You learn best by organising ideas, seeing the bigger picture, and turning plans into action.",
    nextSteps: [
      "Explore entrepreneurship programmes, leadership clubs, and business challenges.",
      "Ask about commerce, management, and marketing pathways.",
      "Look for institutions that encourage innovation, networking, and practical projects.",
    ],
  },
};
