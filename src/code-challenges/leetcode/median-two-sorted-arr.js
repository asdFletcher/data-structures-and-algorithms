/* There are two sorted arrays nums1 and nums2 of size m and n respectively.
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
You may assume nums1 and nums2 cannot be both empty.

nums1 = [1, 3], nums2 = [2], The median is 2.0

nums1 = [1, 2], nums2 = [3, 4], The median is (2 + 3)/2 = 2.5 */

const findMedianSortedArrays = function(numsA, numsB) {
  // if no overlap
  let minA = numsA[0];
  let minB = numsB[0];
  let maxA = numsA[numsA.length - 1];
  let maxB = numsB[numsB.length - 1];
  
  if (minA > maxB || minB > maxA) {
    // if same size
    if (numsA.length === numsB.length) {
      // median is value is average of max lower and min upper
      let average;
      if (minA > maxB) { average = (minA + maxB) / 2; }
      if (minB > maxA) { average = (minB + maxA) / 2; }
      return average;
    } else {
      // if diff size
      lengthTotal = numsA.length + numsB.length;
      if (lengthTotal % 2 === 0) {
        // if even length total, median value = average of (L1 + L2)/2 and (L1 + L2)/2 + 1
        
      } else {
        // if odd length total, median element = floor(L1 + L2) + 1

      }
    }
  }

  // if overlap
  // get total number of elements, identify target index
  // find median element in A
  // find corresponding index in B
  // identify how many elements below, and above
    // if more elements below, find middle element in left half of A
    // if more elements above, find middle element in right half of A
    // find corresponding index in B
    // repeat until there's an equal number of elements above and below (if target is odd)
    // or _(off by 1?_ if it's even

};



