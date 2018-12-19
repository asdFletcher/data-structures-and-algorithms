# Code Challenge 02 - Array Shift

## Author Fletcher LaRue

# Insert a value into an array and shift accordingly
As part of our whiteboarding and coding experience progression, we're solving this problem on the whiteboard.

## Challenge
Write a function called insertShiftArray which takes in an array and the value to be added. Without utilizing any of the built-in methods available to your language, return an array with the new value added at the middle index.

## Approach & Efficiency
Calculate the value of the middle element of the incoming array.

Loop over the given array, and copy each value into the new array.

When the middle index (based on calculated value) is reached, insert the provided value, and then continue inserting values into the array, adjusting for the shift in insertion index.

We used 3 if statements, one to check if the index is at the middle, one to check if the index is before the middle, and one to check if the index is after the middle.

If before, copy elements i:i from input to output array.
If middle, copy the input value into the array (index i).
If past middle, copy the elements i:i-1 into the output array.

Note that the inserted value goes into array index i-1, because we've added a value into the array. This is the shift.

Also note that the array loop stops at i <= length. The <= ensures that there will be one more iteration thru the array than 'normal'. This makes sure to capture the last element in the array.

This algorithm iterates over the array once, so will be O(n). It creates a copy of the input array, so memory useage will also be O(n).


## Solution
<!-- Embedded whiteboard image -->
![alt text](./assets/arrayShift.jpg "Whiteboard image")