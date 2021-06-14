const peakFinder = require('./peakFinder');

const mode = (process.argv[2] ||'').toLowerCase();

const fail = () => process.exit(1);
const assertEqual = (actual, expected, name) =>
	{
		if (expected === actual) {
			console.log('Passed: ' + name);
			return;
		}

		console.warn('Failed: ' + name);
		console.warn('Expected ' + actual + ' to equal ' + expected + '\n');

		if (mode !== 'warn') fail();
}

assertEqual(1, 2, 'a');
assertEqual(1, 1, 'b');

console.log('Test complete');