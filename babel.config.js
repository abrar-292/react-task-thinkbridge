module.exports = (api) => {
  api.cache(true);

  const config = {
    presets: [
      [
        'react-app',
        {
          flow: false,
          typescript: true,
        },
      ],
    ],
    sourceMaps: 'inline',
  };

  return config;
};
