# Memo Board 애플리케이션

######

![memo-board-diagram](/images/memo-board-diagram.png)

메모 보드는 텍스트 형태의 메모를 저장할 수 있는 앱입니다.  
메모는 public/private/group의 3가지 타입이며 public 메모는 비로그인 사용자를 포함한 모두에게, private 메모는 로그인 유저 자신에게만, 그리고 group 메모는 그룹에 가입한 그룹원들에게만 공개됩니다.  
사용자는 그룹을 생성할 수 있고, 여러 개의 그룹에 가입할 수도 있습니다. 그룹을 탈퇴하거나 회원을 탈퇴하는 경우에는 생성한 그룹의 오너 역할을 다른 사용자에게 넘겨주어야만 합니다.

---

## 페이지별 기능 구현

### /

home page는`AuthBar`, `MemoCards`, `GroupMemosSection`, `GroupsSection` 의 4개 구역으로 나뉘어져 있습니다.

- AuthBar
  : 로그인/로그아웃 및 account-settings 버튼이 위치한 섹션
- MemoCards
  : 비로그인 시 모든 public memos를, 로그인 시 해당 유저가 작성한 모든 유형의 memos를 display하는 섹션
- GroupMemosSection
  : 사용자가 pin한 그룹들의 메모를 display하는 섹션(최대 3개 그룹까지 pin 가능)
- GroupsSection
  : 그룹을 search, join, create 할 수 있는 섹션

### /memos

- memo CRUD
- 비로그인/로그인 유저별 메모 유형 접근 제한
  - 비로그인 유저의 non-public memo 접근 제한
  - 해당 그룹의 멤버가 아닌 유저의 group memo 접근 제한

### /account-settings

#### manage-groups

- 그룹 탈퇴 기능
  - 해당 유저가 owner인 경우에는 다른 유저에게 owner role 양도 후 탈퇴
- 그룹 삭제 기능
  - 그룹 삭제 시 그룹 메모도 전부 함께 삭제됨
- 그룹 owner 변경 기능

#### change-password

- email 로그인 유저의 비밀번호 변경 기능  
  (cf. github 로그인 유저에 대해서는 해당 기능 없음)

#### delete-account

- 계정 삭제 기능
  - 해당 유저가 어떤 그룹의 owner 인 경우 다른 유저에게 먼저 owner를 양도 후 계정 삭제 가능
  - 계정을 삭제 하여도 사용자가 작성한 메모는 자동으로 삭제되지 않음

---

## 주요 기능 구현

### 인증 - next-auth

- `GitHub`와 `Credential(email&password)`를 이용한 인증(sign-in, sign-up, sign-out)

### 폼 - react hook form & zod

- `sign-in`, `sign-up` 시 form validation 수행
- `group` 생성 시 form validation 수행

### DB - RDS postgresql & prisma ORM

- `memos` 데이터 CRUD
- `groups` 데이터 CRUD

### 상태 관리 - react-redux

- `memos` 데이터의 상태 관리
- `groups` 데이터의 상태 관리
- `pinned gropus` 데이터의 상태 관리(홈 화면에 고정된 그룹들과 그룹 메모들)

### Next.js

- `memo` 상세 페이지에 대해 `dynamic routes` 및 `generateStaticParams`를 이용한 정적 페이지 생성
- 특정 경로 접근 차단(`middleware` 이용)

---

## Deployment Stack

- `AWS EC2`
- `Nginx`, `PM2`
