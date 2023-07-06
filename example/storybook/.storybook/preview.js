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
          'Add Bolt to Existing Project',
          'ENV Management',
          'Service Management',
        ],
        'Tutorials',
        [
          'Simple HTTP Server',
          'Next Postgres PGAdmin BoltIngress',
          'Expo App',
          'Laravel App',
          'Laravel Auth & MySQL',
        ],
        'API Reference',
        [
          'bolt.yaml',
          'bolt.service.yaml',
          'bolt ingress',
          'boltignore',
          'CLI Reference',
          [
            'project:list',
            'init',
            'project:info',
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
