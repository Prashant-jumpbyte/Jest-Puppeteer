module.exports = {
	globalSetup: './e2e/setup.js',
	globalTeardown: './e2e/teardown.js',
	testEnvironment: './e2e/test-environment.js',

	// testMatch: ['**/e2e/**/login.spec.js', '**/e2e/**/shipment-batch.spec.js'],
	testMatch: [
		// '**/e2e/**/itemhold-verify-hold.spec.js'
		// '**/e2e/**/itemhold-release-item.spec.js'
		'**/e2e/**/*.spec.js'
	],
	reporters:
		["default",
			["jest-html-reporter", {
				"pageTitle": "Test Suite Report",
				"outputPath": "./results/test-report.html",
				"includeFailureMsg": true,
				"includeConsoleLog": true,
				"sort": "titleAsc",
				"theme": "darkTheme"
			}], ["jest-junit", {
				"classNameTemplate": "e2e",
				"titleTemplate": "{classname} {title}",
				"suiteName": "jest tests",
				"outputDirectory": ".",
				"outputName": "./results/junit.xml",
				"ancestorSeparator": " › ",
				"usePathForSuiteName": "true"
			}], ["jest-allure", {
				"outputDirectory": "./results/",
				"resultDir": "./results/allure-results/",
			}], ["jest-stare", {
				"outputDirectory": "./results/",
				"resultDir": "./results/jest-stare/",
				"resultJson": "./results/jest-stare/jest-results.json",
				"resultHtml": "./results/jest-stare/jest-results.html",
				"log": true,
				"jestStareConfigJson": "./results/jest-stare/",
				"jestGlobalConfigJson": "./results/jest-stare/",
				"report": "./results/jest-stare/report/",
				"additionalResultsProcessors": "./results/jest-stare/",
				"coverageLink": "./results/jest-stare/coverageLink"
			}]
		]
};
