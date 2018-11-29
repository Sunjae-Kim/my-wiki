# Hyperledger Fabric

## 1) Before get started

### Hyperledger Fabric

- 인프라스트럭쳐 관리와 어플리케이션 제작을 위한 기본적 구성 요소 제공
- 기업용 블록체인 어플리케이션 제작을 위한 가이드라인 & 관례 제공
- **Version** : 2017.6.11.Production-Ready v1.0

---

### 문제

1. 기술적 미숙
2. 비지니스 로직반영의 어려움
3. 기술 표준의 부재

---

### Private vs Public

|                 |          Hyperledger Fabric<br />(Permissioned)          | Bitcoin<br />(Permissionless) |
| :-------------: | :------------------------------------------------------: | :---------------------------: |
|    Identity     | identity 관리가능<br /> MSP(Membership Service Provider) |            익명성             |
|    Consensus    |     Endorsement & Ordering Service<br />(Pluggable)      |         Proof of work         |
| Value in Ledger |                          Assets                          |        Crypto Currency        |

---

### Enterprise에서 블록체인이 필요한 이유?

![reson](https://image.slidesharecdn.com/blockchain-hyerledger-fabricv02-180323071019/95/blockchain-hyperledger-fabric-3-638.jpg)

- 제 3의 심판을 통해서 모든 활동을 Tracking이 필요한 Business Model들이 필요하기 때문

![compare](https://cdn-images-1.medium.com/max/639/1*JehyCna7NXyS-w-UYDpSdA.jpeg)

- 시스템을 구축하는것 보다 모두가 동의할 수 있는 합의체를 만드는 목적
- 사업 근간의 형태를 구축하는데 좋다.

---

### 구조

| Privacy | Trust | Shared Ledger | Smart Contract |
| ------- | ----- | ------------- | -------------- |
|         |       |               |                |

- Destributed Ledger

  A **distributed ledger** (also called a **shared ledger**, or **Distributed Ledger Technology**, **DLT**) is a consensus of replicated, shared, and synchronized digital data geographically spread across multiple sites, countries, or institutions. There is no central administrator or centralized data storage.

  > 출처: [Wiki](https://en.wikipedia.org/wiki/Distributed_ledger)

![structure1](https://cdn-images-1.medium.com/max/1182/0*Blz6yYjORY-E1LVB.png)

![st2](https://www.oreilly.com/library/view/hands-on-blockchain-with/9781788994521/assets/11a7fc5b-adad-4f72-8dc2-91a6ace8a30a.png)

먼저 실행 시키고 ordering을 통해서 순서를 매기고 검증을 하는게 Hyperledger

- Execute
- Order
- Validate

---

### 구성요소

- Assets : 거래의 기반이 되는 가치의 상태 (state)
- Chaincode :  State의 변화를 주는 비지니스 로직

- Privacy : Channel을 통한 서브넷
- Ledger: Asset State의 변화 내역의 기록
- Consensus: 네트워크 내의 peer간의 동일한 Ledger & State를 공유하는 방법
- Security & MSP: 

![](https://image.slidesharecdn.com/blockchain-hyerledger-fabricbangkokv05-180404044852/95/blockchain-hyper-ledger-fabric-bangkok-conference-13-638.jpg)

---

### Hyperledger Composer Playground

- Link: <https://composer-playground.mybluemix.net>

- 하이퍼레저의 네트워크를 자동으로 생성해주며 네트워크에서 DApp을 구축하기 위한 모든 환경이 세팅되어 있는 Tool 








































참고 : <https://github.com/djohnkang/hlf_vagrant_devenv>