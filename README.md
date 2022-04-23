중복순열 알고리즘

```jsx
function rockPaperScissors(rounds) {
  // TODO: 여기에 코드를 작성합니다.
  let rps = ["rock", "paper", "scissors"]
  rounds = rounds || 3
  let result = [];

  function recursive(count, arr, bucket) {
    if (count === 0) {
      result.push(bucket)
      return
    }

    for (let i = 0; i < arr.length; i++) {
      let pick = arr[i]
      recursive(count-1,arr,bucket.concat(pick))
    }
  }

  recursive(rounds, rps, [])
  return result
};
```