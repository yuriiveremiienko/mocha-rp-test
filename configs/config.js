require('babel-register');
'use strict';

const rmdir = require('rmdir');

exports.config = {
	mochaOpts: {
		reporter: 'mocha-multi-reporters',
		reporterOptions: {
			reporterEnabled: 'list,mocha-rp-reporter',
			reporterOptions: {
				configOptions: {
					endpoint: 'https://rp.epam.com/api/v1',
					password: '', // TODO: fill in token (from email)
					launch: '[LAUNCH NAME]#####',
					project: 'WKNL-TWF'
				}
			}
		}
	},
	framework: 'mocha',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true, // This settings makes report Portal to create multiple launches for one test run
        maxInstances: 1
    },
    specs: [ '../tests/*.spec.js' ], // there are 2 specs in the folder so 2 launches will be added into RP (need 1 launch)
	baseUrl: 'https://www.booking.com/',

    directConnect: true,
    allScriptsTimeout: 300000,
    SELENIUM_PROMISE_MANAGER: false,

    beforeLaunch() {
        rmdir('./allure-results');
        rmdir('./allure-report');

        // TODO: function call that creates new launch
    },

    async onPrepare() {
		await browser.manage().timeouts().implicitlyWait(5000);
    },

	afterLaunch() {
		// TODO: function call that finishes launch
	}
};