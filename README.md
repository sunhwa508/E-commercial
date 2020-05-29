
<h1>SUMAZON 😎😎</h1>


## Available Scripts


<div><center>
<img src="https://user-images.githubusercontent.com/61695175/83273292-52739a00-a207-11ea-8c73-8cc5ef0839a1.png" width="300" height="auto">
<img src="https://user-images.githubusercontent.com/61695175/83273447-78993a00-a207-11ea-8aa3-2313924e305f.png" width="300" height="auto">

</div></center>

## Getting Started
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### ✔Prerequisites
yarn global add create-react-app yarn을 사용해 리액트 프로젝트 앱 생성하기<br/>
AJAX통신을 용이하게 도와줄 axios라이브러리 사용<br/>
https://api.openweathermap.org/data/2.5/weather/ 회원가입후 개인 apikey 생성<br/>

### ✔Installing
react환경구축 (yarn 사용해보기)
패키지 매니저인 yarn 과 npm 마치 티몬과 쿠팡의 비교대상인마냥 큰 차이는 없는데요, <br/>
사용빈도로 본다면 npm이 yarn보다 2배정도 더 사용되고 있다고하네요 ^^ 한때,,
npm의 속도가 비교적 느렸던 그..때, npm을 보완하고자 만든게 facebook의 yarn패키지 툴이라고 하는데요, <br/>
npm과 yarn의 속도 측면에서는 ..아주 미세한 차이로 yarn의 설치속도가 더 빨랐다고 합니다,
하지만 이는 아주 미세한 차이이며 npm이 점점 그 간격을 좁히고 있따고하니.. 결론

아무거나 쓰자.
npm만 줄곧 써오던 저지만 이번 프로젝트는 yarn 패키지 매니저를 사용해 보았는데요, <br/>

https://classic.yarnpkg.com/en/ yarn installer을 설치해주면 끝,

yarn버전은 npm과 다르게 라이브러리 설치 시 add를 사용합니다
yarn add "dependencies's name"


yarn start 

## ✔page분리 후 component나누기

코드를 시작하기에 앞서, 조금 복잡해질수도 있기 때문에 먼저 페이지와 component를 나누고 시작했다.
pages는 크게
Main.js 메인화면(main 첫화면)
ADD.js 도시검색 페이지(search page)
Login/SignUp 페이지 (로그인과 회원가입부분을 한 페이지에 구현할 예정)
details 날씨의 디테일을 나타낼 페이지도 따로 만들어 준다.

이제 이 페이지들에 router을 연결할 것이기 때문에 각각의 path를 갖게 될것이다. 이렇게 ⬇⬇  
 
     <Switch>
         <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route exact path="/detail">
            <Detail />
          </Route>
          <Route exact path="/signin">
            <LoginSignup />
          </Route>
          <Route exact path="/:cityId">
            <CityDetail />
          </Route>
        </Switch>
 
## ✔openweathermap API, navigator.geolocation.getCurrentPosition(handleGeoSucces) 사용자 위치정보 얻기
우선 앱이 실행되는 동시에 user의 위치탐색 권한을 얻음으로써 user의 위치 (lat,lon) 데이터를 얻는다<br/>
이렇게 얻은 데이터는 즉지 weather api의 params로 적용되어 위치의 날씨를 가져올수 있게 된다.<br/>
이 또한 useEffect훅을 이용해, 위치가 바뀔때바다 업로드 될 수 있도록 설정해주었다.<br/>
<pre><code>
 useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSucces);
    api
      .get("/", {
        params: {
          lat: latitude,
          lon: longitude,
        },
      })
      .then((data) => {
        setLocation(data.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [latitude, longitude]);
</pre></code>

## ✔slider구현, slider외 스크린 터치(active)시 slider 상태 변경하기
그동안 (햄버거)버튼을 눌러 슬라이드를 보이고 숨기는 기능은 많이 구현해보았지만,
실제로 버튼을 누르지 않고, slider 영역 바꺝에서 action이 이루어졌을때, slider을 닫히게 하는 방식은 한번도 해본적이 없기에</br>
이번 프로젝트를 구현하며 사용해보았다. 방법은 생각보다 ,, 복잡하긴 했지만 충분히 말이 되는 코드이다.
1. customhook생성 
이 기능을 만들기 위해 hook을 따로 제작해 주었다 </br>
(arrow 함수선언문으로 작성하여 호이스팅 문제를 피할 수 있게 해준다.)

<pre><code>
export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) { 
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
</pre></code>

##App.js
//(useRef 노드를 burger , sidebar components에 감싸주어, 앞서 만든 customhooks의 이벤트타켓을 인지할 수 있게 해준다.

  <div ref={node}>
          <Burger toggle={toggle} toggler={toggler} />
          <Sidebar
            currentUser={currentUser}
            toggle={toggle}
            toggler={toggler}
            theme={theme}
          />
        </div>



## using styled-components GlobalStyle을 이용한 DakrMode구현
styled-components 에서 제공하는 createGlobalStyle을 이용하면 아주 쉽게 darkmode를 설정할수있다. 

Theme.js<br/>
export const lightTheme = {<br/>
  body: "#ffc8c8",<br/>
  text: "#ff9999",<br/>
};<br/>
export const darkTheme = {<br/>
  body: "#444f5a",<br/>
  text: "#ff9999",<br/>
};<br/>
lightTheme/darkTheme 에서 사용할 body,text 색을 위에 같이 지정해준후,<br/>

import { createGlobalStyle } from "styled-components";<br/>

export const GlobalStyles = createGlobalStyle<br/>

  body {<br/>
    background: ${({ theme }) => theme.body};<br/>
    color: ${({ theme }) => theme.text};<br/>
  }<br/>
  ;
지정해줄 스타일 영역에 위와같이 theme(light/dark)의 색만 지정해주면 된다.<br/>
여기서 사용할 Theme의 toggle함수는 우측상단에 있는 버튼이 있는 컴포넌트에서 구현하였다.<br/>

  const toggleTheme = () => {<br/>
   //theme이 light이면 dark로 <br/>
    if (theme === "light") {<br/>
      setModeTheme("dark");<br/>
      // 그렇지 않으면 light으로 <br/>
    } else {<br/>
      setModeTheme("light");<br/>
    }<br/>
  };<br/>
<br/>

## ✔Deployment
"homepage": https://sunhwa508.github.io/weather-app/
"predeploy": "npm run-script build",
"deploy": "gh-pages -d build"

yarn add gh-pages 설치 후
package.json에 위와같이 홈페이지와 ""scripts" 의 predeploy, deploy 설정 후
yarn deploy를 통해 deploy해준다. 
//yarn 과 npm의 차이 npm 은 npm run deploy 처럼 run을 해주는 반면 yarn은 deploy만 해주면 된다.


## ✔Built With
*  https://api.openweathermap.org/data/2.5/weather, - weather data API 
*  firebase - login/signin/auth관리 system, github, facebook, google provider이용한 로그인시스템연동
* (https://sunhwa508.github.io/weather-app/) - Used to generate RSS Feeds


## ✔Versioning
<ul>
  <li>"axios": "0.18.0",</li>
    <li>"firebase": "^7.14.5",</li>
    <li>"firebase-tools": "^8.4.0",</li>
    <li>"gh-pages": "^2.2.0",</li>
   <li> "node-sass": "^4.14.1",</li>
   <li> "react": "^16.13.1",</li>
   <li> "react-animated-weather": "^4.0.1",//weatherAPI에서 제공된 이미지의 퀄리더 보강으로,, 추가한 npm 라이브러리</li> 
   <li> "react-dom": "^16.13.1",</li>
   <li> "react-redux": "^7.2.0",</li>
  <li>  "react-router-dom": "^5.2.0",</li>
  <li>  "react-scripts": "3.4.1",</li>
   <li> "redux": "^4.0.5",</li>
   <li> "scss": "^0.2.4",</li>
  <li>  "styled-components": "^5.1.0"</li>
</ul>


## ✔Deployment
"homepage": https://sunhwa508.github.io/weather-app/

   "predeploy": "npm run-script build",
    "deploy": "gh-pages -d build"

yarn add gh-pages 설치 후
package.json에 위와같이 홈페이지와 ""scripts" 의 predeploy, deploy 설정 후
yarn deploy를 통해 deploy해준다. 
//yarn 과 npm의 차이 npm 은 npm run deploy 처럼 run을 해주는 반면 yarn은 deploy만 해주면 된다.
### `yarn build` fails to minify

## ✔Acknowledgments
아직 이 앱프로젝트에 대해 설명하려면,, 훨씬 더 많은 단계가 남아있지만, 로그인시스템연동 및 detail부분 routerID부분의 자세한 내용은<br/>
다른 비슷한 프로젝트에서 다루기로 하겠다 ^^ 


