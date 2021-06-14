

const _notNil = (v) => v !== null && v !== undefined;  

const _isNil = (v) => v === null || v === undefined;  


const _getNextUpslopeIdx = (searchSpace, startingIdx) => {
	let i = startingIdx;
	let step1 = searchSpace[i];
	let step2 = searchSpace[i+1];
	while (_notNil(step1) && step1 >= step2) {
		i++;
		step1 = searchSpace[i];
		step2 = searchSpace[i+1]
	}
	return i;
}
/*
Params: 
	Array<Integer> searchSpace 
	Integer startingIdx=0
*/
function peakFinder(searchSpace, startingIdx = 0) {

	let i = _getNextUpslopeIdx(searchSpace, startingIdx);
	let candidateLength = 0;
	let step1 = searchSpace[i];
	let step2 = searchSpace[i + 1];

	if (_isNil(step1) || _isNil(step2)) {
		return candidateLength;
	}


	while (step2 > step1) {
		// we're on an upslope. 
		candidateLength++;
		step1 = searchSpace[i++];
		step2 = searchSpace[i];
	}

	if (_isNil(step2)) {
		// We've reached the end of the list
		// This does not count as a peak, so return 0 as the value for this subsequence
		return 0;
	}

	if (step2 === step1) {		
		// The sequence contained a plateau. Search the rest of the sequence with the plateau as the new starting point
		return peakFinder(searchSpace, i);
	}



	while (step2 < step1) {
		// we're on an downslope.		

		candidateLength++; 
		step1 = searchSpace[i++];
		step2 = searchSpace[i];
	}


	// Reached the bottom of the hill. Return either the candidate value as determined by the size of the sequence we just iterated over OR
	// The longest peak in the remaining array, starting from the element immediately preceding the one that ended the slope
	// (Because that element can be both the end of one peaked sequence AND the start of a new one)
	return Math.max(peakFinder(searchSpace, i - 1), candidateLength);
}

module.exports = peakFinder;