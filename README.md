# blue-uni-router-hooks

### uni-app中第三方路由只存在一次hook的处理，这里的可以配合灵活注册多次hook处理，和vue-router使用hook一致

```javascript
import router from '@router';
const {RouterBefore,RouterAfter} from 'blue-uni-router-hooks';

//创建实例
const routerBefore = new RouterBefore();
const routerAfter = new RouterAfter();

//注册before
routerBefore.listen((to,from,next)=>{
  next();
});

routerBefore.listen((to,from,next)=>{
  next(`/pages/Home`);
});

//注册after
routerAfter.listen((to,from)=>{
  console.log(to,from);
});

//在真实的hook中调用实例hook处理
router.beforeEach((to,from,next)=>{
  routerBefore.run(to,from,next);
});
router.afterEach((to,from)=>{
  routerAfter.run(to,from);
});
```