# 토큰 재발행

## reissue

<img src="https://img.shields.io/badge/POST-green?style=plastic&logo=appveyor&logo=POST"/> 
http://localhost:8000/user/reissue

### Parameter

**authorization - Bearer Token**

- login 시 발급 받은 access token

<br>

### Responses

<img src="https://img.shields.io/badge/201-519800?style=plastic&logo=appveyor&logo=201"/>

<details>
<summary>결과값</summary>
<div markdown="1">

```json
{
  "success": true,
  "message": "토큰 재발행을 성공했습니다.",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQ1NTEyODcsInVzZXJJZCI6MjMsImlhdCI6MTY3NDU1MDU4NX0.p1BIZ_UKQJhOZ-RyvGBKRH9iueHvO9IcLxDXkEJv_0U"
  }
}
```

```
cookies

Refesh_Token_Index=XEc8N9n6Vkvq9JaggXzkmVO2dpJPA465QeMsyrn22zQ
```

</div>
</details>

<br>

<img src="https://img.shields.io/badge/400-DB3A00?style=plastic&logo=appveyor&logo=400"/> 
<details>
<summary>결과값 - Refresh Token 만료 혹은 현재 ip, device가 저장된 ip, device와 다름</summary>
<div markdown="1">

```json
{
  "success": false,
  "message": "토큰 재발행을 실패했습니다."
}
```

</div>
</details>

<br>

<img src="https://img.shields.io/badge/404-DB3A00?style=plastic&logo=appveyor&logo=404"/> 
<details>
<summary>결과값 - 토큰 없음</summary>
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

<img src="https://img.shields.io/badge/500-DB3A00?style=plastic&logo=appveyor&logo=500"/> 
<details>
<summary>결과값 - 기타</summary>
<div markdown="1">

```json
{
  "success": false,
  "message": "서버 에러입니다."
}
```

</div>
</details>
