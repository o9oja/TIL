# MVC 패턴

1. Model, View, Controller가 각각 어떤 역할을 하는지 이해할 수 있다.
2. MVC 디자인 패턴과 같이, 코드를 각각 다른 부분으로 나누어 작성해야 하는 이유를 이해할 수 있다.
1. SQL을 Node.js 앱에서 쿼리할 수 있다.
2. 클라이언트의 HTTP 요청에 따라 CRUD API를 구현할 수 있다. (CRUD: Create, Read, Update, Delete)

![](https://velog.velcdn.com/images/jjabsu/post/fc19ed71-ddf6-4269-9cbb-23425751e996/image.jpeg)



## 비지니스로직
1. 사용자가 웹사이트에 접속한다.
2. Controller는 사용자가 요청한 웹페이지를 서비스 하기 위해서 모델을 호출한다.
3. 모델은 데이터베이스나 파일과 같은 데이터 소스를 제어한 후에 그 결과를 리턴한다.
4. Controller는 Model이 리턴한 결과를 View에 반영한다.
5. 데이터가 반영된 VIew는 사용자에게 보여진다.

### 모델(Model)
- DATA, 정보들의 가공을 책임지는 컴포넌트를 말합니다.

모델(Model)은 어플리케이션의 정보, 데이터를 나타냅니다. 데이타베이스, 처음의 정의하는 상수, 초기화 값, 변수 등을 뜻합니다. 비즈니스 로직을 처리한 후 모델의 변경사항을 컨트롤러와 뷰에 전달합니다.


### 뷰(View)
- 사용자에게 보여지는 부분, 즉 유저 인터페이스(User interface)를 의미합니다.

MVC 패턴은 여러 개의 뷰(View)가 존재할 수 있으며, 모델에게 질의하여 데이터를 전달받습니다. 뷰는 받은 데이터를 화면에 표시해주는 역할을 가지고 있습니다. 모델에게 전달받은 데이터를 별도로 저장하지 않아야 합니다. 사용자가 화면에 표시된 내용을 변경하게 되면 모델에게 전달하여 모델을 변경해야 합니다.


###  컨트롤러(Controller)
- 모델(Model)과 뷰(View) 사이를 이어주는 브릿지(Bridge) 역할을 의미합니다.

모델이나 뷰는 서로의 존재를 모르고 있습니다. 변경 사항을 외부로 알리고 수신하는 방법만 있습니다. 컨트롤러(Controller)는 이를 중재하기 위해 모델과 뷰에 대해 알고 있어야 합니다. 모델이나 뷰로부터 변경 내용을 통지 받으면 이를 각 구성 요소에게 통지해야 합니다. 사용자가 어플리케이션을 조작하여 발생하는 변경 이벤트들을 처리하는 역할을 수행합니다.



## MVC 패턴 왜 사용할까?

최초 설계를 꼼꼼하게 진행한 시스템이라도 유지보수가 발생하기 시작하면 각 기능간의 결합도(coupling)가 높아지는 경우가 발생합니다. 결합도가 높아진 시스템은 유지보수 작업 시 다른 비즈니스 로직에 영향을 미치게 되므로 사소한 코드의 변경이 의도치 않은 버그를 유발할 수 있습니다.

MVC 패턴을 가진 시스템의 각 컴포넌트는 자신이 맡은 역할만 수행한 후 다른 컴포넌트로 결과만 넘겨주면 되기 때문에 시스템 결합도를 낮출 수 있습니다. 유지보수 시에도 특정 컴포넌트만 수정하면 되기 때문에 보다 쉽게 시스템 변경이 가능합니다.


## MVC의 한계
MVC에서 View는 Controller에 연결되어 화면을 구성하는 단위요소이므로 다수의 View들을 가질 수 있습니다. 그리고 Model은 Controller를 통해서 View와 연결되어지지만, 이렇게 Controller를 통해서 하나의 View에 연결될 수 있는 Model도 여러개가 될 수 있습니다.
뷰와 모델이 서로 의존성을 띄게 됩니다.

즉, 화면에 복잡한 화면과 데이터의 구성 필요한 구성이라면, Controller에 다수의 Model과 View가 복잡하게 연결되어 있는 상황이 생길 수 있습니다.
복잡한 화면을 구현하게 되면 대규모 MVC 어플리케이션 형태로 구현하게 되었습니다.

Controller는 View와 라이프 사이클과 강하게 연결되어있어서 분리할 수도 없고, 코드 분석/수정과 테스트가 모두 힘들어지죠. 그리고 복잡하게 엮어있는 모델과 뷰는 여러 Side-Effect를 불러와서 프로그램 운영을 힘들게 하지요.

그래서 위의 문제점을 보완한 여러 다양한!! 패턴을 파생되었습니다.
MVP, MVVM, Viper, Clean Architecture, Flux, Redux, RxMVVM….

# Cmarket Database

## node.js에서 mysql 사용하기
```jsx
const mysql = require('mysql');
const dotenv = require('dotenv');
const config = require('../config/config');
dotenv.config();

const con = mysql.createConnection(
  config[process.env.NODE_ENV || 'development']
);

con.connect((err) => {
  if (err) throw err;
});

module.exports = con;
 
```
## controller
```jsx
const models = require('../models');
//요청에 대한 응답 + model
module.exports = {
  orders: {
    post: (req, res) => {
      const userId = req.params.userId;
      // req바디에 있는 값
      const { orders, totalPrice } = req.body;


      // 잘못된 요청이 오는 경우 400
      if (!orders || !totalPrice) {
        return res.status(400).send('Bad Request');

        // 올바른 요청이 왔을 경우 models.orders.post 실행
      } else {
        models.orders.post(userId, orders, totalPrice, (err, result) => {
          if (err) {
            return res.status(500).send('Internal Server Error');
            // Status Code: 201 (성공적으로 생성했을 시)
            // 이 메시지만 응답으로 보내주면 됨
          } else {
            return res.status(201).send('Order has been placed.');
          }
        })
      }
    },
  },
}
```
## model
```jsx
const db = require('../db');

module.exports = {
  
  orders: {
    post: (userId, orders, totalPrice, callback) => {
      // TODO: 해당 유저의 주문 요청을 데이터베이스에 생성하는 함수를 작성하세요
      const queryString = `INSERT INTO orders (user_id, total_price) VALUES (?,?)`;

      const params = [userId, totalPrice];
      // 데이터 베이스에 쿼리를 보내서 저장해야 하기 때문에 콜백함수를 사용해서 "비동기"로 작성 한다 
      db.query(queryString, params, (err, result) => {
        // err나 result 조건에 따라 callback함수 호출
        if (err) { 
          return callback(err); // err인자로 받아서 callback함수 실행
        }
        // 여기서 방금 넣어준 레코드의 id를 가져오기 위해 
        // result를 콘솔에 찍어보자 ! 
        const orderId = result.insertId;

        // 유저가 주문하는 갯수가 지정되어 있지 않기 때문에 한번의 쿼리로 여러개의 레코드를 생성 할 때 ? 하나를 이용한다 
        const queryString = `INSERT INTO order_items (order_id, item_id, order_quantity) VALUES ?`;
        //const params = [[orderId, itemId, order_quantity], [], []] 
        const params = [orders.map((order) => {
          return [orderId, order.itemId, order.quantity];
        })];

        db.query(queryString, params, (err, result) => {
          if (err) {
            return callback(err)
          }
          return callback(null, result);
        })
      })
    }
  },
};

```
```jsx
// (?,?)일 경우 params가
// [userId, totalPrice] 

// ?일 경우 멀티플쿼리니까 params가
// [[orderId, itemId, order_quantity], [orderId, itemId, order_quantity], [orderId, itemId, order_quantity]] 

// -------------

// 멀티플쿼리에서 params배열에서 엘리먼트 하나하나가  [orderId, itemId, order_quantity]이고 

// 엘리먼트에 여러값이 들어가는 경우에는 엘리먼트 하나 자체를  배열로 감싸주는거 같고

// 엘리먼트에 값이 하나만 들어가는 경우 배열로 감쌀 필요없는 것 같습니다.

// 그래서 결론은 물음표 하나당 배열에서 엘리먼트 "하나"다
```

