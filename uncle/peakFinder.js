

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
		console.log('Upslope ' + step1 + ' ' + step2);
		candidateLength++;
		step1 = searchSpace[i++];
		step2 = searchSpace[i];
	}
	// We've hit a peak, or the end of the list

	console.log('Peaked: ' + step1 + ' ' + step2)
	if (!_notNil(step2)) {
		// case where we were on an upslope, but encountered the end of the list before a downslope began. 
		// This does not count as a peak, so return 0 instead of the candidateLength
		console.log('Ended at a peak');
		return 0;
	}

	while (_notNil(step1) && _notNil(step2) && step2 < step1) {
		// we're on an downslope.		
		console.log('Downslope ' + step1 + ' ' + step2);

		candidateLength++; 
		step1 = searchSpace[i++];
		step2 = searchSpace[i];
	}

	console.log('Recursive call with values: ');
	console.log('startingIdx: ' + startingIdx);
	console.log('candidateLength: ' + candidateLength);

	return Math.max(peakFinder(searchSpace, i, candidateLength), candidateLength);
}

module.exports = peakFinder;