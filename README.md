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

thunk_history
   thunk 함수에서 사용 할 수 있도록 customrouter를 전달해 주는데
   기존 BrowserRouter를 변경하는 과정에서
   CreateBrowerRouter를 생성하는 history import가 오류로 인해 진행 불가

   그래서 container components에서 link tag로 화면 이동 처리함
     link button

redux-saga {redux-saga/effects}
   액션을 모니터링

   비동기 작업을 진행 할때 기존 요청 요청 및 취소 가능
   Generator
      함수의 흐름을 특정 구간에 멈춰 놓았다가 다시 실행 할 수 있다.

      function*
      yield
      return

      -------------------
      function* generatorFuntion(){
         yield 1;
         yield 2;
         return 3;
      }

      const generator = generatorFuntion();
      generator.next()  -> {value : undefine, done : false}  //시작
      generator.next()  -> {value : 1, done : false}

      generator.next()  -> {value : 2, done : false}

      generator.next()  -> {value : 3, done : true}

      generator.next()  -> {value : undefined, done : true}

      function () {
         let a = yield;  <- next() 파라미터 값>
         .
         .
      }

      function* addGenerator(){
         let result = 0;
         while(true) {
             result = yield result     
         }
      }


   saga : generator에 기반한 액션의 관리 (Counter)

   reducer 추가 async
     module rootSaga  tield all ([counterSaga])

   App index.js  sagaMiddleware 등록





     