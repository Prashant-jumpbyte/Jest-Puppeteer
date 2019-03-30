module.exports = {
	globalSetup: './tests/setup.js',
	globalTeardown: './tests/teardown.js',
	testEnvironment: './tests/test-environment.js',
	
	// testMatch: ['**/tests/**/login.spec.js', '**/tests/**/shipment-batch.spec.js', '**/tests/**/logout.spec.js'],
	testMatch: ['**/tests/**/shipment-batch.spec.js'],
	reporters: ["default",
		[
			"jest-junit", {
				"classNameTemplate": "e2e",
				"titleTemplate": "{classname} {title}",
				"suiteName": "jest tests",
				"outputDirectory": ".",
				"outputName": "./results/junit.xml",
				"ancestorSeparator": " › ",
				"usePathForSuiteName": "true"
			}
		]
	],
};