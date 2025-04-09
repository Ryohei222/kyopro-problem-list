## AOJ

API document: http://developers.u-aizu.ac.jp/index

### Submission

- 1 回のリクエストで取得できる。
- page と size を上手く指定するとキャッシュが効くが、全体的にユーザーの提出が多くないのでそこまでしなくてもいいかも

## AtCoder (AtCoder Problems)

API document: https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md

### Submission

- 1 回のリクエストで取得できるのは 500 件まで
- [AtCoder Problems のフロントエンドのコード](https://github.com/kenkoooo/AtCoderProblems/blob/master/atcoder-problems-frontend/src/database/SubmissionsDB.ts)に Indexed DB を使った取得 + キャッシュの例がある。
    - キャッシュ済みのデータがある場合、`from_second` を `キャッシュ済みの submission の epoch_second - 適当な定数` として新しい submission を取得する

## Codeforces

API document: https://codeforces.com/apiHelp

### Submission

```
https://codeforces.com/api/user.status?handle={handle}&from={from}&count={count}
```

- 1 回のリクエストで取得できる
- from と count を指定していい感じにした方がよさそう
- 2 秒間隔でリクエストを送る必要がある

## yukicoder

API document: https://petstore.swagger.io/?url=https://yukicoder.me/api/swagger.yaml#/user/get_v1_solved__param___user_

### Submission

```
https://codeforces.com/api/user.status?handle={handle}&from={from}&count={count}
```

- 1 回のリクエストで取得できる
- 範囲指定ができないのでキャッシュできなさそう
