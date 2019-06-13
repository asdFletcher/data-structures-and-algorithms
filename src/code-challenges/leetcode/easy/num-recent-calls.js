/*
Write a class RecentCounter to count recent requests.

It has only one method: ping(int t), where t represents some time in milliseconds.

Return the number of pings that have been made from 3000 milliseconds ago until now.

Any ping with time in [t - 3000, t] will count, including the current ping.

It is guaranteed that every call to ping uses a strictly larger value of t than before.

Input: inputs = ["RecentCounter","ping","ping","ping","ping"], inputs = [[],[1],[100],[3001],[3002]]
Output: [null,1,2,3,3]

Note:
Each test case will have at most 10000 calls to ping.
Each test case will call ping with strictly increasing values of t.
Each call to ping will have 1 <= t <= 10^9.
*/

class RecentCounter {
  constructor() {
    this.history = [];
  }

  ping(time) {
    let history = this.history;
    let now = time;
    history.unshift(now); // enqueue
    while (true) {
      let end = history.length - 1;
      if (history[end] < now - 3000) {
        history.pop(); // dequeue
      } else {
        break;
      }
    }

    return history.length;
  }
}


a = new RecentCounter();
a.ping(50);
console.log(a.ping(2000));
console.log(a.ping(2300));
console.log(a.ping(2400));
console.log(a.ping(3300));

/** 
 * @param {number} t
 * @return {number}
 */
// RecentCounter.prototype.ping = function(t) {
    
// };
// var RecentCounter = function() {
    
// };

/** 
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

