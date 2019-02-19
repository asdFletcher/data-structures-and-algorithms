# Quicksort

# Efficiency:

Time:
O ( n log(n) )

Space: 
O ( n log(n) )

Where n is the number of elements to sort

This is because:
Quicksort divides the list of elements to sort by a percenage of the total, rather than a constant. This gives us a callstack of O(log(n)). And since for each callstack we need to process all elements , O(n) , and we do an O(n) opereration O(n log(n)) times, it's n * log(n) , which gives O( nlog(n) ).


