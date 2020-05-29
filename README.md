**class형식 + redux 튜토리얼 프로젝트를 참고하여, function(함수식) + hooks로 Re코딩하였습니다.
<h1>SUMAZON 😎😎</h1>

<div><center>
 <img src="https://user-images.githubusercontent.com/61695175/83273447-78993a00-a207-11ea-8aa3-2313924e305f.png" width="300" height="auto">
<img src="https://user-images.githubusercontent.com/61695175/83273292-52739a00-a207-11ea-8c73-8cc5ef0839a1.png" width="300" height="auto">
</div></center>
## Available Scripts



## Getting Started
npx create-react-app 리액트 앱 생성


### ✔Prerequisites
SHOP_DATA json파일 준비! 이번 프로젝트는 AJAX통신이 아닌 json파일인 Shop-data.js 를 이용하여 진행하였다.<br/>
firebase 회원가입후 app생성 후 config 생성<br/>
<pre><code>
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "https://sumazon-db.firebaseio.com",
  projectId: "sumazon-db",
  storageBucket: "sumazon-db.appspot.com",
  messagingSenderId: "",
  appId: "1:662764230446:web:",
  measurementId: "G-MXPSR",
};

</pre></code>
이런 형식이 될것이다.

이번 프로젝트는 gh-pages가 아닌 heroku를 통해 무료호스팅을 해볼 예정이다.
그러니 heroku 계정만들어 app설정 해놓기.

### ✔Installing
react환경구축
NPM ? YARN 
npm의 속도가 비교적 느렸던 그..때, npm을 보완하고자 만든게<br/> facebook의 yarn패키지 툴이라고 하는데요, <br/>
사용빈도로 본다면 npm이 yarn보다 2배정도 더 사용되고 있다고하네요 ^^ <br/>
npm과 yarn의 속도 측면에서는 ..아주 미세한 차이로 yarn의 설치속도가 더 빨랐다고 합니다, <br/>
하지만 이는 아주 미세한 차이이며 npm이 점점 그 간격을 좁히고 있따고하니.. 결론 <br/>

아무거나 쓰자.😑

이번 프로젝트는 npm 패키지매니저를 이용하여 진행합니다 ^^  <br/>


npm start 

## ✔firebase사용하여, user로그인 정보 저장하기, 확인하기
firebase코드를 따로 관리하기위해 utils폴더 생성후 firebase.utils.js란 이름으로 파일생성 <br/>
  
import firebase from "firebase/app"; <br/>
import "firebase/firestore"; //firestore에 접근, 데이터를 관리하기 위함 <br/>
import "firebase/auth";  //user 정보를 받아오고, 로그인 여부를 확인 할 수 있다. <br/>

기본적으로 firebase에서 제공하는 3개의 요소를 import해줍니다. <br/>

export const auth = firebase.auth(); <br/>
export const firestore = firebase.firestore(); <br/>
여기서 생성되는 로그정보들은 이제 각각 컴포넌들의 필요에 의해 import되어짐으로 export는 필수! <br/>

사실 지금 작성하는 firebase관련 코드들은 명세에 그대로 나와있기때문에 외우거나, <br/>이 코드들을 이용해 다른곳에 활용할 가능은..낮다.
코드를 보고 이해하는정도면 충분할것이다 ^.^ <br/>

우선 async await함수를 이용해 userAuth와 additionalData가 받아진 후, useRef.get()동작을 멈추어 비동기에서 발생할 수 있는 에러를 피한다. <br/>

//아래 코드를 요약한다면 userAuth,와 additionalData를 받은 후,  그 값이 firebase의 데이터와 같다면 리턴, <br/>
그렇지 않다면 firebase의 userdata에 내용을 setting한다. 라는 말입니다. <br/>
<pre><code>
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`user/${userAuth.uid}`); 
  //여기서 가장 중요한 uid, firebase에서 제공하는 고유ID로, 각각 users을 식별할 수 있게 해줍니다. 

  const snapShot = await userRef.get(); //userid를 받아왔다면, userRef로 데이터를 받아옵니다. 

  if (!snapShot.exists) {  
  // snapshot 이란 이벤트 시점에서의 데이터베이스의 지정위치에 있는 데이터를 의미합니다. 
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ //set을이용하여 지정위치의 하위노드들의 데이터를 덮어 씌여줍니다. 
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef; //userData를 참조한 Ref
};
</pre></code>
## ✔ firebase user정보를 가져와 로그인하기 (sign in)

<h3>Signin.js</h3>
자..이제 알수없는 코드들을 끝으로.. firebase에서 가져온 user정보를 활용해 sign in을 완성시켜 봅시다. <br/>
 const [user, setUser] = useState({ email: "", password: "" }); <br/>
user의 email과 password가 담길 state를 정의한 후, <br/>

auth의 signInWithEmailAndPassword에 받아온 email과 passwork를 넣어주어, 로그인 정보를 확인 해 줍니다. <br/>
(firebase에 저장되어있는 user이 맞는지) <br/>

<pre><code>

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(user.email, user.password);
      setUser({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
</pre></code>
 만약 로그인 정보가 맞지 않다면 sign up을 이용해 정보를 등록해주어야 하겠죠?
 <h3>SignUp.js</h3>
 
 ## ✔ 회원가입 정보, firebase로 전달하여 저장하기 (sign up)
 <pre><code>
import { auth, createUserProfileDocument } from "../../Firebase/firebase.utils";

앞서 만들어준 createUserProfileDocument를 사용해봅시다.

//signup form 이 submit되면, 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signUp.password !== signUp.confirmPassword) { //비밀번호 두개가 같은지 확인해주고 다르다면 alert를 보내줍니다. 이과정이 끝난후, 
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword( //이쪽에선 방금 받은 user정보를 createUserWithEmailAndPassword에 대입하여주고, 
        signUp.email,
        signUp.password
      );
      await createUserProfileDocument(user, {  //createUserProfileDocument으로 전송해, firebase에 최종적으로 set되게 됩니다. 
        displayName: signUp.displayName,
      });
      setSignUp({ //모든과정 후 input empty시켜주기.
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  </pre></code>
 ## ✔ user정보 state에 담기(useContext)
 <pre><code>
import { auth, createUserProfileDocument,addCollectionAndDocuments } from "./Firebase/firebase.utils";

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });

    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, []);
</pre></code>


## ✔Deployment (HEROKU)
 https://aamazon-live.herokuapp.com/


## ✔Built With
*  firebase - login/signin/auth관리 system, github, facebook, google provider이용한 로그인시스템연동



## ✔Versioning
<ul>
  <li>"firebase": "^7.14.2",</li>
    <li>"node-sass": "^4.14.0",</li>
   <li> "react": "^16.13.1",</li>
  <li>  "react-dom": "^16.13.1",</li>
   <li> "react-logger": "^1.1.0",</li>
  <li>  "react-redux": "^7.2.0",</li>
  <li>  "react-router-dom": "^5.1.2",</li>
  <li>  "react-scripts": "3.4.1",</li>
  <li>  "react-stripe-checkout": "^2.6.3",</li>
 <li>   "redux": "^4.0.5",</li>
  <li>  "styled-components": "^5.1.0"</li>
</ul>



## ✔Acknowledgments


