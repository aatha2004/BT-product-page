module.exports = {
    preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|scss|sass)$': 'identity-obj-proxy',
        '^src/app/(.*)$': '<rootDir>/src/app/$1'
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': [
            '@swc/jest',
            {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true
                    },
                    transform: {
                        react: {
                            runtime: 'automatic'
                        }
                    }
                }
            }
        ]
    },
    transformIgnorePatterns: [
        '/node_modules/'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        '/out/'
    ]
};
