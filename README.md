React 강좌 [패스트 캠퍼스]

https://react.vlpt.us/redux-middleware

기본 redux 프로젝트 생성

   creat react app

   redux 설치

   middleware [reduxDevTools, redux-logger]

   redux-thuck 사용

   redux-thunk + promise

   reload
      data 있을때는 데이터 호출 안함
           로딩 스태이츠 안보임

      post conponents
          리덕스 모듈에 clear_post


  cache
    이전 reload 로직으로는    
    post의 경우 unmouunt 시 초기화와
           url parameter의 postid가 바뀌어서 
    상태가 업데이트 되어
    이전 postid 값을 알지 못하게 됨 -> 동일한 post 페이지일 경우에도 다시 rendering 됨

    이런 상황을 개선하기 위해 구조를 변경하는 작업
    post state에 각 id 별 객체로 상태를 관리
    
    {
      posts : ...
      ,post : {
         '1': {
            data,loading,
            error
         },
         '2' : {
            data,
            loading,
            error
         }
         [id] : {
            data,
            loading,
            error
         }
      }
    }

   reducer action state 에 meta 데이터 관리, 렌더링 시 사용 