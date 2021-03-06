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


assertEqual(peakFinder([1, 4, 10, 2]), 4, 'Example 1');
assertEqual(peakFinder([4, 0, 10]), 0, 'Example 2');
assertEqual(peakFinder([1,2,3]), 0, 'Example 3');
assertEqual(peakFinder([1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]), 6, 'Example 4');



assertEqual(peakFinder([]), 0, 'Empty');


assertEqual(peakFinder([1,2,3,2,1]), 5, 'Simple 1');
assertEqual(peakFinder([1,2,3,2,1,2,1]), 5, 'Simple 2');
assertEqual(peakFinder([1,2,1]), 3, 'Simple 3');
assertEqual(peakFinder([1,2]), 0, 'Simple 4');
assertEqual(peakFinder([0,0,0,0,0]), 0, 'Simple 5');



assertEqual(peakFinder([1,2,2,1]), 0, 'Tricky 1');
assertEqual(peakFinder([1,2,1]), 3, 'Tricky 2');
assertEqual(peakFinder([1,1,1,1]), 0, 'Tricky 3');
assertEqual(peakFinder([1,2,1,1]), 3, 'Tricky 4');
assertEqual(peakFinder([1,2,3,4]), 0, 'Tricky 5');
assertEqual(peakFinder([5,4,3,2,1]), 0, 'Tricky 6');
assertEqual(peakFinder([-11, 13, -11, 13]), 3, 'Tricky 7');
assertEqual(peakFinder([0,0,0,0,1]), 0, 'Tricky 8');
assertEqual(peakFinder([1,2,3,4,5,6,6,5,4,3,2,1,2,1]), 3, 'Tricky 9');
assertEqual(peakFinder([1,2,3,4,5,4,3,2,2,3,4,5,6,7,8,9,10,11,12,13,14,13]), 14, 'Tricky 10');
assertEqual(peakFinder([1,2,3,4,5,4,3,2,2,3,4,5,6,7,8,9,10,11,12,13,14]), 8, 'Tricky 11');
assertEqual(peakFinder([1,2,3,4,4,3,2,2,3,4,5,6,7,8,9,10,11,12,13,14]), 0, 'Tricky 12');
assertEqual(peakFinder([1,2,3,4,3,2,2,3,4,5,6,7,8,9,10,11,12,13,14]), 6, 'Tricky 13');

assertEqual(peakFinder([1,2,3,2,1,1,2,1,2,3,4,5,6,5,4,3,2,1,1,2,3,2,1]), 11, 'Tricky 14');


assertEqual(peakFinder([1,2,2,3,4,5,6,5,4,3,2,1]), 10, 'Tricky 15');




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



console.log('Test complete');