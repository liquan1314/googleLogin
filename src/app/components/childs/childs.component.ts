import {Component, NgZone, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-childs',
  templateUrl: './childs.component.html',
  styleUrls: ['./childs.component.scss']
})
export class ChildsComponent implements OnInit {
  @ViewChild('buttonText') buttonText;
  auth2:any;
  userInfo:any = [];
  constructor(
    private zone: NgZone   //这是我们告诉重新更新下状态
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.startApp()
  }
  startApp(){
    let that = this;
    //我们要调用googleClient，首先要进行授权凭证，初始化auth2对象
    gapi.load('auth2', ()=>{
      //对auth2授权凭证，让我们操作googleClient的凭证
        gapi.auth2.init({
            client_id:'230743352788-70rprt9h848dccqharm10iv934hh1mjk.apps.googleusercontent.com',
        }).then( (data)=>{
            this.auth2 = data;
            this.attachSignIn(that.buttonText.nativeElement)
        },function (err){
           console.error(err)
      })
    })
    //我们把的得到的Dom元素对象规定为我们指定操作google客户端的登录流程

  }
  attachSignIn(ele){
    //auth2.attachClickhandler有4个参数，第一个参数是指定的容器，第二个参数是配置，第三个参数是成功的回调函数 第四个参数是失败的回调函数
      this.auth2.attachClickHandler(ele,{},(googleUser)=>{
        let profile = googleUser.getBasicProfile(); //调用google里面的方法，然后得到用户名，id 图片等
        this.userInfo[0] = profile.getName()
        this.userInfo[1] = profile.getId()
        this.userInfo[2] = profile.getImageUrl()
        this.userInfo[3] = profile.getEmail()
        this.zone.run(() =>{}); //因为我们这个回调函数是抛给gapi的auth2，不在angular的运行机制里面
        console.log(this.userInfo)
    },function(error) {
      alert(JSON.stringify(error, undefined, 2));
    })
  }


}
