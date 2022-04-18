express-session
세션을 대신 관리해 주는 'express-session' 모듈

'express-session'은 세션을 위한 미들웨어로, 'Express'에서 세션을 다룰 수 있는 공간을 쉽게 만들어주고
세션 아이디를 쿠키에 저장하고, 해당 세션 아이디에 종속되는 고유한 세션 객체를 서버 메모리에 저장한다

이때 세션 객체는 서로 독립적인 객체이므로 각각 다른 데이터를 저장할 수 있다

req.session이 세션 객체,
req.session은 세션 객체에 세션 데이터를 저장하거나 불러오기 위해 사용한다

세션 객체에 값을 담거나, 값을 불러오는 법, 세션을 파괴하는 법은 GitHub 참고
https://github.com/expressjs/session#reqsession