# 로그인

## login

<img src="https://img.shields.io/badge/POST-green?style=plastic&logo=appveyor&logo=POST"/> 
http://localhost:8000/user/login

### Parameter

**body - json**

```json
{
  "email": "이메일",
  "password": "비밀번호"
}
```

<br>

### Responses

<img src="https://img.shields.io/badge/201-519800?style=plastic&logo=appveyor&logo=201"/>

<details>
<summary>결과값</summary>
<div markdown="1">

```json
{
  "success": true,
  "message": "로그인을 성공했습니다.",
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

<img src="https://img.shields.io/badge/404-DB3A00?style=plastic&logo=appveyor&logo=404"/> 
<details>
<summary>결과값 - 입력값 오류</summary>
<div markdown="1">

```json
{
  "success": false,
  "message": "올바르지않은 요청입니다."
}
```

</div>
</details>
