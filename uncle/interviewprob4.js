
const isNil = (v) => v === null || v === undefined 


function stripDelimiter(str) {
	let lastIdx = str.lastIndexOf('-');
	return str.substring(0, lastIdx);
}
//Returns the part of the string before the delimiter
function parseVal(str) {
	if (isNil(str)) return;

	let lastIdx = str.lastIndexOf('-');

	let countStr = str.substring(lastIdx + 1);

	let count;



	try {
		count = parseInt(countStr)
	} catch (e) {
		count = 0;
	}
	return {
		value: str.substring(0, lastIdx),
		count
	};
}

function weirdAppender(arrayOfStrings = [], newValue) {

	let count = 0;
	arrayOfStrings.map(parseVal).forEach((next) => {		
		console.log(next);
		if (next.value === newValue) {
			count = Math.max(count, next.count)
		}
	});


	arrayOfStrings.push(newValue + `-${count + 1}`);

	return arrayOfStrings;
}


const test = ((array, newVal, expectedAddition) => {

	let r = weirdAppender(array, newVal);

	let addedStr = r.pop();
	console.log('Testing ' + addedStr);
	if (addedStr !== expectedAddition) {
		console.error('Fail. Expected ' + addedStr + ' to equal ' + expectedAddition);
	} else {
		console.log('Passed');
	}


})


test(['Test-1','Test-2', 'Test-3'], 'Test-4')