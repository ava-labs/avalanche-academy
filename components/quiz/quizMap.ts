interface QuizInfo {
  url: string;
  chapter: string;
}

interface ChapterQuizzes {
  [chapterId: string]: {
    [quizId: string]: QuizInfo;
  };
}

export const quizMapping: ChapterQuizzes = {
  'avalanche-fundamentals': {
    'avalanche-consensus-intro-01': {
      url: '/course/avalanche-fundamentals/02-avalanche-consensus-intro/01-avalanche-consensus-intro',
      chapter: 'Avalanche Consensus Intro'
    },
    'avalanche-fundamentals-02-1': {
      url: '/course/avalanche-fundamentals/02-avalanche-consensus-intro/02-consensus-mechanisms#ordering-through-consensus',
      chapter: 'Avalanche Consensus Intro'
    },
    'avalanche-fundamentals-02-2': {
      url: '/course/avalanche-fundamentals/02-avalanche-consensus-intro/02-consensus-mechanisms#double-spending-attack',
      chapter: 'Avalanche Consensus Intro'
    },
    'snowman-consensus-03-1': {
      url: '/course/avalanche-fundamentals/02-avalanche-consensus-intro/03-snowman-consensus#changing-preference',
      chapter: 'Avalanche Consensus Intro'
    },
    'snowman-consensus-03-2': {
      url: '/course/avalanche-fundamentals/02-avalanche-consensus-intro/03-snowman-consensus#finalization',
      chapter: 'Avalanche Consensus Intro'
    },
    'multi-chain-architecture-02': {
      url: '/course/avalanche-fundamentals/03-multi-chain-architecture-intro/02-subnet',
      chapter: 'Multi-Chain Architecture'
    },
    'multi-chain-architecture-benefits-03-1': {
      url: '/course/avalanche-fundamentals/03-multi-chain-architecture-intro/03-benefits#independence-from-other-avalanche-l1s',
      chapter: 'Multi-Chain Architecture'
    },
    'multi-chain-architecture-benefits-03-2': {
      url: '/course/avalanche-fundamentals/03-multi-chain-architecture-intro/03-benefits#other-multi-chain-systems',
      chapter: 'Multi-Chain Architecture'
    },
    'vms-and-blockchains-state-machine-02-1': {
      url: '/course/avalanche-fundamentals/05-vms-and-blockchains/02-state-machine#soda-dispenser-a-simple-machine',
      chapter: 'VMs and Blockchains'
    },
    'vms-and-blockchains-state-machine-02-2': {
      url: '/course/avalanche-fundamentals/05-vms-and-blockchains/02-state-machine#soda-dispenser-a-simple-machine',
      chapter: 'VMs and Blockchains'
    },
    'vms-and-blockchains-state-machine-02-3': {
      url: '/course/avalanche-fundamentals/05-vms-and-blockchains/02-state-machine#advantages-of-vms',
      chapter: 'VMs and Blockchains'
    },
    'vms-and-blockchains-03-1': {
      url: '/course/avalanche-fundamentals/05-vms-and-blockchains/03-blockchains',
      chapter: 'VMs and Blockchains'
    },
    'vms-and-blockchains-03-2': {
      url: '/course/avalanche-fundamentals/05-vms-and-blockchains/03-blockchains',
      chapter: 'VMs and Blockchains'
    },
    'vms-and-blockchains-04': {
      url: '/course/avalanche-fundamentals/05-vms-and-blockchains/04-variety-of-vm',
      chapter: 'VMs and Blockchains'
    },
    'vm-customization-01': {
      url: '/course/avalanche-fundamentals/06-vm-customization/00-vm-customization',
      chapter: 'VM Customization'
    },
    'vm-customization-configuration-01': {
      url: '/course/avalanche-fundamentals/06-vm-customization/01-configuration',
      chapter: 'VM Customization'
    },
    'vm-customization-modification-01': {
      url: '/course/avalanche-fundamentals/06-vm-customization/02-modification',
      chapter: 'VM Customization'
    },
  },
};

export function getChapterUrlForQuiz(quizId: string): string {
  for (const course of Object.values(quizMapping)) {
    if (quizId in course) {
      return course[quizId].url;
    }
  }
  return '/';
}

export function getQuizzesForChapter(courseId: string, chapter: string): string[] {
  return Object.entries(quizMapping[courseId] || {})
    .filter(([_, quizInfo]) => quizInfo.chapter === chapter)
    .map(([quizId, _]) => quizId);
}

export function getAllQuizIds(courseId: string): string[] {
  return Object.keys(quizMapping[courseId] || {});
}

export function getChaptersForCourse(courseId: string): string[] {
  const chapters = new Set<string>();
  Object.values(quizMapping[courseId] || {}).forEach(quizInfo => {
    chapters.add(quizInfo.chapter);
  });
  return Array.from(chapters);
}