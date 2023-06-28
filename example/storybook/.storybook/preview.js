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
          'Terminologies',
          'Installing the Global CLI',
          'Your First Bolt Project',
          'Adding Bolt to an Existing Project',
          'ENV Management',
          'Service Management',
        ],
        'API Reference',
        [
          'bolt.yaml',
          'bolt.service.yaml',
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
      ],
    },
  },
};
