# 중복순열

```jsx
let result = [];
let arr = [1, 2, 3]
for(let i = 0; i < arr.length; i++){
  for(let j = 0; j < arr.length; j++){
    for(let k = 0; k < arr.length; k++){
      result.push([arr[i], arr[j], arr[k]]);
    }
  }
}
console.log(result)
```
반복문만 사용해도 중복순열을 구할 수 있다. 근데 배열에 10개의 요소를 담고있고, 중복가능한 10자리 수를 만든다고 가정하면 10중 반복문을 써야할 것이다. 그래서 이것을 재귀로 만들어 준다면 좀 더 간결하게 만들어 줄 수 있을 뿐만 아니라, 배열과 자릿수가 동적으로 변하는 경우에도 중복순열을 구해낼 수 있을 것이다.

```jsx
let result = [];

//bucket은 조합을 담아낼 일회성 그릇이라고 생각하면 된다.
function multiPermutation(arr, n, bucket) {
  if(n === 0) { // 탈출조건
    result.push(bucket);
    return;
  }
  for(let i = 0; i < arr.length; i++){
    multiPermutation(arr, n - 1, bucket.concat(arr[i]))
  }
  return result;
}

multiPermutation([1,2,3], 3, []);
```

# 순열
```jsx
let result = [];
let arr = [1, 2, 3]
for(let i = 0; i < arr.length; i++){
  for(let j = 0; j < arr.length; j++){
    for(let k = 0; k < arr.length; k++){
      if(i === j || j ===k || k === i) continue;
      result.push([arr[i], arr[j], arr[k]]);
    }
  }
}
console.log(result)
```
순열은 중복이 되면 안되기에 i, j, k가 같을 때는 넘기고 진행을 시킨다. 그럼 중복되는 부분이 사라지게 될 것이다. 그럼 이것도 재귀로 다시 구현해보자.

```jsx
let result = [];
function permutation(arr, n, bucket){
  if(n === 0){
    result.push(bucket);
    return;
  }
  
  for(let i = 0; i < arr.length; i++){
    let rest = arr.slice();
    let pick = rest.splice(i, 1);
    permutation(rest, n - 1, bucket.concat(pick));
  }
  return result
}

permutation([1,2,3], 3, []);
```

다시 재귀에 넣어서 돌릴 배열을 rest라고 만들어 arr배열을 복사해주고, 거기서 한 요소를 고를 때 rest를 splice해줘서 그 배열에서 pick된 요소를 제거해준다. 그럼 재귀가 돌때 계속 선택된 요소는 빠진 상태인 배열이 인자로 들어가 중복되는 요소가 없는 조합을 만들어내게 된다.

# 조합

```jsx
let result = [];
let arr = [1,2,3];

for(let i = 0; i < arr.length; i++){
  for(let j = i + 1; j < arr.length; j++){
    result.push([arr[i], arr[j]])
  }
}
console.log(result);
```

위 코드의 반복문에서 j에 선언을 해준 것을 보면, i에서 사용된 것을 사용하지 않게 하기 위해서 j = i + 1을 해준 것이다. 그럼 이것도 재귀로 구현을 해보자.

```jsx
let result = [];
function combination(arr, n, bucket){
  if(n === 0){
    result.push(bucket);
    return;
  }
  
  for(let i = 0; i < arr.length; i++){
    let pick = arr[i];
    let rest = arr.slice(i + 1);
    combination(rest, n - 1, bucket.concat(pick));
  }
  return result;
}

combination([1,2,3], 2, []);
```
조합은 순열과는 다르게 순서가 달라고 같은것이라고 취급하기 때문에 pick된 것만 빼내는것 뿐만 아니라 한번 빼내면 다시 넣지 않아야 한다. 그래서 rest배열을 하나씩 줄여나가 주는 것이다.