# First repeated word
<!-- Short summary or background information -->

## Challenge
Feature Tasks
Write a function that accepts a lengthy string parameter.
Without utilizing any of the built-in library methods available to your language, return the first word to occur more than once in that provided string.

## Approach & Efficiency
Regex to remove punctuation. Split to separate words on word boundaries. Used a hashtable for constant-time lookup of previous words. And used a hashtable to insert new words, also in constant-time. N constant time operations yields a O(n) speed. And since we're storing each word once, we have O(n) space complexity, where n is the number of words. Since the funciton returns early, the average case will be better than O(n) space and better than O(n) time. 

## Solution
<!-- Embedded whiteboard image -->
