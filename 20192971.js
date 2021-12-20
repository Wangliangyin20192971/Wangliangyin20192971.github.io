//myword
var myWord={
	id:0,
	en:"",
	pn:"",
	cn:"",
	getWord:function (id) {
		var id=id || this.id;
		var arr=en6[id].split("/");
		this.en=arr[0];
		this.pn=arr[1];
		this.cn=arr[2];
		return myWord;
	},//end of getWord Method
	showWord:function (id) {
		var id = id || this.id ;
		this.getWord(id);
  		var  enDom = my$("article#word input#en") ;
        var  pnDom = my$("article#word p#pn")  ;
  	    var  cnDom = my$("article#word p#cn") ;
  	    enDom.value = this.en ;
  		pnDom.textContent = "/" + this.pn + "/";
  		cnDom.textContent = this.cn ;
	},////end of showWord Method
};//end of myWord Object
//model
var Model={
	learnId:0,
	learnWords:[],
	status:"",
	myImages:null,
	showHelp:function(){
		var textInfoDom=my$("article#help p#textInfo");
		var helpInfo="";
		switch(this.status){
			case "" : helpInfo = "You have not set any button of the Menu Bar . " ; break ;
			case "read" : helpInfo = "你选择了读一读模式,再点击一次按钮继续……" ; break ;
			case "search" : helpInfo =  "你选择了搜一搜模式,输入你要搜的英文，点击确认按钮，确认搜索词,再点击一次按钮继续……" ; break ;
  	  		case "write" : helpInfo = "你选择了写一写模式,输入单词后，点击确认按钮查看结果,再点击一次按钮继续……"; break ;
      		case "wordlist" : helpInfo = "你选择了单词表模式,输入首字母，点击确认按钮查看结果,再点击一次按钮继续……" ; break ;
		}
		textInfoDom.textContent = helpInfo ;
  	 	var backPicDom =  my$("article#help div#backPic") ;
     	var randInt =  Math.floor(Math.random()*3) ;
  	 	var childDom = backPicDom.querySelector("img");
     	backPicDom.removeChild(childDom);
     	backPicDom.appendChild(this.myImages[randInt]);
	}
}; //End of  Model 

for(var i=0;i<10;i++){
	var rand=Math.floor(Math.random()*en6.length);
	Model.learnWords.push(rand);
}

//window
window.onload=function(){
	//字体
	var fontSize=Math.floor(window.innerWidth/100);
	switch(fontSize){
		case 17 :	 case 16 :	 case 15 : 
	 	case 14 :	 case 13 : 	 case 12 :
	 	case 11 : fontSize =  fontSize*1.5 ; break;
     	case 10 : 
    	case 9 :  fontSize =  fontSize*1.8 ; break;
     	case 8 :  
     	case 7 :  fontSize =  fontSize*2 ; break;
     	case 6 :  
     	case 5 :  fontSize =  fontSize*2.5 ; break;
     	case 4 : 
	 	case 3 : fontSize =  fontSize*3 ; break;
	 	default: fontSize =  fontSize*3;
	}
	document.body.style.fontSize=fontSize+"px";
	//页面宽度
	var sectionHeight=window.innerHeight-150-80;
	document.querySelector("section").style.height=sectionHeight+"px";
	//按钮
	var readDom = my$("span#read");
	var searchDom = my$("span#search");
	var writeDom = my$("span#write");
	var wordlistDom = my$("span#wordlist");
	var buttonDom = my$("button");
	var enDom = my$("input#en");
	var pnDom = my$("p#pn");
	var cnDom = my$("p#cn");
	var textInfoDom=my$("article#help p#textInfo");
	//读一读
	readDom.onclick=function(){
		enDom.style.color="rgb(200, 0, 0)";
		Model.status=this.id;
		Model.showHelp();
		myWord.showWord(Math.floor(Math.random()*5498));
	}
	//搜一搜
	searchDom.onclick=function(){
		Model.status=this.id;
		Model.showHelp();
		enDom.value="请输入你想要查找的单词"
		enDom.style.color="gray";
		pnDom.textContent="";
		cnDom.textContent="";
		enDom.onclick=function(){
			enDom.value="";
			enDom.style.color="rgb(200, 0, 0)";
		}
		buttonDom.onclick=function(){
			pnDom.textContent="";
			cnDom.textContent="";
			for (var i = 0; i <= 5498; i++) {
				var word=myWord.getWord(i);
				if(word.en==enDom.value){
					pnDom.textContent=word.pn;
					cnDom.textContent=word.cn;
				}
			}
		}	
	}
	//写一写
	writeDom.onclick=function(){
		Model.status=this.id;
		Model.showHelp();
		var word=myWord.getWord(Math.floor(Math.random()*5498));
		enDom.value="请输入正确的单词";
		enDom.style.color="gray";
		pnDom.textContent=word.pn;
		cnDom.textContent=word.cn;
		enDom.onclick=function(){
			enDom.value="";
			enDom.style.color="rgb(200, 0, 0)";
		}
		buttonDom.onclick=function(){
			if(word.en==enDom.value){
				pnDom.textContent="正确";
			}
			else{
				pnDom.textContent="错误,正确答案为："+word.en;
			}
		}
	}
	//单词表
	wordlistDom.onclick=function(){
		Model.status=this.id;
		Model.showHelp();
		enDom.value="请输入要查找单词表的首字母";
		enDom.style.color="gray";
		pnDom.textContent="";
		cnDom.textContent="";
		enDom.onclick=function(){
			enDom.value="";
			enDom.style.color="rgb(200, 0, 0)";
		}
		buttonDom.onclick=function(){
			cnDom.textContent="";
			var s="";
			var n=0;
			for (var i = 0; i <= 5498; i++) {
				(function(j){
					arr=en6[i].split("/");
					if((arr[0]).substring(0,1)==enDom.value){
						n++;
						s=n+"."+arr;
						cnDom.textContent+=s;
					}
				}(i))
			}
		}
	}
	var myDate = new Date();
	my$("footer").textContent += myDate.getFullYear() +'年' + (myDate.getMonth()+1) +'月' + myDate.getDate() +'日'; 
	//图片
	var myImages = [] ;
	for (var i=1; i<4; i++ ){
		var img = new Image();
		img.src ="/res/"+ i + ".jpg" ;
		myImages.push(img) ;
	}
	Model.myImages = myImages;
	var backPicDom =  my$("article#help div#backPic");
	var randInt =  Math.floor(Math.random()*3) ;
	backPicDom.appendChild(myImages[randInt]);
};//end of window.onload
//自定义的通用函数my$：
function my$(para){
	if(!para){
		throw para + " : wrong Selector para,you get nothing !" ;
	}
	var dom = document.querySelectorAll(para) ;
    if (dom.length > 1){
    	console.log("you get Dom Array list reference.");
	    return dom ;
    }else{
    	dom = document.querySelector(para) ;
    	if (dom){
    		console.log("you get a Dom reference.");
    		return dom ;
    	}else{
    		throw para + " : wrong Selector para,you get nothing !" ;
    	}
    }
}//end of my$
