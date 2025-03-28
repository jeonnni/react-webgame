## 정리
##### 2025/03/25

### 화면 렌더링
> 리액트에서는 컴포넌트가 반환하는 JSX가 화면에 렌더링된다.
모든 UI 요소는 return 문 안에 포함되어야 하며, HTML 구조는 자바스크립트로 제어된다.

### 리액트의 데이터 중심 접근
> 리액트는 상태(state)를 기반으로 UI를 업데이트한다. (데이터 중심!)
화면에서 변경될 부분은 state로 관리해야 하며, 이를 통해 효율적으로 렌더링을 수행할 수 있다

### 객체 변경 주의 ❌ 불변성 
> 리액트에서는 `상태를 직접 수정하는 것이 아니라`, 상태를 업데이트하는 함수를 사용해야 한다

```
const [liked, setLiked] = useState(false);
setLiked(true); // 올바른 접근
this.state.liked = true; // 잘못된 접근
```

<br/>

리액트에서의 배열 사용
리액트에서는 상태를 관리할 때 불변성을 유지하는 것이 중요
<br/>

1. 배열을 직접 수정하는 메서드 (원본 배열 변경)
    - splice(): 배열의 특정 위치에서 요소를 추가하거나 제거. 
    - fill(): 배열의 모든 요소를 정해진 값으로 채움.
    - reverse(): 배열의 요소 순서를 반전시킴. 
    - sort(): 배열의 요소를 정렬함. 
1. 배열을 새롭게 만들어내는 메서드 (원본 배열 변경되지 않음)
    -  map(): 각 요소에 대해 주어진 함수를 호출하고, 새로운 배열을 반환.
    -  filter(): 주어진 조건을 만족하는 요소로 구성된 새로운 배열을 반환.
    - reduce(): 각 요소에 대해 주어진 함수를 실행하여 단일 값을 반환.
    - flat(): 다차원 배열을 평탄화하여 새로운 배열을 반환.
    - find(): 주어진 조건을 만족하는 첫 번째 요소를 반환.
    - findIndex(): 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환.

