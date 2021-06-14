const peakFinder = require('./peakFinder');

const mode = (process.argv[2] ||'').toLowerCase();

const fail = () => process.exit(1);
const assertEqual = (actual, expected, name) =>
	{
		if (expected === actual) {
			console.log('Passed: ' + name + '\n');
			return;
		}

		console.warn('Failed: ' + name);
		console.warn('Expected ' + actual + ' to equal ' + expected + '\n');

		if (mode !== 'warn') fail();
}

assertEqual(peakFinder([]), 0, 'Empty');


assertEqual(peakFinder([1,2,3,2,1]), 5, 'Simple 1');
assertEqual(peakFinder([1,2,3,2,1,2,1]), 5, 'Simple 2');
assertEqual(peakFinder([1,2,1]), 3, 'Simple 3');



console.log('Test complete');