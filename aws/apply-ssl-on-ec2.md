# EC2 에 SSL 적용

- Route53 을 통해 도메인을 구입한다.

- Certificate Manager 에서 해당 도메인에 적용될 SSL 을 발급받는다.

- ELB 그룹을 생성하여 EC2 를 그룹에 추가한다.

- ELB 에 HTTPS 요청만 인바운드 되는 security group 을 추가한다.

- ELB 상태검사 탭에 Ping 프로토콜을 HTTP, 포트를 EC2 설정 포트로, 경로를 EC2 healthcheck 경로로 지정한다.

- EC2 의 healthcheck 엔드포인트로 주기적으로 접근이 발생하는지 확인한다.

- ELB 리스너 탭에 리스너를 추가한다.

  | 로드 밸런서 프로토콜 | 로드 밸런서 포트 | 인스턴스 프로토콜 | 인스턴스 포트  | 암호 | SSL 인증서   |
  | -------------------- | ---------------- | ----------------- | -------------- | ---- | ------------ |
  | HTTPS                | 443              | HTTP              | <EC2 접근포트> | -    | 발급받은 SSL |

- Route53 에서 위 ELB DNS 이름으로 Record set 을 만들어 도메인을 최종 적용한다.
  - Type : IPv4 address
  - Alias : YES 로 체크 후 Alias Target 에는 ELB 의 DNS 이름을 입력
  - Routing Policy : 용도에 맞는 정책으로 적용 (예시에는 Simple 을 적용함)
- `https://사용자도메인 ` 으로 접속을 확인한다.