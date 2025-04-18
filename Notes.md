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



리액트에서의 배열 사용
리액트에서는 상태를 관리할 때 불변성을 유지하는 것이 중요


1. 배열을 직접 수정하는 메서드 (원본 배열 변경)
    - splice(): 배열의 특정 위치에서 요소를 추가하거나 제거. 
    - fill(): 배열의 모든 요소를 정해진 값으로 채움.
    - reverse(): 배열의 요소 순서를 반전시킴. 
    - sort(): 배열의 요소를 정렬함. 
2. 배열을 새롭게 만들어내는 메서드 (원본 배열 변경되지 않음)
    -  map(): 각 요소에 대해 주어진 함수를 호출하고, 새로운 배열을 반환.
    -  filter(): 주어진 조건을 만족하는 요소로 구성된 새로운 배열을 반환.
    - reduce(): 각 요소에 대해 주어진 함수를 실행하여 단일 값을 반환.
    - flat(): 다차원 배열을 평탄화하여 새로운 배열을 반환.
    - find(): 주어진 조건을 만족하는 첫 번째 요소를 반환.
    - findIndex(): 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환.


컴포넌트를 분리하면 재사용성과 가독성이 높아지고, 유지보수와 협업이 쉬워진다
코드가 길어질 것 싶으면 컴포넌트를 분리하는 것이 좋음


<br/>

### 🔄 리액트 컴포넌트 렌더링이 발생하는 조건

렌더링은 다음 세 가지 중 하나가 변경될 때 발생한다

1. **state 변경**
2. **props 변경**
3. **부모 컴포넌트 리렌더링 시 자식 컴포넌트도 리렌더링**

렌더링이 발생하면 **컴포넌트가 다시 그려지며 "반짝임" 현상**이 생길 수 있다

불필요한 컴포넌트까지 렌더링되면 **성능 저하**로 이어질 수 있기 때문에 주의가 필요하다

### ⚠️ 렌더링 최적화 필요성

- 변화가 없는 상태에서도 `setState()`를 호출하면 렌더링이 발생한다

```
    onClickBtn = () => {
        this.setState({}); //실제 데이터 변화 없이도 렌더링 발생
    }
```

### 방법 1 ✅ `shouldComponentUpdate`로 렌더링 제어하기

리액트 클래스 컴포넌트에서 `shouldComponentUpdate()` 메서드를 오버라이드하면

렌더링 여부를 개발자가 직접 결정할 수 있다

```
    shouldComponentUpdate(nextprops, nextState, nextContext){
        //this.state.counter 현재 카운터 nextState.counter 미래 바뀌는 카운터
        if(this.state.counter !== nextState.counter){
            return true; // 상태가 바뀌었으므로 렌더링
        }
        return false; // 상태 변화 없으므로 렌더링 하지 않음
    }
```

### 방법 2 ✅ `PureComponent`

- `PureComponent`는 `shouldComponentUpdate` 메서드를 자동으로 구현해주는 컴포넌트입니다.
- 내부적으로 `props`와 `state`의 얕은 비교(shallow comparison)를 통해 리렌더링 여부를 판단합니다.

```
shouldComponentUpdate(nextProps, nextState, nextContext) {
    // 얕은 비교를 통해 true 또는 false 반환
}
```

### 장점

- 성능 최적화에 유리 (불필요한 리렌더링 방지)

### 단점

- 객체나 배열처럼 참조형 데이터가 있을 경우, 내부 내용이 바뀌었더라도 참조가 같으면 변경을 감지하지 못함
- 복잡한 구조의 상태 관리에는 적합하지 않을 수 있음

*class에서는 `PureComponent`*

*함수 컴포넌트에서는 `memo`*

---

### ⚠️ 자식 컴포넌트에서 props를 바꾸면 안 되는 이유

React에서는 **props는 읽기 전용(read-only)** 

자식 컴포넌트가 props를 직접 변경하면 **React의 데이터 흐름 원칙에 위배**된다

### ✅ props를 바꿔야 할 때 올바른 방법

1. **props를 state로 복사해서 사용한다**
    - 자식 컴포넌트 내에서 변경이 필요한 경우, props 값을 state로 받아서 관리한다.
2. **부모 컴포넌트에서 상태를 관리하고, 변경 함수를 자식에게 전달한다**
    - 자식은 해당 함수를 호출하여 상태 변경을 요청하고, 부모가 상태를 변경하면 props가 갱신된다.

### 💡 핵심 정리

- props는 **부모 → 자식** 방향의 데이터 흐름을 유지해야 한다
- 자식은 props를 **직접 수정하지 말고**, 필요 시 **state로 관리**하거나 **부모에게 변경 요청**해야 한다

## React에서 상태(state)를 관리하는 여러 도구들이 있고, 각각의 특징과 사용 목적이 있다

### 1. Context API

- **용도**: 컴포넌트 트리의 깊은 곳까지 데이터를 전달할 때 사용해.
- **문제점**: Context로 전달된 값이 변경되면, 해당 Context를 사용하는 모든 하위 컴포넌트가 리렌더링돼. 이로 인해 불필요한 렌더링이 발생할 수 있어.

---

### 2. Redux

- **용도**: 애플리케이션의 전역 상태를 관리할 때 사용해.
- **특징**: 상태를 예측 가능하게 관리할 수 있고, 미들웨어를 통해 비동기 작업도 처리할 수 있어.
- **단점**: 설정이 복잡하고, 보일러플레이트 코드가 많아질 수 있어.

---

### 3. Zustand

- **용도**: 간단하고 가벼운 상태 관리가 필요할 때 사용해.
- **특징**:
    - **불필요한 리렌더링 방지**: Context와 달리, 상태 변경 시 관련된 컴포넌트만 리렌더링돼.
    - **간단한 사용법**: 설정이 간단하고, 코드가 직관적이야.
    - **React 의존성 없음**: React 외의 환경에서도 사용할 수 있어.

---

### 정리

- **Context API**: 간단한 전역 데이터 전달에 적합하지만, 리렌더링 이슈가 있을 수 있음
- **Redux**: 복잡한 상태 관리와 예측 가능한 상태 흐름이 필요할 때 사용함
- **Zustand**: 간단하고 가벼운 상태 관리에 적합하며, 불필요한 리렌더링을 방지할 수 있음

---

##### for문과 if문은 JSX 안에서는 사용할 수 없다
> JSX는 JavaScript의 확장 문법으로, HTML과 유사하지만 내부적으로 JavaScript 코드로 변환된다

> JSX 안에서는 **표현식(expression)**만 사용할 수 있기 때문에, 일반적인 for, if문 같은 문(statement) 은 사용할 수 없고 아래와 같은 방식으로 대체해야 한다

1. for문 → map() 메서드 사용
2. if문 → 삼항 연산자(조건 ? 참 : 거짓) 사용