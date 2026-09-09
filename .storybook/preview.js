import '../stories/aimy-storybook.css';

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true },
  backgrounds: {
    default: 'AiMY dark',
    values: [
      { name: 'AiMY dark', value: '#0f1215' },
      { name: 'AiMY light', value: '#eef2f6' }
    ]
  }
};
