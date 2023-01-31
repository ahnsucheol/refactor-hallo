# 로그아웃

## logout

<img src="https://img.shields.io/badge/POST-green?style=plastic&logo=appveyor&logo=POST"/> 
http://localhost:8000/user/logout

### Parameter

**authorization - Bearer Token**

- login 시 발급 받은 access token

<br>

### Responses

<img src="https://img.shields.io/badge/200-519800?style=plastic&logo=appveyor&logo=200"/>

<details>
<summary>결과값</summary>
<div markdown="1">

```json
{
  "success": true,
  "message": "로그아웃을 성공했습니다."
}
```

```
cookies

Refesh_Token_Index=''
```

</div>
</details>

<br>

<img src="https://img.shields.io/badge/404-DB3A00?style=plastic&logo=appveyor&logo=404"/> 
<details>
<summary>결과값 - 토큰 미입력 또는 로그아웃 상태에서 API 요청</summary>
<div markdown="1">

```json
{
  "success": false,
  "message": "토큰이 존재하지 않습니다."
}
```

</div>
</details>

<br>

<img src="https://img.shields.io/badge/404-DB3A00?style=plastic&logo=appveyor&logo=404"/> 
<details>
<summary>결과값 - 만료된 토큰</summary>
<div markdown="1">

```json
{
  "success": false,
  "message": "만료된 토큰입니다."
}
```

</div>
</details>
