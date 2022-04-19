Axios 란?
Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리 아다.
쉽게 말해서 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용한다.
이미 자바스크립트에는 fetch api가 있지만, 프레임워크에서 ajax를 구현할땐 axios를 쓰는 편이라고 보면 된다.


axios 요청(request) 파라미터 옵션

method : 요청방식. (get이 디폴트)
url : 서버 주소
baseURL : url을 상대경로로 쓸대 url 맨 앞에 붙는 주소.
예를들어, url이 /post 이고 baseURL이 https://some-domain.com/api/ 이면,
https://some-domain.com/api/post로 요청 가게 된다.
headers : 요청 헤더
data : 요청 방식이 'PUT', 'POST', 'PATCH' 해당하는 경우 body에 보내는 데이터
params : URL 파라미터 ( ?key=value 로 요청하는 url get방식을 객체로 표현한 것)
timeout : 요청 timeout이 발동 되기 전 milliseconds의 시간을 요청. timeout 보다 요청이 길어진다면, 요청은 취소되게 된다.
responseType : 서버가 응답해주는 데이터의 타입 (arraybuffer, documetn, json, text, stream, blob)
responseEncoding : 디코딩 응답에 사용하기 위한 인코딩 (utf-8)
transformRequest : 서버에 전달되기 전에 요청 데이터를 바꿀 수 있다.
요청 방식 'PUT', 'POST', 'PATCH', 'DELETE' 에 해당하는 경우에 이용 가능
배열의 마지막 함수는 string 또는 Buffer, 또는 ArrayBuffer를 반환합
header 객체를 수정 가능
transformResponse : 응답 데이터가 만들어지기 전에 변환 가능
withCredentials : cross-site access-control 요청을 허용 유무. 이를 true로 하면 cross-origin으로 쿠키값을 전달 할 수 있다.
auth : HTTP의 기본 인증에 사용. auth를 통해서 HTTP의 기본 인증이 구성이 가능
maxContentLength: http 응답 내용의 max 사이즈를 지정하도록 하는 옵션
validateStatus : HTTP응답 상태 코드에 대해 promise의 반환 값이 resolve 또는 reject 할지 지정하도록 하는 옵션
maxRedirects : node.js에서 사용되는 리다이렉트 최대치를 지정
httpAgent /  httpsAgent : node.js에서 http나 https를 요청을 할때 사용자 정의 agent를 정의하는 옵션
proxy : proxy서버의 hostname과 port를 정의하는 옵션
cancelToken : 요청을 취소하는데 사용되어 지는 취소토큰을 명시