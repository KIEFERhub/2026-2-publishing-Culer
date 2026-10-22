/**
 * ==========================================================================
 * BARÇA ARCHIVE : CULER — Chapter Content
 * 텍스트·이미지·색상은 이 파일만 수정하면 메인 화면과 챕터 페이지에 함께 반영됩니다.
 *
 * title       : 상단바 · 접근성용 한 줄 제목
 * titleLines  : 메인 화면 · 인트로에서 줄바꿈해 보여줄 제목 (없으면 title 한 줄)
 * color       : 배경 줄무늬 색 = 챕터 페이지 배경색
 *
 * blocks[].type
 *   - "h1"        : H1 (Instrument Serif — 영문으로 작성)
 *   - "h2"        : H2 (Asta Sans ExtraBold, 밑줄 — 한글 가능)
 *   - "body"      : Body 문단
 *   - "image"     : 이미지 (너비 366) + Caption (너비 291, 오른쪽 정렬)
 *   - "facts"     : 라벨 / 값 목록
 *   - "checklist" : 체크 · 추가 · 삭제 가능한 목록 (id 필요, 기기에 저장)
 *   - "note"      : 직접 적는 메모 (id 필요, 기기에 저장)
 *   - "lyrics"    : 가사 — lines: [{ say(한글 발음), text(원문), mean(뜻) }], credit(출처 한 줄)
 *   - "phrase"    : 응원 구호 — text(원문) · say(한글 발음) · mean(뜻)
 *   - "quote"     : 인용 — text(인용문) · by(누가 한 말)
 *   - "story"     : 짧은 썰 — label(번호·태그) · title(제목) · text(본문)
 *   - "links"     : 바로가기 버튼 — items: [{ label, href }]
 *   - "credits"   : 사진 출처 목록 — items: [{ label, href, by, license }]
 *   image 옵션    : ratio("4 / 3") · focus("22% 50%", 잘릴 때 중심) · credit(캡션 아래 출처 한 줄)
 *
 * 영문 H1 은 Instrument Serif 라 한글이 없습니다. H1 은 영문, 한글 제목은 H2 로 쓰세요.
 * "확인 필요" 주석은 공식 출처로 확인하지 못했거나 경기 직전에 다시 확인할 항목입니다.
 * ==========================================================================
 */

const CHAPTERS_DATA = [
  // ------------------------------------------------------------------
  // 01. MATCH INFO — 오늘의 상대, 비야레알
  // ------------------------------------------------------------------
  {
    chapterNumber: "Chapter. 01",
    title: "Match Info",
    image: "chapter1.png",
    alt: "Chapter 01 - Match Info",
    color: "#b31c44",
    subtitle: "vs Villarreal",
    lead: "오늘의 상대는 ‘노란 잠수함’ 비야레알.\n인구 5만 명의 작은 도시에서 유럽 정상까지 올라간 팀입니다. 알고 보면 훨씬 재밌어지는 상대, 경기 전에 한 번 훑어보세요.",
    blocks: [
      { type: "h1", text: "Match Day" },
      {
        type: "facts",
        items: [
          { label: "Date", value: "2026년 11월 22일 (일)" },
          // 확인 필요: 11월 초 구단 공식 페이지에서 킥오프 시간 확정 후 수정
          { label: "Kick-off", value: "미정 · 구단 공식 일정에서 확인 (보통 2~3주 전 발표)" },
          { label: "Venue", value: "Spotify Camp Nou" },
          { label: "Round", value: "라리가 13라운드" },
          { label: "Gates", value: "킥오프 1시간 30분 전 개방" }
        ]
      },
      {
        type: "story",
        label: "오늘의 우연",
        title: "캄프 누 재개장, 정확히 1년",
        text: "2년 반의 공사 끝에 캄프 누가 다시 문을 연 날이 2025년 11월 22일입니다. 그날 바르사는 아틀레틱 클루브를 4-0으로 이겼습니다. 지훈 님의 첫 직관은 그로부터 딱 1년 뒤 같은 날짜입니다."
      },

      { type: "h1", text: "Yellow Submarine" },
      {
        type: "body",
        text: "비야레알 CF는 발렌시아 지방 카스테욘주의 비야레알을 연고로 하는 클럽입니다. 도시 인구는 약 5만 명인데, 홈구장 에스타디오 데 라 세라미카의 좌석은 2만 4천여 석입니다. 시민 두 명 중 한 명이 경기장에 들어갈 수 있는 셈입니다."
      },
      {
        type: "image",
        src: "photos/v-ceramica.jpg",
        alt: "관중으로 가득 찬 에스타디오 데 라 세라미카",
        ratio: "16 / 9",
        caption: "비야레알의 홈, 에스타디오 데 라 세라미카 (2017년 12월). 2017년까지 이름은 ‘엘 마드리갈’이었고, 도시의 주력 산업인 세라믹 타일에서 지금의 이름을 따왔습니다.",
        credit: "사진 Frank94Rock · CC BY-SA 4.0"
      },
      { type: "h2", text: "비야레알 썰 모음" },
      {
        type: "story",
        label: "1947",
        title: "가게에 노란 천밖에 없었다",
        text: "창단 초기 비야레알의 유니폼은 흰 셔츠에 검은 바지였습니다. 1947년 회장의 아들이 새 유니폼을 사러 발렌시아에 갔는데, 필요한 수량이 있는 색이 노란색뿐이었습니다. 처음엔 논란이 있었지만 선수들이 금세 좋아하게 됐고, 그게 지금의 노란 유니폼이 됐습니다."
      },
      {
        type: "story",
        label: "1967",
        title: "비틀스에서 온 별명",
        text: "‘노란 잠수함(El Submarino Amarillo)’이라는 별명은 비틀스의 ‘Yellow Submarine’에서 왔습니다. 1967~68시즌, 골대 뒤 팬들이 레코드플레이어로 이 노래를 틀고 노란 유니폼에 맞춰 가사를 바꿔 부르기 시작했습니다. 바다도 없는 내륙 공업 도시인데 별명은 잠수함인 이유입니다."
      },
      {
        type: "story",
        label: "1997",
        title: "타일 회사 회장님",
        text: "1923년에 창단한 뒤 70년 넘게 하부 리그를 오가던 팀은, 1997년 세라믹 타일 기업 파메사(Pamesa)의 페르난도 로이그 회장이 인수하면서 달라집니다. 이듬해인 1998년 승격 플레이오프에서 콤포스텔라를 원정 다득점으로 꺾고 처음 1부 리그에 올랐습니다. 로이그는 지금도 회장이고, 파메사는 지금도 유니폼 스폰서입니다."
      },
      {
        type: "story",
        label: "2006",
        title: "리켈메의 페널티킥",
        text: "후안 로만 리켈메와 디에고 포를란의 시절, 비야레알은 첫 챔피언스리그 출전에서 4강까지 올라갑니다. 아스널과의 4강 2차전 막판, 동점을 만들 수 있는 페널티킥을 리켈메가 찼지만 옌스 레만에게 막혔습니다. 결승 진출을 눈앞에서 놓친, 비야레알 팬들이 지금도 이야기하는 장면입니다."
      },
      {
        type: "story",
        label: "2008",
        title: "바르사보다 위에서 끝난 시즌",
        text: "마누엘 펠레그리니 감독이 이끈 2007~08시즌, 비야레알은 레알 마드리드에 이어 라리가 2위를 차지했습니다. 그해 바르사는 3위였습니다. 구단 역사상 최고 순위입니다."
      },
      {
        type: "story",
        label: "2012",
        title: "강등, 그리고 1년 만의 복귀",
        text: "2012년 비야레알은 마지막 라운드에서 아틀레티코에 지며 2부로 강등됩니다. 새 감독 마놀로 프레시아도가 부임한 바로 그날 심장마비로 세상을 떠나는 비극도 있었습니다. 팀은 한 시즌 만에 1부로 돌아왔습니다."
      },
      {
        type: "story",
        label: "2021",
        title: "22명 전원이 찬 승부차기",
        text: "유로파리그 결승에서 맨체스터 유나이티드와 1-1로 비긴 뒤, 승부차기가 11-10까지 이어졌습니다. 양 팀 필드 플레이어가 모두 차고 골키퍼 차례까지 왔고, 비야레알 골키퍼 헤로니모 룰리가 자신의 킥을 넣은 뒤 다비드 데 헤아의 킥을 막아냈습니다. 비야레알 역사상 첫 메이저 트로피입니다."
      },
      {
        type: "image",
        src: "villarreal.jpg",
        alt: "노란 유니폼을 입은 팬들 사이를 지나는 비야레알 선수단 버스",
        caption: "2021년 유로파리그 우승 뒤 시내를 지나는 선수단 버스. 도시 전체가 노란색으로 물들었습니다. 이듬해인 2022년에는 챔피언스리그에서 유벤투스와 바이에른 뮌헨을 꺾고 다시 4강까지 갔습니다."
      },

      { type: "h1", text: "Legends" },
      {
        type: "facts",
        items: [
          { label: "Riquelme", value: "2006년 챔피언스리그 4강을 이끈 플레이메이커. 바르사 출신이기도 합니다" },
          { label: "Forlán", value: "2004–05 라리가 득점왕(25골)이자 유럽 골든슈" },
          { label: "Senna", value: "중원을 지킨 클럽의 상징, 유로 2008 우승" },
          { label: "Cazorla", value: "두 차례 비야레알에서 뛴 팬들의 미드필더" },
          { label: "G. Moreno", value: "구단 역대 최다 득점자, 지금도 주장" }
        ]
      },

      { type: "h1", text: "Players to watch" },
      {
        type: "body",
        text: "이번 시즌 감독은 이니고 페레스. 비야레알은 라리가와 함께 챔피언스리그도 병행하고 있어서, 일정이 빡빡한 상태로 캄프 누에 옵니다. 등번호를 기억해 두면 경기장에서 바로 찾을 수 있습니다." // 확인 필요: 경기 주간 부상·로테이션
      },
      {
        type: "facts",
        items: [
          { label: "7 Moreno", value: "제라르드 모레노 · 주장이자 구단 최다 득점자. 카탈루냐 출신으로 에스파뇰 유스에서 자랐습니다" },
          { label: "9 Mikautadze", value: "게오르게스 미카우타제 · 조지아 국가대표 스트라이커. 이번 시즌 팀 내 득점 선두권" },
          { label: "10 Moleiro", value: "알베르토 몰레이로 · 등번호 10번의 왼발 플레이메이커. 페드리와 같은 카나리아 제도 출신" },
          { label: "11 Akhomach", value: "일리아스 아코마치 · 라 마시아 출신 윙어. 2024년 바르사 3-5 패배 때 골을 넣은 선수" },
          { label: "19 Pépé", value: "니콜라 페페 · 빠른 왼발 윙어. 역습 때 가장 먼저 찾으세요" },
          { label: "25 Gulácsi", value: "페테르 굴라치 · 라이프치히에서 이번 여름 합류한 베테랑 골키퍼" }
        ]
      },

      { type: "h1", text: "Rivalry" },
      {
        type: "body",
        text: "비야레알의 진짜 라이벌은 같은 주의 카스테욘, 그리고 ‘발렌시아 지방 더비(Derbi de la Comunitat)’ 상대인 발렌시아입니다. 바르사와는 라이벌이라기보다 ‘만나면 골이 쏟아지는 상대’에 가깝습니다."
      },
      {
        type: "story",
        label: "2019.04",
        title: "4-4, 마지막 5분의 기적",
        text: "비야레알 원정에서 바르사가 2-0으로 앞서다 2-4로 뒤집혔습니다. 90분 메시의 프리킥, 추가시간 수아레스의 발리로 결국 4-4. 라리가 역사에 남는 난타전입니다."
      },
      {
        type: "story",
        label: "2024.01",
        title: "3-5, 그리고 사비의 작별",
        text: "몬주익에서 열린 경기. 0-2에서 3-2로 뒤집었지만 종료 직전 동점을 허용했고, 추가시간에만 두 골을 더 내주며 3-5로 졌습니다. 경기 직후 사비 감독은 시즌이 끝나면 팀을 떠나겠다고 발표했습니다."
      },
      {
        type: "story",
        label: "2025–26",
        title: "지난 시즌은 바르사의 2승",
        text: "지난 시즌 두 번의 맞대결은 바르사가 모두 이겼습니다. 12월 원정에서 2-0, 2월 캄프 누에서 4-1. 오늘 바르사는 3연승을 노립니다."
      },

      { type: "h2", text: "현장에서 볼 관전 포인트" },
      {
        type: "checklist",
        id: "match-watch",
        items: [
          "야말이 드리블로 몇 명을 제치는지 세어보기",
          "하피냐(주장, 득점 선두)의 슈팅 찾기",
          "공을 뺏긴 직후 5초 안에 다시 압박하는 장면",
          "원정석의 노란 유니폼 찾아보기",
          "아코마치가 공을 잡을 때 캄프 누 반응 보기"
        ]
      },

      { type: "h2", text: "사진 출처" },
      {
        type: "credits",
        items: [
          { label: "ESTADIO3", href: "https://commons.wikimedia.org/wiki/File:ESTADIO3.jpg", by: "Frank94Rock", license: "CC BY-SA 4.0" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // 02. BEFORE THE MATCH — 훈련장, 캄프 누 가는 길, 체크리스트
  // ------------------------------------------------------------------
  {
    chapterNumber: "Chapter. 02",
    title: "Before the match",
    titleLines: ["Before", "the match"],
    image: "chapter2.png",
    alt: "Chapter 02 - Before the match",
    color: "#900728",
    subtitle: "Training ground · Getting there · Checklist",
    lead: "경기 전날과 당일 아침에 볼 것들.\n선수들이 매일 훈련하는 곳, 캄프 누까지 가는 길, 그리고 나가기 전에 확인할 것.",
    blocks: [
      { type: "h1", text: "Training ground" },
      {
        type: "body",
        text: "1군은 시내가 아니라 바르셀로나 바로 옆 도시 산 조안 데스피(Sant Joan Despí)에 있는 ‘시우타트 에스포르티바 조안 감페르’에서 매일 훈련합니다. 유스 아카데미 라 마시아의 기숙사도 같은 곳에 있습니다."
      },
      {
        type: "image",
        src: "photos/b-gamper.jpg",
        alt: "FC 바르셀로나 엠블럼과 ‘Ciutat Esportiva Joan Gamper’ 글자가 새겨진 훈련장 외벽",
        ratio: "4 / 3",
        caption: "시우타트 에스포르티바 조안 감페르 정문 (2010년). 1군과 라 마시아 유스 선수들이 함께 쓰는 훈련장입니다.",
        credit: "사진 Arnaugir · CC BY-SA 3.0"
      },
      { type: "h2", text: "훈련장을 보는 세 가지 방법" },
      {
        type: "story",
        label: "01",
        title: "공식 투어: Players Experience",
        text: "구단이 운영하는 훈련장 투어입니다. 캄프 누의 팔라우 블라우그라나 0번 출입구에서 전용 버스를 타고 가서, 1군 전용 공간과 훈련 구장, 에스타디 요한 크루이프를 둘러봅니다. 이동 포함 약 2시간~2시간 30분, 가격은 99유로부터입니다. 출발 15분 전까지 도착해야 하고, 실제 훈련 장면을 볼 수 있다는 보장은 없습니다."
      },
      {
        type: "story",
        label: "02",
        title: "요한 크루이프 경기장에서 경기 보기",
        text: "훈련장 안에 있는 에스타디 요한 크루이프에서는 바르사 아틀레틱(2군)과 바르사 페메니(여자팀)가 홈경기를 합니다. 표가 캄프 누보다 훨씬 싸고, 미래의 1군 선수를 가까이에서 볼 수 있습니다. 여행 기간에 홈경기가 있는지 구단 홈페이지에서 확인해 보세요."
      },
      {
        type: "story",
        label: "03",
        title: "출근길 선수 보기 (운이 좋다면)",
        text: "1군 훈련은 보통 오전 11시 전후에 시작하고, 선수들은 그보다 1시간~1시간 30분 일찍 차를 타고 들어옵니다. 팬들이 정문 근처에서 기다리기도 하지만 훈련은 비공개이고, 일정은 그날그날 바뀝니다. 선수들이 멈춰 주지 않아도 서운해하지 마세요."
      },
      {
        type: "facts",
        items: [
          { label: "Rodalies", value: "R1 · R4 → Sant Joan Despí 역에서 걸어서 약 10분 (산츠 · 카탈루냐 광장 · 아르크 데 트리옴프에서 탑승)" },
          { label: "Tram", value: "T3 → 캄프 누 근처 Avinguda Diagonal에서 바로 탈 수 있습니다" },
          { label: "Bus", value: "L50 · L62 · 78 · X43" },
          { label: "Open training", value: "1군 공개 훈련은 보통 새해 무렵 한 번뿐이라 이번 여행 기간에는 없습니다" }
        ]
      },
      {
        type: "image",
        src: "photos/b-cruyff.jpg",
        alt: "위에서 내려다본 에스타디 요한 크루이프",
        ratio: "4 / 3",
        caption: "위에서 본 에스타디 요한 크루이프 (2023년). 2019년에 문을 연 작은 경기장으로, 바르사 아틀레틱과 바르사 페메니의 홈입니다.",
        credit: "사진 Wilnel José Verdú Guerrero · CC BY-SA 4.0"
      },
      {
        type: "links",
        items: [
          { label: "훈련장 투어 예약 (공식)", href: "https://www.fcbarcelona.com/en/card/3855146/ciutat-esportiva-joan-gamper-tour" },
          { label: "요한 크루이프 경기장 가는 법 (공식)", href: "https://www.fcbarcelona.com/en/tickets/barca-atletic/getting-to-the-johan-cruyff" }
        ]
      },

      { type: "h1", text: "Getting there" },
      {
        type: "body",
        text: "구단은 걷거나 대중교통을 이용하길 권합니다. 티켓에 적힌 출입구(Access) 문자를 먼저 보고, 가까운 역을 고르세요. 경기장 둘레를 돌아가면 생각보다 오래 걸립니다."
      },
      {
        type: "facts",
        items: [
          { label: "Access I · K · M", value: "Av. Joan XXIII 쪽 → L3 Palau Reial · Maria Cristina 가 가깝습니다" },
          { label: "Access Q · V · W", value: "Travessera de les Corts 쪽 → L3 Les Corts, L5 Badal 이 가깝습니다" },
          // 확인 필요: 출입구별 가까운 역은 지도 기준 참고값. 티켓의 출입구 안내를 우선
          { label: "Access D · E · F", value: "Martí i Franquès · Av. Doctor Gregorio Marañón 쪽 → L3 Zona Universitària 가 가깝습니다" },
          { label: "Tram", value: "T1 · T2 · T3 — Pius XII · Palau Reial · Maria Cristina 정류장" },
          { label: "Bus", value: "킥오프 2시간 전부터 종료 후 1시간 30분까지 일부 노선이 바뀝니다" }
        ]
      },
      {
        type: "body",
        text: "교통카드는 10회권인 T-casual 하나면 지하철·트램·버스를 모두 탈 수 있고, 환승도 됩니다. 경기 후에는 역마다 줄이 길어지니 돌아올 때 쓸 횟수까지 미리 남겨 두세요." // 확인 필요: 요금은 매년 바뀜
      },
      {
        type: "links",
        items: [
          { label: "캄프 누 가는 법 (공식)", href: "https://www.fcbarcelona.com/en/card/4562313/getting-to-spotify-camp-nou" }
        ]
      },

      { type: "h1", text: "Stories" },
      {
        type: "body",
        text: "지하철에서, 경기장까지 걸어가며 하나씩 읽어 보세요. 처음 검색해 본 게 ‘바르샤 역사’였다면, 이 정도면 충분합니다."
      },
      {
        type: "story",
        label: "1899",
        title: "신문 광고로 시작된 클럽",
        text: "1899년, 바르셀로나에 살던 스위스 청년 한스 감퍼가 신문에 ‘축구 클럽을 만들 사람을 찾는다’는 광고를 냈습니다. 그렇게 모인 사람들이 11월 29일 FC 바르셀로나를 만들었습니다. 그는 이름을 카탈루냐식 ‘조안 감페르’로 바꾸고 평생 이 클럽에 헌신했습니다. 훈련장 이름이 그의 이름입니다."
      },
      {
        type: "story",
        label: "Culer",
        title: "‘꾸레’는 원래 엉덩이라는 뜻",
        text: "옛 홈구장 레스 코르츠 시절, 자리가 모자라 담장 위에 걸터앉아 경기를 보는 팬이 많았습니다. 길에서 보면 담장 위에 엉덩이(cul)들이 줄지어 있었고, 그래서 바르사 팬을 ‘쿨레(culer)’라고 부르게 됐습니다. 지금은 바르사 팬이 스스로를 부르는 자랑스러운 이름입니다."
      },
      {
        type: "story",
        label: "1968",
        title: "Més que un club",
        text: "‘클럽 그 이상’이라는 모토는 1968년 나르시스 데 카레라스 회장의 취임 연설에서 나왔습니다. 바르사는 주식회사가 아니라 회원(소시)들이 주인인 클럽이고, 회장도 회원 투표로 뽑습니다. 캄프 누 관중석에도 이 문구가 새겨져 있습니다."
      },
      {
        type: "story",
        label: "1979",
        title: "라 마시아, 원래는 농가",
        text: "라 마시아는 1702년에 지어진 카탈루냐식 농가 건물입니다. 1979년 유스 선수들의 기숙사가 됐고, 이곳에서 사비, 이니에스타, 메시, 그리고 지금의 야말, 쿠바르시, 페르민이 자랐습니다. 2011년 기숙사는 감페르 훈련장 안의 새 건물로 옮겨졌습니다."
      },
      {
        type: "image",
        src: "photos/b-masia.jpg",
        alt: "돌로 지은 옛 농가 건물 라 마시아",
        ratio: "4 / 3",
        caption: "캄프 누 옆에 지금도 남아 있는 옛 라 마시아 건물 (2011년). 경기장 가는 길에 지나칠 수 있습니다.",
        credit: "사진 MARIA ROSA FERRE · CC BY-SA 2.0"
      },
      {
        type: "story",
        label: "2000",
        title: "냅킨 위의 계약서",
        text: "2000년 12월, 13살 메시의 입단을 망설이는 사이 아르헨티나로 돌아가겠다는 말이 나오자, 당시 스포츠 디렉터 카를레스 렉사흐가 테니스 클럽 식당의 종이 냅킨에 입단 약속을 적어 서명했습니다. 바르사 역사상 가장 유명한 냅킨입니다."
      },
      {
        type: "story",
        label: "2007",
        title: "메시가 아기 야말을 씻겨 준 사진",
        text: "2007년 유니세프 자선 달력 촬영 때, 스무 살의 메시가 생후 몇 달 된 아기를 욕조에서 씻기는 사진을 찍었습니다. 그 아기가 라민 야말이었다는 사실은 2024년 야말의 아버지가 사진을 공개하며 알려졌습니다. 그리고 2026년 월드컵 결승에서 두 사람은 적으로 만났습니다."
      },

      { type: "h1", text: "Checklist" },
      {
        type: "body",
        text: "항목을 누르면 체크되고, ×로 지우고, 아래 칸에 적어서 추가할 수 있습니다. 이 휴대폰에 그대로 저장됩니다."
      },
      { type: "h2", text: "숙소에서 나갈 때" },
      {
        type: "checklist",
        id: "before-items",
        items: [
          "여권 또는 신분증",
          "모바일 티켓 (지갑 앱 저장 + 캡처)",
          "보조배터리 (작은 것)",
          "작은 가방 (큰 배낭·캐리어는 반입 불가, 보관소 없음)",
          "카드 두 장 (매점은 카드·간편결제가 빠름)",
          "얇은 겉옷 또는 우비 (11월 저녁은 쌀쌀함)",
          "바르사 머플러"
        ]
      },
      { type: "h2", text: "입장 전 체크" },
      {
        type: "checklist",
        id: "before-gate",
        items: [
          "티켓에 적힌 출입구(Access) 문자 확인",
          "출입구에 가까운 역으로 가기",
          "킥오프 1시간 30분 전 도착",
          "교통카드 돌아올 횟수 남았는지 확인",
          "만날 장소 정해두기",
          "경기 당일 구단 공지 확인"
        ]
      },
      { type: "h2", text: "자리에 앉은 뒤" },
      {
        type: "checklist",
        id: "before-seat",
        items: [
          "화장실 · 매점 위치 확인",
          "선수들 몸 푸는 모습 보기",
          "머플러 꺼내기",
          "응원 구호 한 번 소리 내어 읽어보기 (Chapter 04)",
          "휴대폰 배터리 확인"
        ]
      },

      { type: "h2", text: "사진 출처" },
      {
        type: "credits",
        items: [
          { label: "Ciutat Esportiva Joan Gamper", href: "https://commons.wikimedia.org/wiki/File:Ciutat_Esportiva_Joan_Gamper.jpg", by: "Arnaugir", license: "CC BY-SA 3.0" },
          { label: "Estadi Johan Cruyff", href: "https://commons.wikimedia.org/wiki/File:Estadi_Johan_Cruyff.jpg", by: "Wilnel José Verdú Guerrero", license: "CC BY-SA 4.0" },
          { label: "La Masia (Can Planas) (Barcelona) - 1", href: "https://commons.wikimedia.org/wiki/File:La_Masia_(Can_Planas)_(Barcelona)_-_1.jpg", by: "MARIA ROSA FERRE", license: "CC BY-SA 2.0" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // 03. ON THE GROUND — 캄프 누, 그리고 경기 날의 운영
  // ------------------------------------------------------------------
  {
    chapterNumber: "Chapter. 03",
    title: "On the Ground",
    titleLines: ["On", "the Ground"],
    image: "chapter3.png",
    alt: "Chapter 03 - On the Ground",
    color: "#6d051c",
    subtitle: "Spotify Camp Nou",
    lead: "유럽에서 가장 큰 축구장이 될 경기장.\n그리고 경기 날, 그 안에서 벌어지는 일들.",
    blocks: [
      { type: "h1", text: "Camp Nou" },
      {
        type: "body",
        text: "캄프 누(Camp Nou)는 카탈루냐어로 ‘새 경기장’이라는 뜻입니다. 1957년 9월 24일, 바르셀로나의 축제일인 라 메르세 날에 문을 열었고, 그 전까지 쓰던 레스 코르츠 경기장과 구분하려고 사람들이 부르던 이름이 그대로 굳었습니다. 2000년에는 회원 투표로 정식 이름이 됐고, 2022년부터 스폰서 이름을 붙여 ‘Spotify Camp Nou’라고 부릅니다."
      },
      {
        type: "image",
        src: "photos/ground-stadium.jpg",
        alt: "킥오프 한 시간 전, 경기장 안에서 바라본 캄프 누 전경",
        ratio: "1280 / 726",
        caption: "재건축 전의 캄프 누 (2014년 10월, 바르사–아약스). 지금은 지붕 기둥과 새 관중석이 올라가며 모습이 많이 달라졌습니다.",
        credit: "사진 Hani Golino · CC BY-SA 4.0"
      },
      {
        type: "facts",
        items: [
          { label: "Opened", value: "1957년 9월 24일" },
          { label: "Record", value: "약 12만 명 — 1986년 유러피언컵 8강 유벤투스전" },
          { label: "1982", value: "월드컵 개막전 (벨기에 1-0 아르헨티나), 교황 요한 바오로 2세 미사" },
          { label: "1992", value: "바르셀로나 올림픽 축구 결승" },
          { label: "Now", value: "약 6만 2천 석 (공사 진행 중)" },
          { label: "Goal", value: "약 10만 5천 석 — 완공되면 유럽 최대 축구 전용 경기장" }
        ]
      },
      { type: "h2", text: "지금 캄프 누는 공사 중" },
      {
        type: "body",
        text: "2023년 6월 재건축을 시작해, 바르사는 두 시즌 동안 몬주익 올림픽 경기장에서 홈경기를 치렀습니다. 2025년 11월 22일 일부 관중석만 열고 돌아왔고, 이후 단계적으로 좌석을 늘려 지금은 약 6만 2천 명이 들어옵니다. 맨 위 3층 관중석은 2027년에 열 예정이고, 이번 시즌이 끝나면 지붕 공사를 시작합니다. 그래서 경기 날에도 크레인과 공사 가림막이 보일 수 있습니다. 이것도 지금만 볼 수 있는 캄프 누의 모습입니다."
      },
      {
        type: "image",
        src: "photos/g-campnou-2026.jpg",
        alt: "밤 경기를 앞둔 지금의 캄프 누. 관중석 위로 공사 중인 구조물이 보인다",
        ratio: "4 / 3",
        caption: "2026년 9월의 캄프 누. 관중석 위로 아직 공사 중인 3층 구조물이 보입니다. 지훈 님이 보게 될 모습과 가장 가깝습니다.",
        credit: "사진 Elad Eisenhammer · CC BY 4.0"
      },

      { type: "h1", text: "Match day" },
      {
        type: "body",
        text: "경기가 있는 날 캄프 누 주변은 아침부터 다른 동네가 됩니다. 시간 순서대로 정리했습니다."
      },
      {
        type: "facts",
        items: [
          { label: "D-1 ~ 3h", value: "디지털 티켓 발송 (경기 24시간 전 ~ 3시간 전). 티켓에 출입구가 적혀 있습니다" },
          { label: "−2h", value: "주변 버스 노선 변경 시작, 바르사 지원 창구(OAB) 운영 시작" },
          { label: "−1h 30m", value: "출입구 개방. 가방 검사와 몸 검색이 있습니다" },
          { label: "−45m", value: "보통 이즈음 선수들이 나와 몸을 풉니다" },
          { label: "Kick-off", value: "선수 입장과 함께 구단가 ‘Cant del Barça’" },
          { label: "45 + 15", value: "하프타임 15분. 매점·화장실 줄이 가장 긴 시간" },
          { label: "Full time", value: "종료 휘슬 뒤에도 구단가가 다시 흘러나옵니다" },
          { label: "+1h 30m", value: "주변 버스 노선 정상화" }
        ]
      },
      { type: "h2", text: "입장할 때 알아둘 것" },
      {
        type: "body",
        text: "짐 보관소가 없습니다. 큰 배낭, 캐리어, 노트북, 유모차는 들어갈 수 없고, 유리병·캔, 드론, 레이저 포인터, 폭죽과 연막탄도 금지입니다. 입구에서 가방을 열어 보고 몸 검색을 하는데, 판단은 그 자리 직원이 합니다. 애매한 물건은 숙소에 두고 오는 게 마음 편합니다." // 확인 필요: 구단 공식 반입 규정 원문
      },
      {
        type: "body",
        text: "스페인 법에 따라 일반 관중석 매점에서는 알코올을 팔지 않습니다. 맥주를 시키면 무알코올 맥주가 나옵니다. 경기 전 한잔은 경기장 밖 Av. Joan XXIII · Travessera de les Corts 주변 바에서 하는 게 현지 방식입니다. 매점은 현금과 카드 모두 되지만 카드나 휴대폰 결제가 빠릅니다."
      },

      { type: "h1", text: "Your gate" },
      {
        type: "facts",
        items: [
          { label: "Gate I · K · M", value: "Av. Joan XXIII 쪽 (Avinguda Diagonal 방향)" },
          { label: "Gate Q · V · W", value: "Travessera de les Corts 쪽" },
          { label: "Gate D · E · F", value: "Carrer de Martí i Franquès · Av. Doctor Gregorio Marañón 쪽" }
        ]
      },
      {
        type: "image",
        src: "photos/ground-gate.jpg",
        alt: "경기 날 캄프 누 입구 앞에 모인 팬들",
        ratio: "3 / 2",
        caption: "경기 날 입구 앞에 모인 팬들 (2014년 9월). 지금의 출입구 배치와는 다를 수 있습니다.",
        credit: "사진 Ank Kumar · CC BY-SA 4.0"
      },
      { type: "h2", text: "내 자리 메모" },
      {
        type: "note",
        id: "seat",
        placeholder: "출입구 · 구역 · 열 · 좌석 번호를 적어 두세요"
      },

      { type: "h1", text: "Look around" },
      {
        type: "body",
        text: "자리에 앉으면 먼저 경기장을 한 바퀴 둘러보세요. 선수들이 몸을 푸는 모습, 스탠드가 채워지는 속도, 머플러가 하나둘 올라가는 순간이 경기 전 가장 좋은 장면입니다. 관중석에 새겨진 ‘MÉS QUE UN CLUB’ 문구도 찾아보세요."
      },
      { type: "h2", text: "경기장 빙고" },
      {
        type: "checklist",
        id: "ground-bingo",
        items: [
          "‘MÉS QUE UN CLUB’ 문구 찾기",
          "몸 푸는 야말 사진 찍기",
          "구단가 마지막 ‘Barça, Barça, Barça!’ 따라 외치기",
          "무알코올 맥주 마셔보기",
          "옆자리 현지 팬과 하이파이브",
          "공사 중인 3층 관중석 찾아보기"
        ]
      },

      { type: "h2", text: "사진 출처" },
      {
        type: "credits",
        items: [
          { label: "Camp nou 2026", href: "https://commons.wikimedia.org/wiki/File:Camp_nou_2026.png", by: "Elad Eisenhammer", license: "CC BY 4.0" },
          { label: "Camp Nou - FC Barcelona-Ajax Amsterdam", href: "https://commons.wikimedia.org/wiki/File:Camp_Nou_-_FC_Barcelona-Ajax_Amsterdam.jpg", by: "Hani Golino", license: "CC BY-SA 4.0" },
          { label: "FC Barcelona - Camp Nou on a matchday 07", href: "https://commons.wikimedia.org/wiki/File:FC_Barcelona-_Camp_Nou_on_a_matchday_(Ank_Kumar)_07.jpg", by: "Ank Kumar", license: "CC BY-SA 4.0" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // 04. CHANTS — 응원가와 응원법
  // ------------------------------------------------------------------
  {
    chapterNumber: "Chapter. 04",
    title: "Chants",
    image: "chapter4.png",
    alt: "Chapter 04 - Chants",
    color: "#053879",
    subtitle: "Cant del Barça",
    lead: "경기장에서 함께 부를 노래와 구호.\n한글 발음은 카탈루냐어를 한글로 옮긴 근사값입니다. 틀려도 크게 외치는 게 정답입니다.",
    blocks: [
      { type: "h1", text: "Cant del Barça" },
      {
        type: "body",
        text: "1974년 구단 창단 75주년에 만들어진 바르사의 공식 응원가입니다. 경기장에서 팬들이 함께 부릅니다. 한글 발음과 뜻을 함께 적었습니다." // 확인 필요: 제작 연도는 일반적으로 알려진 내용 (공식 출처 미확인)
      },
      {
        type: "lyrics",
        lines: [
          { say: "토-델 캄 / 에-스운 클람", text: "Tot el camp / És un clam", mean: "온 경기장이 사람들로 가득차 있네" },
          { say: "솜-라젠 블라우그라나", text: "Som la gent blaugrana", mean: "우리는 블라우그라나의 서포터" },
          { say: "탄 써발 돈 베님 / 시-델수 오델 노르", text: "Tant se val d'on venim / Si del sud o del nord", mean: "우리의 출신이 남쪽이든 북쪽이든 그건 중요치 않아" },
          { say: "아-라 에스뗌 다 꼬 에스뗌 다 꼬", text: "Ara estem d'acord estem d'acord", mean: "우리 모두 하나되어 형제애로써" },
          { say: "우나 반데라 은스 아쥐르마나", text: "Una bandera ens agermana", mean: "바르셀로나 깃발 아래 뭉친다" },
          { say: "블라우-그라나 알벤 / 운 크릿 발렌", text: "Blaugrana al vent / Un crit valent", mean: "블라우그라나 깃발이 바람에 휘날리고 용맹스런 함성이 울려퍼진다" },
          { say: "터- 님- 운 놈 엘 삽 또톰", text: "Tenim un nom el sap tothom", mean: "모두가 알고있는 그 이름" },
          { say: "바르싸, 바르싸, 바~르싸!", text: "Barça, Barça, Barça!" }
        ]
      },
      { type: "h1", text: "Un dia de partit" },
      {
        type: "lyrics",
        credit: "한글 발음과 뜻: 페냐 서울 정리 자료", // 확인 필요: 가사 저작권 — 공개 배포 시 이용 허락 확인
        lines: [
          { say: "운 디아 라 빠르띳", text: "Un dia de partit", mean: "어느 경기 날" },
          { say: "알 골 놀 바자날", text: "Al Gol Nord vaig anar", mean: "북측 스탠드로 향했지" },
          { say: "누메스 엔트라 라 그라다", text: "Només entrar a la grada", mean: "관중석에 들어서자마자" },
          { say: "암 바자 나모랄", text: "Em vaig enamorar", mean: "난 사랑에 빠져버렸어" },
          { say: "알 꼬렘 바테가바", text: "El cor em bategava", mean: "심장이 터질 듯이 뛰기 시작했지" },
          { say: "놈 프레군 띳 페르께", text: "No em preguntis perquè", mean: "왜냐고는 묻지 말아줘" },
          { say: "델 바르싸 속 수포르떼", text: "Del Barça sóc suporter", mean: "난 바르사의 서포터니까" },
          { say: "셈프레 따니마레", text: "Sempre t'animaré", mean: "언제나 너를 응원할 거야!" },
          { say: "알레, 알레, 알레 × 4", text: "Alé, alé, alé" }
        ]
      },
      {
        type: "image",
        src: "photos/chants-stand.jpg",
        alt: "경기 시작 전 골대 뒤 응원석이 채워지는 캄프 누",
        ratio: "4 / 3",
        focus: "50% 55%",
        caption: "경기 시작 전, 골대 뒤 응원석 쪽 관중석 (2016년 1월). 이 구역에서 구호가 시작됩니다.",
        credit: "사진 Azulino · CC BY-SA 4.0"
      },

      { type: "h1", text: "Shouts" },
      {
        type: "phrase",
        text: "Visca el Barça!",
        say: "비스카 엘 바르사!",
        mean: "바르사 만세! (‘visca’는 ‘만세’, ‘오래 살아라’라는 뜻)"
      },
      {
        type: "phrase",
        text: "Força Barça!",
        say: "포르사 바르사!",
        mean: "힘내라 바르사!"
      },
      {
        type: "phrase",
        text: "Som-hi!",
        say: "솜 이!",
        mean: "가자! 해보자! — 경기 시작 전, 밀리고 있을 때 서로 외치는 말"
      },
      {
        type: "phrase",
        text: "Madridista qui no boti!",
        say: "마드리디스타 키 노 보티!",
        mean: "안 뛰는 사람은 레알 마드리드 팬! — 이 구호가 나오면 다 같이 제자리에서 뜁니다"
      },
      {
        type: "phrase",
        text: "Gol!",
        say: "골!",
        mean: "카탈루냐어와 스페인어 모두 같은 말. ‘고오오오올’로 길게"
      },
      {
        type: "phrase",
        text: "Campions, campions!",
        say: "캄피온스, 캄피온스!",
        mean: "챔피언, 챔피언! — 이기는 경기 막판에 나옵니다"
      },

      { type: "h1", text: "Words" },
      {
        type: "phrase",
        text: "Més que un club",
        say: "메스 케 운 클룹",
        mean: "클럽 그 이상 — 바르사의 모토"
      },
      {
        type: "phrase",
        text: "Blaugrana",
        say: "블라우그라나",
        mean: "‘파랑(blau)’과 ‘와인빛 붉은색(grana)’, 바르사의 유니폼 색을 부르는 말"
      },
      {
        type: "phrase",
        text: "Culer",
        say: "쿨레",
        mean: "바르사 팬을 부르는 애칭. 지훈 님도 이제 꾸레입니다"
      },

      { type: "h2", text: "발음 팁" },
      {
        type: "body",
        text: "Barça의 ç는 ‘ㅆ’에 가까운 소리입니다. 그래서 ‘바르싸’처럼 가볍게 붙여서 읽으면 됩니다. Visca의 v는 한국어 ‘ㅂ’에 가깝게, r은 혀를 살짝 굴려 주세요. 정확하지 않아도 괜찮습니다. 큰 소리로 함께 외치는 것이 더 중요합니다."
      },
      { type: "h2", text: "사진 출처" },
      {
        type: "credits",
        items: [
          { label: "Fondo sur Camp Nou", href: "https://commons.wikimedia.org/wiki/File:Fondo_sur_Camp_Nou.JPG", by: "Azulino", license: "CC BY-SA 4.0" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // 05. CELEBRATIONS — 지금 선수들의 세리머니
  // ------------------------------------------------------------------
  {
    chapterNumber: "Chapter. 05",
    title: "Celebrations",
    image: "chapter5.png",
    alt: "Chapter 05 - Celebrations",
    color: "#24448e",
    subtitle: "Goal!",
    lead: "골이 터진 뒤 선수들이 무엇을 하는지 알면, 그 몇 초가 훨씬 길게 느껴집니다.\n오늘 그라운드에 설 선수들의 세리머니와 그 뜻.",
    blocks: [
      { type: "h1", text: "Goal" },
      {
        type: "body",
        text: "골이 들어가는 순간 경기장 전체가 한꺼번에 일어납니다. 옆 사람과 어깨를 거는 것, 처음 보는 팬과 손뼉을 마주치는 것, 목이 쉬도록 소리 지르는 것이 이곳의 방식입니다. 그 순간을 영상으로만 남기지 말고 한 번은 휴대폰을 내려놓고 함께 외쳐 보세요."
      },

      { type: "h1", text: "10 Lamine Yamal" },
      {
        type: "quote",
        text: "드리블 현란하시잖아.. 쾌감이 지려",
        by: "지훈 님이 바르사에 입덕한 이유"
      },
      {
        type: "image",
        src: "photos/c-yamal.jpg",
        alt: "우승 메달을 목에 걸고 관중석을 가리키는 라민 야말",
        ratio: "4 / 5",
        focus: "50% 30%",
        caption: "월드컵 우승 메달을 걸고 관중석을 가리키는 라민 야말 (2026년 7월 19일, 아르헨티나와의 결승). 스페인은 연장 끝에 1-0으로 이겼습니다.",
        credit: "사진 Bryan Berlin · CC BY-SA 4.0"
      },
      {
        type: "story",
        label: "304",
        title: "손가락으로 만드는 우편번호",
        text: "야말이 골을 넣고 손가락으로 3·0·4를 만들어 보이는 건, 그가 자란 마타로의 로카폰다 동네 우편번호 08304의 끝자리입니다. 넉넉하지 않은 동네에서 자란 자신을 잊지 않겠다는 뜻이고, 로카폰다 아이들에게 보내는 인사입니다."
      },
      {
        type: "story",
        label: "Crown",
        title: "머리에 쓰는 보이지 않는 왕관",
        text: "최근 야말은 두 손으로 머리 위에 왕관을 올리는 동작을 합니다. NBA 르브론 제임스의 세리머니에서 따온 것으로 알려져 있습니다. 스페인 언론에서는 너무 뽐낸다는 말도 나왔지만, 지금 야말이 어떤 자신감으로 뛰는지 보여 주는 장면입니다."
      },
      {
        type: "story",
        label: "Henry",
        title: "우상에게 보내는 오마주",
        text: "2026년 9월 크로아티아전에서는 코너 플래그 앞에서 티에리 앙리의 유명한 세리머니를 따라 했습니다. 야말은 “앙리를 정말 좋아한다. 롤모델이다. 그 상징적인 세리머니를 해 보고 싶었다”고 말했습니다."
      },
      {
        type: "image",
        src: "photos/c-worldcup.jpg",
        alt: "월드컵 트로피를 들고 기뻐하는 스페인 대표팀",
        ratio: "16 / 10",
        caption: "2026 월드컵 우승을 축하하는 스페인 대표팀. 결승골은 지난 시즌까지 바르사에서 뛴 페란 토레스가 넣었습니다.",
        credit: "사진 Bryan Berlin · CC BY-SA 4.0"
      },
      {
        type: "story",
        label: "Tears",
        title: "지훈 님이 처음 본 경기의 야말",
        text: "2026~27시즌 개막전 엘체 원정(5-0 승). 야말은 65분에 교체된 뒤 벤치에서 눈물을 보였고, 하피냐가 다가가 달래 주는 장면이 중계에 잡혔습니다. 지훈 님이 기억하는 ‘그날 표정이 안 좋던 야말’이 바로 이 경기입니다. 그 뒤 야말은 리그 득점 상위권으로 돌아왔습니다."
      },

      { type: "h1", text: "11 Raphinha" },
      {
        type: "image",
        src: "photos/c-raphinha.jpg",
        alt: "브라질 대표팀 노란 유니폼을 입은 하피냐",
        ratio: "4 / 5",
        focus: "50% 25%",
        caption: "2026 월드컵 조별리그 모로코전의 하피냐 (2026년 6월 13일).",
        credit: "사진 Bryan Berlin · CC BY-SA 4.0"
      },
      {
        type: "story",
        label: "Spider",
        title: "아들과의 약속, 스파이더맨",
        text: "엘체와의 개막전, 시즌 첫 골을 페널티킥으로 넣은 하피냐는 카메라 앞으로 달려가 스파이더맨 손동작을 했습니다. 아들 가엘이 스파이더맨처럼 세리머니해 달라고 부탁했고, 그 약속을 지킨 것입니다. 지훈 님이 처음 제대로 본 경기의 첫 골 세리머니입니다."
      },
      {
        type: "story",
        label: "Knees",
        title: "무릎으로 건너는 경기장",
        text: "우승을 확정하면 하피냐는 경기장을 무릎으로 기어서 건넙니다. 신앙인으로서 우승하면 감사를 드리겠다는 개인적인 약속이고, 리즈 시절 강등을 피했을 때부터 이어 온 습관입니다. 이번 시즌 주장 완장도 그가 차고 있습니다."
      },
      {
        type: "story",
        label: "Duo",
        title: "야말과의 비밀 악수",
        text: "하피냐와 야말이 함께 골을 만들면 손바닥을 두 번 맞부딪친 뒤 두 팔을 들고 고개를 숙이는 인사를 합니다. 하피냐는 “특별한 의미는 없고, 둘이 평소에 하는 인사”라고 했습니다. 오늘 둘이 같이 달려가면 눈여겨보세요."
      },

      { type: "h1", text: "7 Fermín" },
      {
        type: "image",
        src: "photos/c-fermin.jpg",
        alt: "흰 유니폼을 입고 공을 다루는 페르민 로페스",
        ratio: "4 / 5",
        focus: "50% 30%",
        caption: "공을 다루는 페르민 로페스 (2025년 9월).",
        credit: "사진 Biso · CC BY 4.0"
      },
      {
        type: "story",
        label: "Guard",
        title: "경례가 아니라 경호원",
        text: "페르민은 골을 넣으면 손을 이마 옆에 붙이고 서는데, 많은 사람이 군대식 경례로 압니다. 본인 말로는 “군대 경례가 아니다”입니다. 여름휴가 때 선글라스를 낀 사진을 본 친구가 ‘경호원 같다’며 자세를 흉내 냈고, 골 넣고 이 동작을 하면 머리를 페르민처럼 자르겠다는 내기까지 걸었습니다. 한 번 해 본 뒤 그대로 자기 세리머니가 됐습니다."
      },

      { type: "h1", text: "8 Pedri" },
      {
        type: "image",
        src: "photos/c-pedri.jpg",
        alt: "스페인 대표팀 유니폼을 입고 공을 모는 페드리",
        ratio: "4 / 5",
        focus: "50% 40%",
        caption: "월드컵 결승에서 공을 모는 페드리 (2026년 7월 19일).",
        credit: "사진 Bryan Berlin · CC BY-SA 4.0"
      },
      {
        type: "story",
        label: "Glasses",
        title: "아빠의 안경",
        text: "페드리는 골을 넣으면 두 손을 눈가에 대고 안경 모양을 만듭니다. 안경을 쓰는 아버지에게 바치는 세리머니입니다. 축구를 처음 좋아하게 만든 사람이 아버지라서입니다."
      },
      {
        type: "story",
        label: "Bald",
        title: "대머리 사촌을 위한 한 골",
        text: "2023년 헤타페전에서는 머리를 미는 시늉을 한 뒤 안경 동작을 했습니다. 대머리인 사촌 아브라함에게 바친 골이었습니다. 페드리는 골을 자주 넣는 선수가 아니라서, 세리머니를 볼 수 있다면 그것만으로 운이 좋은 날입니다."
      },

      { type: "h1", text: "Legends" },
      {
        type: "image",
        src: "photos/celeb-messi.jpg",
        alt: "두 손가락으로 하늘을 가리키며 달려가는 메시",
        ratio: "4 / 3",
        caption: "두 손가락으로 하늘을 가리키는 리오넬 메시 (2012년 3월 7일, 챔피언스리그 16강 레버쿠젠전). 어릴 적 그를 축구장에 데려가 준 할머니 셀리아에게 바치는 세리머니입니다. 이 경기에서 메시는 5골을 넣었습니다.",
        credit: "사진 Shai Pal · CC BY-SA 3.0"
      },
      {
        type: "image",
        src: "photos/celeb-parade.jpg",
        alt: "2009년 우승을 축하하는 오픈 톱 버스 퍼레이드",
        ratio: "4 / 3",
        caption: "2009년 챔피언스리그 우승을 축하하며 오픈 톱 버스로 도시를 도는 퍼레이드.",
        credit: "사진 Eva Perales · CC BY-SA 2.0"
      },

      { type: "h1", text: "Bingo" },
      {
        type: "body",
        text: "오늘 경기에서 본 세리머니를 체크해 보세요. 다 모으면 성공한 꾸레입니다."
      },
      {
        type: "checklist",
        id: "celeb-bingo",
        items: [
          "야말의 304",
          "야말의 왕관",
          "하피냐의 스파이더맨",
          "하피냐 · 야말 비밀 악수",
          "페르민의 경호원 자세",
          "페드리의 안경"
        ]
      },
      { type: "h2", text: "기억해 둘 장면" },
      {
        type: "note",
        id: "moments",
        placeholder: "오늘 가장 기억에 남은 골이나 장면을 적어 두세요"
      },
      { type: "h2", text: "사진 출처" },
      {
        type: "credits",
        items: [
          { label: "Lamine Yamal Argentina v Spain 19 July 2026-319", href: "https://commons.wikimedia.org/wiki/File:Lamine_Yamal_Argentina_v_Spain_19_July_2026-319.jpg", by: "Bryan Berlin", license: "CC BY-SA 4.0" },
          { label: "Spain World Cup Winners Argentina v Spain 19 July 2026-1 (cropped)", href: "https://commons.wikimedia.org/wiki/File:Spain_World_Cup_Winners_Argentina_v_Spain_19_July_2026-1_(cropped).jpg", by: "Bryan Berlin", license: "CC BY-SA 4.0" },
          { label: "Raphinha Brazil V Morocco 13 June 2026-133 (cropped)", href: "https://commons.wikimedia.org/wiki/File:Raphinha_Brazil_V_Morocco_13_June_2026-133_(cropped).jpg", by: "Bryan Berlin", license: "CC BY-SA 4.0" },
          { label: "Fermín López", href: "https://commons.wikimedia.org/wiki/File:Ferm%C3%ADn_L%C3%B3pez.jpg", by: "Biso", license: "CC BY 4.0" },
          { label: "Pedri Argentina v Spain 19 July 2026-191", href: "https://commons.wikimedia.org/wiki/File:Pedri_Argentina_v_Spain_19_July_2026-191.jpg", by: "Bryan Berlin", license: "CC BY-SA 4.0" },
          { label: "FC Barcelona - Bayer 04 Leverkusen, 7 mar 2012 (07)", href: "https://commons.wikimedia.org/wiki/File:FC_Barcelona_-_Bayer_04_Leverkusen,_7_mar_2012_(07).jpg", by: "Shai Pal", license: "CC BY-SA 3.0" },
          { label: "Rua Barça - Tricampió 2009", href: "https://commons.wikimedia.org/wiki/File:Rua_Bar%C3%A7a_-_Tricampi%C3%B3_2009.jpg", by: "Eva Perales", license: "CC BY-SA 2.0" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // 06. AFTER THE MATCH — 귀가 동선, 야경, 식당
  // ------------------------------------------------------------------
  {
    chapterNumber: "Chapter. 06",
    title: "After the Match",
    titleLines: ["After", "the Match"],
    image: "chapter6.png",
    alt: "Chapter 06 - After the Match",
    color: "#0860ba",
    subtitle: "After the whistle",
    lead: "휘슬이 울린 뒤, 여행은 계속된다.\n새벽 4시 반에 일어나 보던 경기가 오늘은 저녁 일정이 됐습니다. 끝나고 어디로 갈지까지 정해 두세요.",
    blocks: [
      { type: "h1", text: "Leaving" },
      {
        type: "body",
        text: "경기가 끝나면 수만 명이 같은 시간에 같은 역으로 향합니다. 경기장 바로 앞 역에서 줄을 서기보다, 10분 더 걸어서 한두 정거장 떨어진 역에서 타는 편이 훨씬 수월합니다."
      },
      {
        type: "facts",
        items: [
          { label: "Exit", value: "구단은 Av. Joan XXIII 를 따라 Av. Diagonal(Rambla dels Pins) 방향으로 나가길 안내합니다" },
          { label: "Last metro", value: "일요일 밤은 자정 무렵 막차 (종점 출발 기준). 늦게 끝나면 서두르세요" },
          { label: "Bus", value: "종료 후 1시간 30분까지 일부 노선이 바뀌고, V1은 Av. Arístides Maillol에서 끊깁니다" },
          { label: "Taxi", value: "택시 승하차는 Carrer Menéndez Pelayo 쪽" }
        ]
      },

      { type: "h1", text: "Three ways home" },
      {
        type: "story",
        label: "Route A",
        title: "가우디 야경 루트 — L5",
        text: "경기장 남쪽 Badal 역(L5)에서 타면 갈아타지 않고 Sagrada Família 역까지 갑니다. 역에서 나오자마자 조명을 받은 사그라다 파밀리아가 보입니다. 낮에 이미 봤더라도, 경기의 여운을 안고 밤에 올려다보는 건 또 다릅니다. 중간의 Hospital Clínic 역에서 내리면 Parking Pizza 런드레스 지점까지 걸어서 금방입니다."
      },
      {
        type: "story",
        label: "Route B",
        title: "그라시아 거리 타파스 루트 — L3",
        text: "Av. Diagonal 쪽으로 걸어 나와 Maria Cristina 또는 Palau Reial 역(L3)에서 타면 갈아타지 않고 Passeig de Gràcia 역까지 갑니다. 밤 조명이 켜진 카사 바트요와 카사 밀라(라 페드레라)를 지나, 걸어서 5분 거리의 Cervecería Catalana 에서 늦은 저녁을 먹는 코스입니다. 구단이 권하는 퇴장 방향과도 같아서 가장 편한 길입니다."
      },
      {
        type: "story",
        label: "Route C",
        title: "맥주 공장 루트 — L3 → 산 안토니",
        text: "L3를 타고 Catalunya 역까지 간 뒤, 대학가 쪽으로 10분쯤 걸으면 산 안토니 동네의 Fàbrica Moritz 가 나옵니다. 경기 결과를 안주 삼아 그날 만든 맥주를 마시는 코스입니다. 경기장에서 무알코올 맥주만 마셨다면 더더욱."
      },
      {
        type: "image",
        src: "photos/after-metro.jpg",
        alt: "마리아 크리스티나 역 3호선 승강장",
        ratio: "4 / 3",
        caption: "마리아 크리스티나 역(L3) 승강장. Route B의 출발점입니다.",
        credit: "사진 Agm · CC BY-SA 4.0"
      },
      {
        type: "image",
        src: "photos/a-batllo.jpg",
        alt: "보랏빛 조명이 켜진 카사 바트요와 밤의 그라시아 거리",
        ratio: "3 / 2",
        caption: "밤의 그라시아 거리와 카사 바트요. Route B에서 Passeig de Gràcia 역을 나오면 바로 보입니다.",
        credit: "사진 Suicasmo · CC BY-SA 4.0"
      },
      {
        type: "image",
        src: "photos/a-sagrada.jpg",
        alt: "밤 조명을 받은 사그라다 파밀리아",
        ratio: "3 / 4",
        caption: "밤의 사그라다 파밀리아 (2025년 12월). Route A의 끝입니다.",
        credit: "사진 Hendrik Manuels Stoops Lugo · CC0"
      },

      { type: "h1", text: "Where to eat" },
      {
        type: "story",
        label: "Tapas",
        title: "Cervecería Catalana",
        text: "현지인과 여행자 모두 줄을 서는 타파스 집입니다. 작은 빵 위에 재료를 얹은 몬타디토가 유명하고, 메뉴가 많아서 이것저것 시켜 나눠 먹기 좋습니다. 밤 1시 30분까지 문을 열어 경기 후 늦은 저녁으로 딱 맞습니다. 저녁 피크에는 대기가 길 수 있습니다."
      },
      {
        type: "facts",
        items: [
          { label: "Address", value: "Carrer de Mallorca, 236 (에이샴플레)" },
          { label: "Metro", value: "L3 Passeig de Gràcia · Diagonal" },
          { label: "Hours", value: "평일 08:00–01:30 · 주말 09:00–01:30" }
        ]
      },
      {
        type: "story",
        label: "Beer",
        title: "Fàbrica Moritz",
        text: "모리츠는 1856년 알자스 출신 루이스 모리츠가 바르셀로나에서 시작한 맥주입니다. 100년 넘게 맥주를 만들던 옛 공장 건물을 프랑스 건축가 장 누벨이 고쳐 2011년 다시 열었습니다. 이곳에서 매일 만드는 비살균 생맥주를 마실 수 있고, 알자스와 스페인 요리를 섞은 안주도 있습니다."
      },
      {
        type: "facts",
        items: [
          { label: "Address", value: "Ronda de Sant Antoni, 39–41 (산 안토니)" },
          { label: "Metro", value: "L1 · L2 Universitat, L2 Sant Antoni" },
          { label: "Hours", value: "늦게까지 영업 (방문 전 확인)" } // 확인 필요: 요일별 영업시간
        ]
      },
      {
        type: "image",
        src: "photos/a-moritz.jpg",
        alt: "론다 데 산 안토니에 있는 모리츠 공장 건물 외관",
        ratio: "4 / 3",
        caption: "론다 데 산 안토니의 옛 모리츠 공장 건물 (2022년). 지금은 이 안에서 맥주를 만들고 팝니다.",
        credit: "사진 Enric · CC BY-SA 4.0"
      },
      {
        type: "story",
        label: "Pizza",
        title: "Parking Pizza",
        text: "이름처럼 원래 건물 주차장이던 공간에 셔터를 그대로 남겨 연 피자집입니다. 첫 지점은 Carrer de Londres 98. 긴 나무 테이블에 다 같이 앉아 먹는 분위기이고, 바르셀로나에 여러 지점이 있습니다. 경기 전날 저녁이나 다음 날 점심으로 추천합니다." // 확인 필요: 지점별 영업시간
      },
      {
        type: "facts",
        items: [
          { label: "Address", value: "Carrer de Londres, 98 (첫 지점)" },
          { label: "Metro", value: "L5 Hospital Clínic 에서 걸어서 10분 안팎" }
        ]
      },

      { type: "h2", text: "메뉴판에 있으면 무조건" },
      {
        type: "quote",
        text: "Torradetes de Santa Teresa",
        by: "토라데테스 데 산타 테레사"
      },
      {
        type: "body",
        text: "우유와 달걀에 푹 적신 빵을 구워 설탕을 뿌리고, 집에 따라 시나몬이나 레몬 껍질을 더한 카탈루냐 전통 디저트입니다. 원래는 남은 빵을 버리지 않으려고 만들던 집밥 디저트라 관광객은 잘 모르는데, 그래서 더 맛있습니다. 메뉴판에서 이 이름을 보면 고민하지 말고 시키세요. ‘Torrades de Santa Teresa’라고 적혀 있기도 합니다."
      },
      {
        type: "image",
        src: "photos/a-torradetes.jpg",
        alt: "설탕을 뿌려 구운 빵 디저트",
        ratio: "3 / 2",
        caption: "스페인식 토리하(torrija). 토라데테스 데 산타 테레사는 이와 거의 같은 카탈루냐식 디저트입니다.",
        credit: "사진 Javier Lastras · CC BY 2.0"
      },

      { type: "h2", text: "경기장을 나오기 전에" },
      {
        type: "checklist",
        id: "after-leave",
        items: [
          "만나기로 한 장소 확인",
          "오늘 갈 루트 정하기 (A · B · C)",
          "탈 역 정하기 (바로 앞 역은 피하기)",
          "막차 시간 확인",
          "휴대폰 배터리 남았는지 확인",
          "교통카드 남은 횟수 확인"
        ]
      },

      { type: "h1", text: "Journal" },
      {
        type: "body",
        text: "캄프 누에서 경기를 보려고 일정을 맞추던 그 순간부터 오늘까지. 한 줄이라도 적어 두면, 나중에 새벽 4시 반에 다시 경기를 볼 때 오늘이 떠오를 겁니다."
      },
      {
        type: "note",
        id: "journal",
        placeholder: "스코어, 골 넣은 선수, 가장 좋았던 순간, 함께 부른 노래, 오늘의 기분"
      },
      {
        type: "image",
        src: "photos/after-night.jpg",
        alt: "밤의 캄프 노우 외관",
        ratio: "4 / 3",
        caption: "밤의 캄프 누 (2022년 4월).",
        credit: "사진 JaflaumS05 · CC BY-SA 4.0"
      },
      { type: "h2", text: "사진 출처" },
      {
        type: "credits",
        items: [
          { label: "Maria Cristina Metro L3", href: "https://commons.wikimedia.org/wiki/File:Maria_Cristina_Metro_L3.jpg", by: "Agm", license: "CC BY-SA 4.0" },
          { label: "Casa Batlló at night 20171228-1", href: "https://commons.wikimedia.org/wiki/File:Casa_Batll%C3%B3_at_night_20171228-1.jpg", by: "Suicasmo", license: "CC BY-SA 4.0" },
          { label: "Sagrada Familia, December 2025, Night", href: "https://commons.wikimedia.org/wiki/File:Sagrada_Familia,_December_2025,_Night.jpg", by: "Hendrik Manuels Stoops Lugo", license: "CC0" },
          { label: "072 Cases Moritz, ronda de Sant Antoni 41-43 (Barcelona)", href: "https://commons.wikimedia.org/wiki/File:072_Cases_Moritz,_ronda_de_Sant_Antoni_41-43_(Barcelona).jpg", by: "Enric", license: "CC BY-SA 4.0" },
          { label: "Torrija con azúcar", href: "https://commons.wikimedia.org/wiki/File:Torrija_con_az%C3%BAcar.jpg", by: "Javier Lastras", license: "CC BY 2.0" },
          { label: "Camp Nou at Night - april 2022", href: "https://commons.wikimedia.org/wiki/File:Camp_Nou_at_Night_-_april_2022.jpg", by: "JaflaumS05", license: "CC BY-SA 4.0" }
        ]
      }
    ]
  }
];
