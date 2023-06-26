export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    // inlineStories: false,
  },
  options: {
    storySort: {
      method: '',
      order: [
        'Getting Started',
        [
          'Introduction',
          'Installation',
          'Architecture',
          'Defining a Bolt Project',
          'Defining a Bolt Service',
          'ENV Management',
        ],
        'Terminologies',
        [
          'Bolt CLI',
          'Bolt Project',
          'Bolt Project Runner',
          'Bolt Service',
          'Bolt Service Runner',
        ],
        'CLI Reference',
        [
          'init',
          'project:list',
          'env:generate',
          'up',
          'down',
          'log',
          'service:add',
          'service:list',
          'service:up',
          'service:down',
          'route:generate',
          'route:list',
          'exec',
          'deploy',
          'deploy:watch',
        ],
      ],
    },
  },
};
