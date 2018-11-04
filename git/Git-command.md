# Git tutorial M43B

## What is Git?

### VCS(Version Controll System) / SCM(Source Code Manager)

| Command                                    | Description                                       |
| ------------------------------------------ | ------------------------------------------------- |
| `$ git config --global user.name "name"`   | git에서 사용할 이름을 설정 [최초 1회]             |
| `$ git config --global user.email "email"` | github 주소에서 사용하는 메일을 설정 [최초1회]    |
| `$ git init`                               | .git 디렉토리 생성 및 초기화                      |
| `$ rm -rf .git`                            | .git 디렉토리 삭제                                |
| `$ git remote add "git repository url"`    | 리모트 repository를 가리킨다.                     |
| `$ git status`                             | 현재 git 상태를 확인                              |
| `$ git add <FILE> or <PATH>`               | FILE or PATH를 트래킹 및 스테이징한다.            |
| `$ git commit -m "등록할 메세지"`          | 트랙 및 스테이징한 목록을 commit한다.             |
| `$ git log`                                | commit한 list를 본다.                             |
| `$ git push -u origin master`              | commit한 list를 push [최초 1회]                   |
| `$ git diff`                               | 파일의 수정된 정보를 확인한다.                    |
| `$ git commit --amend`                     | 마지막 commit 정보를 editor로 open                |
| `$ touch .gitignore`                       | repository에 add되지 않을 파일을 담는 파일을 생성 |
| `$ git branch`                             | 현재 작업하고 있는 branch list 확인               |
| `$ git branch <branch name>`               | branch 생성                                       |
| `$ git checkout <branch name>`             | branch로 이동                                     |
| `$ git merge <branch name>`                | 브랜치의 내용을 현재 branch에 합침                |
| `$ git branch -d <branch name>`            | 브랜치를 삭제                                     |
| `$ git branch -D <branch name>`            | 브랜치가 머지되지 않았더라도 강제삭제             |
| `$ git checkout -b <branch name>`          | 브랜치를 생성과 동시에 이동                       |
| `$ git checkout -f`                        | 마지막 commit으로 이동                            |
