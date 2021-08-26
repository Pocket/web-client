import { useTranslation } from 'next-i18next'

export const headingsEnglishPlainText = {
  business: 'Business',
  career: 'Career',
  education: 'Education & History',
  food: 'Food',
  gaming: 'Gaming',
  health:'Health & Fitness',
  parenting: 'Parenting & Relationships',
  'personal-finance': 'Personal Finance',
  politics: 'Politics & Law',
  science: 'Science',
  'self-improvement': 'Self Improvement',
  sports: 'Sports',
  technology: 'Technology',
  travel: 'Travel & Exploration'
}

export const TopicHeadings = ({ topic, type = 'title' }) => {
  const { t } = useTranslation()

  const headings = {
    business: {
      title: t('topic:title-business', 'Business'),
      subtitle: t('topic:subtitle-business', 'Wall Street, market trends, economy, and the media.')
    },
    career: {
      title: t('topic:title-career', 'Career'),
      subtitle: t('topic:subtitle-career', 'Productivity tips, professional development, and the future of work.')
    },
    education: {
      title: t('topic:title-education', 'Education & History'),
      subtitle: t('topic:subtitle-education', 'Academia, schools, and lifelong learning.')
    },
    entertainment: {
      title: t('topic:title-entertainment', 'Entertainment'),
      subtitle: t('topic:subtitle-entertainment', 'Movies, music, books, TV, art, and design.')
    },
    food: {
      title: t('topic:title-food', 'Food'),
      subtitle: t('topic:subtitle-food', 'Time-tested recipes, kitchen tips, and why we eat the way we do.')
    },
    gaming: {
      title: t('topic:title-gaming', 'Gaming'),
      subtitle: t('topic:subtitle-gaming', 'Video games, board games, and the players who play them.')
    },
    health: {
      title: t('topic:title-health', 'Health & Fitness'),
      subtitle: t('topic:subtitle-health', 'Wellness, exercise, and self-care.')
    },
    parenting: {
      title: t('topic:title-parenting', 'Parenting & Relationships'),
      subtitle: t('topic:subtitle-parenting', 'Family guidance, advice, and personal stories.')
    },
    'personal-finance': {
      title: t('topic:title-personal-finance', 'Personal Finance'),
      subtitle: t('topic:subtitle-personal-finance', 'Saving, spending, and retirement planning.')
    },
    politics: {
      title: t('topic:title-politics', 'Politics & Law'),
      subtitle: t('topic:subtitle-politics', 'Policy, government, and important debates.')
    },
    science: {
      title: t('topic:title-science', 'Science'),
      subtitle: t('topic:subtitle-science', 'Exploring nature, the cosmos, and the human body.')
    },
    'self-improvement': {
      title: t('topic:title-self-improvement', 'Self Improvement'),
      subtitle: t('topic:subtitle-self-improvement', 'Smarter living, better habits, and lasting happiness.')
    },
    sports: {
      title: t('topic:title-sports', 'Sports'),
      subtitle: t('topic:subtitle-sports', 'Slam dunks, corner goals, home runs, touchdowns and more.')
    },
    technology: {
      title: t('topic:title-technology', 'Technology'),
      subtitle: t('topic:subtitle-technology', 'Gadgets, the internet, and digital life.')
    },
    travel: {
      title: t('topic:title-travel', 'Travel & Exploration'),
      subtitle: t('topic:subtitle-travel', 'What to pack and where to go.')
    }
  }

  return <>{headings[topic][type]}</>
}
