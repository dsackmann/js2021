

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
	// We've hit a peak, a plateau, or the end of the list

	if (_isNil(step2)) {
		// case where we were on an upslope, but encountered the end of the list before a downslope began. 
		// This does not count as a peak, so return 0 instead of the candidateLength
		return 0;
	}

	if (step2 === step1) {		
		// Case where there's a plateau at the peak. Increment the starting index and search the rest of the array and discard this sequence as a candidate
		return peakFinder(searchSpace, i + 1);
	}



	while (step2 < step1) {
		// we're on an downslope.		

		candidateLength++; 
		step1 = searchSpace[i++];
		step2 = searchSpace[i];
	}


	return Math.max(peakFinder(searchSpace, i), candidateLength);
}

module.exports = peakFinder;