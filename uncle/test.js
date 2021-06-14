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

// Create large arrays full of zeroes an also subsequences inserted at particular positions
const getBigArray = (size, subSequences =[]) => {
	const a = [];
	for (let i = 0; i < size; i++) {
		let subSeq = subSequences.find(({start, contents}) => i >= start && i < start + contents.length);
		let val = subSeq ? subSeq.contents[i - subSeq.start] : 0; 

		// if (val) console.log('Inserting ' + val + ' at position ' + i);
		a.push(val);
	}

	return a;
}

let twoPeaks = [
	{
		start: 5,
		contents: [1,2,3,4,5,6,5,4]
	},
	{
		start: 600,
		contents: [1,2,3,4,5,6,5,4]
	
	}
]

const a = getBigArray(1000, twoPeaks);

assertEqual(peakFinder(a), 10, 'Big 1');

assertEqual(peakFinder(
		getBigArray(100000000, [
	{
		start: 5,
		contents: [1,2,3,4,5,6,5,4]
	},
	{
		start: 600,
		contents: [1,2,3,4,5,6,5,4,3,2,1]
	
	}
])
	), 13, 'Big 2');


assertEqual(peakFinder(getBigArray(10)), 0, 'Big 3');


assertEqual(peakFinder([]), 0, 'Empty');


assertEqual(peakFinder([1,2,3,2,1]), 5, 'Simple 1');
assertEqual(peakFinder([1,2,3,2,1,2,1]), 5, 'Simple 2');
assertEqual(peakFinder([1,2,1]), 3, 'Simple 3');


console.log('Test complete');