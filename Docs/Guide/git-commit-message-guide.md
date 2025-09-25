---
title: Git 커밋 메시지 가이드
created: 2025-09-26
modified: 2025-09-26
author: Hyeon
---

# 📝 Git 커밋 메시지 가이드

이 문서는 프로젝트에서 일관된 커밋 메시지를 작성하기 위한 규칙을 안내합니다.  
[브랜치 네이밍 가이드](./git-branch-naming-guide.md)와는 달리, 커밋 메시지는 가이드라인을 **강력히** 권장합니다.

## 📌 기본 규칙

-   영어 소문자 사용
-   명령문 형태로 작성 (예: `add`, `fix`, `update`)
-   한 줄 요약은 50자 이내
-   본문이 필요하면 한 줄 띄운 뒤 상세 설명

## 🧱 커밋 메시지 포맷

```
<타입>: <간단한 설명>
```

### 예시

```
feat: add login endpoint
fix: handle null user in profile
docs: update README with setup instructions
chore: configure eslint and prettier
```

---

## 📂 커밋 타입 목록

| 타입       | 설명                                  |
| ---------- | ------------------------------------- |
| `feat`     | 새로운 기능 추가                      |
| `fix`      | 버그 수정                             |
| `docs`     | 문서 관련 변경                        |
| `style`    | 포맷, 세미콜론 누락 등 기능 변화 없음 |
| `refactor` | 리팩토링 (기능 변화 없음)             |
| `test`     | 테스트 코드 추가/수정                 |
| `chore`    | 기타 변경사항 (빌드, 설정 등)         |

## 🧪 커밋 예시

```bash
git commit -m "feat: implement user login API"
git commit -m "fix: correct redirect URL after login"
git commit -m "docs: add architecture diagram"
git commit -m "style: reformat code with prettier"
git commit -m "refactor: simplify auth logic"
```

## 📄 본문이 필요한 경우

한 줄 설명 이후 빈 줄을 추가하고, 변경 이유나 부연 설명을 작성합니다.

```
fix: prevent crash on empty config

The config parser was not handling empty strings.
This adds a null/empty check before processing.
```

---

## 💡 권장 사항

-   커밋 단위를 작게, 의미 단위로 분리
-   메시지를 통해 변경 내역을 명확히 표현
-   커밋 로그만 보고도 변경 사항을 파악할 수 있게 작성
