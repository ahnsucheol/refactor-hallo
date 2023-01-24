# 회원가입

## signup

<img src="https://img.shields.io/badge/POST-green?style=plastic&logo=appveyor&logo=POST"/> 
http://localhost:8000/user/signup

### Parameter

**body - json**

```json
{
  "email": "이메일",
  "nickname": "별명",
  "password": "비밀번호",
  "image": "프로필 이미지 URL"
}
```

- email: email 형식, 필수
- nickname: 20자 이하, 필수
- password: 알파벳 소문자, 숫자, 특수문자 각각 최소 1개 이상 필수 입력, 8~16자, 필수
- image: 현재는 링크만 저장, 추후 실제 이미지까지 저장할 수 있도록 변경 예정

<br>

### Responses

<img src="https://img.shields.io/badge/201-519800?style=plastic&logo=appveyor&logo=201"/>

<details>
<summary>결과값</summary>
<div markdown="1">

```json
{
  "success": true,
  "message": "회원가입을 성공했습니다.",
  "data": {
    "userId": 20
  }
}
```

</div>
</details>

<br>

<img src="https://img.shields.io/badge/400-DB3A00?style=plastic&logo=appveyor&logo=400"/> 
<details>
<summary>결과값 - 입력값 오류</summary>
<div markdown="1">

```json
{
  "success": false,
  "message": "필요한 유저 정보가 일치하지않습니다."
}
```

</div>
</details>

<br>

<img src="https://img.shields.io/badge/409-DB3A00?style=plastic&logo=appveyor&logo=409"/> 
<details>
<summary>결과값 - 이메일 중복</summary>
<div markdown="1">

```json
{
  "success": false,
  "message": "이메일이 중복되었습니다."
}
```

</div>
</details>
