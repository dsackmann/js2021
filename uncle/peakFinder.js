

const _notNil = (v) => v !== null && v !== undefined;  
/*
Params: 
	Array<Integer> searchSpace 
	Integer startingIdx=0
	Integer longestKnownPeak=0
*/
function peakFinder(searchSpace, startingIdx = 0, longestKnownPeak = 0) {

	let i = startingIdx;
	let candidateLength = 0;
	let step1 = searchSpace[i];
	let step2 = searchSpace[i + 1];

	while (_notNil(step1) && _notNil(step2) && step2 > step1) {
		// we're on an upslope. 
		candidateLength++;
		step1 = step2;
		step2 = searchSpace[++i];
	}
	// We've hit a peak, or the end of the list

	if (!_notNil(step2)) {
		// case where we were on an upslope, but encountered the end of the list before a downslope began. 
		// This does not count as a peak, so return 0 instead of the candidateLength
		return 0;
	}

	while (_notNil(step1) && _notNil(step2) && step2 < step1) {
		// we're on an downslope.
		candidateLength++; 
		step1 = step2;
		step2 = searchSpace[++i];
	}

	return Math.max(peakFinder(searchSpace, i, candidateLength), candidateLength);
}

module.exports = peakFinder;