# Huelgo-Monad

## Desc

- No More Variables !!
- No More Try-Catch !!
- No More side effect !!

## Install

```
npm i huelgo-monad
```

## Array

- 여러자료구조를 이용하여 FP를 구성합니다.

> mergeFamily

```ts
/**
 * @desc 가족은 항상 붙어있어야 해 (이주영 55세)
 */
export function mergeFamily<A, B, C, D, E, F, G, H>(
  a: A[],
  b: B[],
  c?: C[],
  d?: D[],
  e?: E[],
  f?: F[],
  g?: G[],
  h?: H[]
): (A | B | C | D | E | F | G | H)[] {
  let list: (A | B | C | D | E | F | G | H)[] = []
  for (const v of [a, b, c, d, e, f, g, h]) {
    if (v) {
      list = [...list, ...v]
    }
  }

  return list
}

interface SpreadFnParms<T> {
  fn: (v: T) => boolean
  idx: number
}
```

> spreadFamily

```ts
/**
 * @desc 가끔은 가족끼리 떨어져있을 시간도 필요하죠 (이동규 30세)
 */
export function spreadFamily<T>(lists: T[], ...spreadFns: SpreadFnParms<T>[]): T[][] {
  let list: T[][] = new Array(spreadFns.length).fill(undefined).map(() => [])

  for (const v of lists) {
    for (const { fn, idx } of spreadFns) {
      if (fn(v)) {
        list[idx].push(v)
      }
    }
  }

  return list
}
```

## Pipe

- 여러 연결작업 및 FP를 활용하여 Monad를 구성합니다.

> go

```ts
/**
 * @desc 앞으로 당당히 걸어가자
 * @param {initParam} initParam 초기값
 * @param {...fns} ...fns 조건 함수 들
 */
export const go = <T>(initParam: T, ...fns): T => {
  for (const fn of fns) initParam = fn(initParam)
  return initParam
}
```

> asyncGo

```ts
/**
 * @desc 힘들지만 앞으로 당당히 걸어가자
 * @param {initParams} initParams 초기값
 * @param {...fns} ...fns 조건 함수 들
 */
export const asyncGo = async <T>(initParams: T, ...promiseFns): Promise<GoReturnParmas<string, T>> => {
  try {
    for (const promiseFn of promiseFns) initParams = await promiseFn(initParams)
    return {
      isOk: true,
      value: initParams,
    }
  } catch (e) {
    return {
      isOk: false,
      value: e,
    }
  }
}
```

> mixedGo

```ts
/**
 * @desc 복잡하지만 앞으로 당당히 걸어가자
 * @param {initParams} initParams 초기값
 * @param {...fns} ...fns 조건 함수 들
 */
export const mixedGo = async <T>(initParams: T, ...funcs): Promise<GoReturnParmas<string, T>> => {
  try {
    for (const func of funcs) {
      if (isPromise(func)) {
        initParams = await func(initParams)
        continue
      }

      initParams = func(initParams)
    }

    return {
      isOk: true,
      value: initParams,
    }
  } catch (e) {
    return {
      isOk: false,
      value: e,
    }
  }
}
```

> conditionGo

```ts
/**
 * @desc 조건을 이겨내보자
 * @param {initParam} initParam 초깃값
 * @param {isCondition} isCondition 조건값
 * @param {conditions} conditions 조건함수들
 */
export function conditionGo<E, T>(initParam: T, isCondition: boolean, ...conditions: ConditionParmas<E, T>[]): GoReturnParmas<E, T> {
  for (const { func, error } of conditions) {
    if (isCondition !== func(initParam)) {
      return {
        isOk: false,
        error,
      }
    }
  }

  return {
    isOk: true,
  }
}
```

> conditionMixedGo

```ts
/**
 * @desc 힘든조건도 이겨내보자
 * @param {initParams} initParams 초깃값
 * @param {isCondition} isCondition 조건값
 * @param {condition} condition 조건함수들
 */
export async function conditionMixedGo<E, T>(
  initParams: T,
  isCondition: boolean,
  ...condition: ConditionParmas<E, T>[]
): Promise<GoReturnParmas<E, T>> {
  try {
    for (const { func, error } of condition) {
      // promise
      if (isPromise(func)) {
        if (isCondition !== (await func(initParams))) {
          return {
            isOk: false,
            error,
          }
        }
      }

      if (isCondition !== func(initParams)) {
        return {
          isOk: false,
          error,
        }
      }
    }

    return {
      isOk: true,
    }
  } catch (e) {
    return {
      isOk: false,
      error: e,
    }
  }
}
```

## Inspect

> fallThrough

```ts
/**
 * @desc 모든 함수들의대해서 검증한 후 결과값을 리턴합니다.
 * @returns {failReasons} 실패 이유들
 * @returns {totalCount} 전체 시도 함수 개수
 * @returns {successCount} 성공 함수 개수
 * @returns {failCount} 실패 함수 개수
 */
export function fallThrough<A, E>(
  { value, failBox, isErrorCond }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E,
  fn4?: (value: A) => E,
  fn5?: (value: A) => E,
  fn6?: (value: A) => E,
  fn7?: (value: A) => E,
  fn8?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number } {
  let [totalCount, successCount, failCount] = [0, 0, 0]

  for (const fn of [fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8].filter((it) => it)) {
    ++totalCount
    const result = fn(value)

    if (isErrorCond(result)) {
      failCount++
      failBox.push(result)
      continue
    }

    successCount++
  }

  return {
    failReasons: failBox,
    failCount,
    successCount,
    totalCount,
  }
}
```

> breakThrough

```ts
export function breakThrough<A, E>(
  { value, isErrorCond }: breakThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E,
  fn4?: (value: A) => E,
  fn5?: (value: A) => E,
  fn6?: (value: A) => E,
  fn7?: (value: A) => E,
  fn8?: (value: A) => E
): { failReason: E; totalCount: number; failIndex: number } {
  let [totalCount, failIndex] = [0, 0]
  const fns = [fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8].filter((it) => it)
  totalCount = fns.length

  for (const fn of fns) {
    failIndex++
    const result = fn(value)
    if (isErrorCond(result)) {
      return {
        failReason: result,
        totalCount,
        failIndex,
      }
    }
  }

  return {
    failReason: null,
    totalCount,
    failIndex: null,
  }
}
```

## Flow

> flow

```ts
export function flow<T, K>(p: T, ...fns: ((p: T) => any)[]): K {
  return fns.reduce((acc, fn) => fn(acc), p) as K
}
```

> asyncFlow

- Todo

> mixedFlow

- Todo

## Visual

> visualIF

```ts
/**
 * @desc 기존 if문의 대해서 가독성 높은 코드로 visualization한 함수입니다.
 * @params {isParallel} isParallel 다른 구문도 통과시킬건지 여부
 */
export function visualIF<T>(
  isParallel: boolean,
  v: T,
  a: conditionIfParams<T>,
  b?: conditionIfParams<T>,
  c?: conditionIfParams<T>,
  d?: conditionIfParams<T>,
  e?: conditionIfParams<T>,
  f?: conditionIfParams<T>,
  g?: conditionIfParams<T>
): { result: T; correct: boolean; correctCount: number } {
  let [correct, correctCount] = [false, 0]
  for (const { isProfit, executeFn } of [a, b, c, d, e, f, g].filter((it) => it)) {
    if (isProfit(v)) {
      correct = true
      correctCount++

      v = executeFn(v)

      if (!isParallel)
        return {
          result: v,
          correct,
          correctCount,
        }
    }
  }

  return {
    result: v,
    correct,
    correctCount,
  }
}
```

## Type

- FP를 사용할때 필요한 타입을 정의합니다.

> Option

```ts
/**
 * @desc 성공이냐? 실패냐? 그것이 문제로다
 * @type {Some<T>} 성공
 * @type {None} 실패
 */
export type Option<T> = Some<T> | None
```

> Try

```ts
/**
 * @desc 왜 실패했니? 중요한건 과정이야
 * @type {Pass<T>} 성공
 * @type {Fail<E>} 실패
 */
export type Try<E, T> = Pass<T> | Fail<E>
```
