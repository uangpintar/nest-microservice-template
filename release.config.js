module.exports = {
  branches: 'master',
  repositoryUrl: 'https://github.com/michaelanggriawan/nestjs-microservices',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
  ],
};
